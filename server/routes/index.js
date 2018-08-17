var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const creds = require('../config/config');
var bodyParser = require('body-parser');



var transport = {
    host: 'smtp.gmail.com',
    auth: {
        user: creds.USER,
        pass: creds.PASS
    }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});


router.post('/send', (req, res, next) => {
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    var content = `name: ${name} \n email: ${email} \n message: ${content} `

    var mail = {
        from: name,
        to: 'richiebkr@gmail.com', 
        subject: 'New Message from Tinker Website',
        text: content
    }
    console.log(req.body.name)
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

function newFunction(req) {
    return req.body.name;
}
