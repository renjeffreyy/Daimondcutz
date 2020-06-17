const express = require('express');
const router = express.Router();
require('dotenv').config();
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const moment = require('moment');
const auth = require('../../middleware/auth');
const User = require('../../models/Users');

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
  const end = moment(new Date(date)).add(45, 'm').toDate();
  console.log(start, end);
  console.log(
    moment(start).format('MMMM Do YYYY, h:mm:ss a'),
    moment(end).format('MMMM Do YYYY, h:mm:ss a')
  );

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

    console.log(req.body);

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
            (err) => {
              if (err)
                return console.error('Calendar Event Creation Error: ', err);

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

module.exports = router;
