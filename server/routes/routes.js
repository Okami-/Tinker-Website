const express = require("express");
const router = express.Router();
const transporter = require('../config/nodemailer');
const passport = require('../config/passport');

// process the transporter for email
router.post('/api/send', (req, res, next) => {  
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
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




//process the login form
router.post('/api/login', (req, res, next) => passport.authenticate('local-login', {
    successRedirect : '/api/profile/', 
    failureRedirect : '/',
    failWithError: true
},
    function(err, user, info){
        if (err) { return next(err) }
        if (!user) { return res.json( { message: info.message }) }
        res.json(user);
    }
)(req, res, next));


// router.get('/api/login', (req, res, next) => {
//     res.json({name: 'login again'});
// })

// router.get('/api/profile', (req, res, next) => {
//     console.log('help');
// })

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;