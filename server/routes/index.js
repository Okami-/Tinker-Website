var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
let { google } = require('googleapis');
let OAuth2 = google.auth.OAuth2;
const creds = require('../config/config');

const EMAIL = "richiebkr@gmail.com"

let oauth2Client = new OAuth2(
    // ClientID
    creds.CLIENTID,
    // Client Secret
    creds.CLIENTSECRET,
    //Redirect URL
    "https://developers.google.com/oauthplayground",
);

oauth2Client.setCredentials({
    refresh_token: creds.REFRESHTOKEN
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
        clientId: creds.CLIENTID,
        clientSecret: creds.CLIENTSECRET,
        refreshToken: creds.REFRESHTOKEN,
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


router.post('/send', (req, res, next) => {
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;
    var content = `name: ${name} \nemail: ${email} \nmessage: ${message} `;

    var mail = {
        from: name,
        to: 'richiebkr@gmail.com', 
        subject: 'New Message from Tinker Website',
        text: content
    }
    
    transporter.sendMail(mail, (err, data) => {
        if (err) {
            res.json({
                msg: 'fail'
            })
        } else {
            res.json({
                msg: 'success'
            })
        }
    })
})



module.exports = router;
