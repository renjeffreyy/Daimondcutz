require('dotenv').config();
const { google } = require('googleapis');

const { OAuth2 } = google.auth;

//authorization credentials for app
const oAuth2Client = new OAuth2(process.env.clientID, process.env.clientSecret);

//set refresh token for OAuthClient we just declared above
oAuth2Client.setCredentials({
  refresh_token: process.env.refreshToken,
});

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

const eventStartTime = new Date();
eventStartTime.setDate(eventStartTime.getDay() + 2);

const eventEndTime = new Date();
eventEndTime.setDate(eventEndTime.getDay() + 2);
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);

const event = {
  summary: 'meet with David',
  location: '1423 strlight dr west covina ca',
  description: 'meeting with David',
  start: {
    dateTime: eventStartTime,
    timeZone: 'America/Los_Angeles',
  },
  end: {
    dateTime: eventEndTime,
    timeZone: 'America/Los_Angeles',
  },
  colorId: 1,
};

console.log(Date());

const test = async () => {
  const cal = await calendar.freebusy.query({
    calendarId: 'primary',
    requestBody: {
      start: {
        dateTime: eventStartTime,
        timeZone: 'America/Denver',
      },
      end: {
        dateTime: eventEndTime,
        timeZone: 'America/Denver',
      },
    },
  });
  console.log(cal);
};

test();

calendar.freebusy.query(
  {
    resource: {
      timeMin: eventStartTime,
      timeMax: eventEndTime,
      timeZone: 'America/Denver',
      items: [{ id: 'primary' }],
    },
  },
  (err, res) => {
    if (err) return console.error('free Busy Query Error: ', err);

    const eventsArray = res.data.calendars.primary.busy;

    if (eventsArray.length === 0) {
      return calendar.events.insert(
        {
          calendarId: 'primary',
          resource: event,
        },
        (err) => {
          if (err) return console.error('Calendar Event Creation Error: ', err);

          return console.log('calendar event created.');
        }
      );
    }
    return console.log('sorry i busy');
  }
);
