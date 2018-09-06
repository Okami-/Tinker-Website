const nodemailer = require('nodemailer');
let { google } = require('googleapis');

let OAuth2 = google.auth.OAuth2;
require('dotenv').load();

let oauth2Client = new OAuth2(
    // ClientID
    process.env.CLIENTID,
    // Client Secret
    process.env.CLIENTSECRET,
    //Redirect URL
    "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESHTOKEN
});

let accessToken = "";

oauth2Client.refreshAccessToken(function(err, tokens) {
    accessToken = tokens.access_token;
})

var transport = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: "OAuth2",
        user: 'richiebkr@gmail.com',
        clientId: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        refreshToken: process.env.REFRESHTOKEN,
        accessToken: accessToken
    }
};

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});

module.exports = transporter;