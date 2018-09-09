const express = require("express");
const router = express.Router();
const transporter = require('../config/nodemailer');
const passport = require('../config/passport');

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

router.post('/api/login', (req, res, next) => passport.authenticate('local-login', (err, user, info) => {
        if (!user) {
            return res.status(401).send(err);
        } else {
            res.data = user;
            req.login(user, function(err) {
                if (err) { return next(err); }
                return res.json(user)
            });
        }     
    }
)(req, res, next));

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}

router.get("/profile", isLoggedIn, (req, res) => {
    var user = req.session.passport;
})

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});


module.exports = router;