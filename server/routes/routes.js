const express = require("express");
const router = express.Router();
const transporter = require('../config/nodemailer');
const passport = require('../config/passport');
const mongoose = require('mongoose');
require('../models/Articles.js');

const Articles = mongoose.model('Articles');

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
  console.log(body)
  if(!body.title) {
    return res.status(422).json({
      errors: {
        title: 'is required',
      },
    });
  }

  if(!body.body) {
    return res.status(422).json({
      errors: {
        body: 'is required',
      },
    });
  }

  const finalArticle = new Articles(body);
  console.log(finalArticle)
  return finalArticle.save()
    .then(() => res.json({ article: finalArticle.toJSON() }))
    .catch(next);
});

router.get('/api/posts', (req, res, next) => {
  return Articles.find()
    .sort({ createdAt: 'descending' })
    .then((articles) => res.json({ posts: articles.map(article => article.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  console.log(id);
  return Articles.findById(id, (err, article) => {
    if(err) {
      return res.sendStatus(404);
    } else if(article) {
      req.article = article;
      return next();
    }
  }).catch(next);
});

router.get('/api/posts/:id', (req, res, next) => {
  return res.json({
    post: req.article.toJSON(),
  });
});

router.patch('/api/posts/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body.title !== 'undefined') {
    req.article.title = body.title;
  }

  if(typeof body.author !== 'undefined') {
    req.article.author = body.author;
  }

  if(typeof body.body !== 'undefined') {
    req.article.body = body.body;
  }

  return req.article.save()
    .then(() => res.json({ article: req.article.toJSON() }))
    .catch(next);
});

router.delete('/api/posts/:id', (req, res, next) => {
  return Articles.findByIdAndRemove(req.article._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

router.put('/api/posts/:id', (req, res, next) => {
  return Articles.findByIdAndUpdate(req.article._id)
  .then(() => res.sendStatus(200))
  .catch(next);
})

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;