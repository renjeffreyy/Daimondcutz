const express = require('express');
const router = express.Router();
require('dotenv').config();
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const moment = require('moment');

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
  // console.log(req.body);
  // console.log(date);

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
          // timeZone: 'Pacific Daylight Time',
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

module.exports = router;
