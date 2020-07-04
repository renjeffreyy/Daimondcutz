const express = require('express');
const router = express.Router();
require('dotenv').config();
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const moment = require('moment');
const auth = require('../../middleware/auth');
const User = require('../../models/Users');
const Appointment = require('../../models/appointments.model');

//authorization credentials for app
const oAuth2Client = new OAuth2(process.env.clientID, process.env.clientSecret);

//set refresh token for OAuthClient we just declared above
oAuth2Client.setCredentials({
  refresh_token: process.env.refreshToken,
});

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

//@route    GET api/calendar
//@desc     get events for requested calendar day
//@access   public
router.post('/', async (req, res) => {
  const { date } = req.body;

  //set times to beggining and end of day
  const start = new Date(date).setHours(0, 0, 0, 0);
  const isoStart = moment(start).format();
  //set time to end of day
  const end = new Date(date).setHours(23, 59, 59, 999);
  const isoEnd = moment(end).format();

  try {
    calendar.freebusy.query(
      {
        requestBody: {
          timeMin: isoStart,
          timeMax: isoEnd,
          items: [{ id: 'primary' }],
        },
      },
      (err, response) => {
        if (err) {
          return console.error('free busy query error: ', err);
        } else if (response.data.calendars.primary.busy.length > 0) {
          const data = response.data.calendars.primary.busy;
          res.send(data);
        } else {
          res.send([]);
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
});

//@route    POST api/calendar/appointments
//@desc     book appointments and put into google calendar
//@access   private
router.post('/appointments', auth, async (req, res) => {
  const { date } = req.body;

  const timeZone = 'America/Los_Angeles';
  const start = date;
  const end = moment(new Date(date)).add(45, 'm').toISOString();

  try {
    const user = await User.findById(req.user.id).select('-password');

    const event = {
      summary: `haircut with ${user.firstName} ${user.lastName}`,
      location: "David's house message him for address",
      description: `Haircut for ${user.firstName} ${user.lastName}. phone number: ${user.phoneNumber}. email: ${user.email}`,
      start: {
        dateTime: start,
        timeZone: timeZone,
      },
      end: {
        dateTime: end,
        timeZone: timeZone,
      },
      colorId: 1,
    };

    calendar.freebusy.query(
      {
        requestBody: {
          timeMin: start,
          timeMax: end,
          items: [{ id: 'primary' }],
        },
      },
      (err, response) => {
        if (err) {
          return console.error('free busy query error: ', err);
        }

        const eventArray = response.data.calendars.primary.busy;

        if (eventArray.length === 0) {
          return calendar.events.insert(
            {
              calendarId: 'primary',
              resource: event,
            },
            async (err) => {
              if (err) {
                return console.error('Calendar Event Creation Error: ', err);
              }
              const appointment = new Appointment({
                userId: user.id,
                startTime: start,
                endTime: end,
              });
              await appointment.save();
              return res.status(200).json([
                {
                  msg: `event scheduled for ${user.firstName} ${user.lastName}`,
                },
              ]);
            }
          );
        } else {
          res.status(400).json({ msg: 'Time Slot unavailable' });
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
});

//@route    GET api/calendar/appointments
//@desc     get users all appointments in database
//@access   private
router.get('/appointments', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const appointment = await Appointment.find({ userId: user.id });

    res.status(200).json(appointment);
  } catch (error) {
    console.log(error);
  }
});

//@route    delete api/calendar/appointments/id
//@desc     delete user's appointments that have not already passed
//@access   private
router.delete('/appointments/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    //check to see if appointment exists
    if (!appointment) {
      return res.status(401).json({ msg: 'appointment does not exist' });
    }

    //check if appointment belongs to user
    if (appointment.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await appointment.remove();

    const start = appointment.startTime;
    const end = appointment.endTime;

    calendar.events.list(
      { calendarId: 'primary', timeMin: start, timeMax: end },
      (error, response) => {
        if (error) {
          console.log('error with listing google event: ', error);
        }

        const eventId = response.data.items[0].id;

        calendar.events.delete(
          {
            calendarId: 'primary',
            eventId: eventId,
          },
          (error, response) => {
            if (error) {
              console.log('error with deleting event: ', error);
            }
            console.log('event deleted');
          }
        );
      }
    );

    res.json({ msg: 'appointment removed' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
