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

router.post('/api/login', (req, res, next) => passport.authenticate('local-login', (err, user) => {
    if (!user) {
        return res.status(401).send(err);
    } else {
        res.data = user;
        req.login(user, function (err) {
            if (err) {
                return next(err);
            } else {
                return res.json(user);
            }
        });
    }
}
)(req, res, next));


router.get("/profile", isLoggedIn, (req, res) => {
    return res.status(200).send('Welcome');
})

router.get('/api/logout', function (req, res) {
    req.session.destroy((err) => {
        if (err) return next(err)
        req.logout();
        res.redirect('/');
    })
});

router.post('/api/posts', (req, res, next) => {
    const { body } = req;
    if (!body.title) {
        return res.status(422).json({
            errors: {
                title: 'is required',
            },
        });
    }

    if (!body.userId) {
        return res.status(422).json({
            errors: {
                userId: 'is required',
            },
        });
    }

    if (!body) {
        return res.status(422).json({
            errors: {
                body: 'is required',
            },
        });
    } else {
        const finalArticle = JSON.stringify(body);
        client.set('articleDatabase', finalArticle);
        res.json({
            msg: 'success'
        })
    }
});

router.get('/api/posts', (req, res, next) => {
    client.get('articleDatabase', function (err, posts) {
        if (err) {
            return res.status(500).end();
        }
        posts = JSON.parse(posts)
        console.log(posts);
        res.json(posts)
    })
})

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;