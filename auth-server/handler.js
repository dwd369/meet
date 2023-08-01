'use strict';

const { google } = require("googleapis");
const { oauth2 } = require("googleapis/build/src/apis/oauth2");
const calendar = google.calendar("v3");
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = ["https://dwd369.github.io/meet/"];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

// getAuthURL
// When this function is invoked, an authorization URL is returned, and Google displays a consent screen to the user to authorize the app via an authorization code.
// The Google consent screen will then ask user to authorize the Meet ap to request some of their data
module.exports.getAuthURL = async () => {
  /** 
   * 
   * Scopes array is passed to the 'scope' Option. 
   * 
   */

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};


// getAccessToken
// A request will only be made to this function if the user approves. The authorization code received from getAuthURL is passed to getAccessToek
// Google subsequently provides the Meet ap with a temporary access token
module.exports.getAccessToken = async (event) => {
  // Decore authorization code extracted from the URL query
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    /** 
     * Exchange authorization code for access token with a "callback" after the exchange,
     * The callback in this case is an arrow function with the results as parameters: "error" and "response"
    */  
    oAuth2Client.getToken(code, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });

  })
    .then((results) => {
      // Respond with OAuth token
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(results),
      };
    })
    .catch((error) => {
      // Handle error
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};


// getCalendarEvents
// This function will use the request calendar event (by attaching the access token to the request)
// Google then returns the requested data if it determines that the request and the token are valid.
module.exports.getCalendarEvents = async (event) => {

  const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
  
  oAuth2Client.setCredentials({ access_token });

  return new Promise((resolve, reject) => {

    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );
  })
    .then((results) => {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ events: results.data.items}),
      };
    })
    .catch((error) => {
      // Handle error
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};