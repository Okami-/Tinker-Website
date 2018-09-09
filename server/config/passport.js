const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    try {
        let user = null;
        await getAsync('usersDatabase').then((users) => {
            user = JSON.parse(users).find(currUser => currUser.id === id);
        });
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (err) {
        done(err);
    }
});

passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true 
},
    async (req, email, password, done) => {
        let user = null;
        await getAsync('usersDatabase').then((users) => {
            const currUsers = JSON.parse(users);

        // if redis session expired, create database with one user
            if (!currUsers || currUsers.length < 1) {
                client.set('usersDatabase', [
                {
                    id: 1,
                    email: 'richiebkr@gmail.com',
                    // Just a test bcrypt...
                    password: '$2a$04$4yQfCo8kMpH24T2iQkw9p.hPjcz10m.FcWmgkOhkXNPSpbwHZ877S',
                    userName: 'rbaker',
                },
            ]);
        }

        user = currUsers.find(currUser => currUser.email === email);
        });

        if (!user) {
            done({ type: 'email', message: 'No such user found' }, false);
            return;
        }
        if (bcrypt.compareSync(password, user.password)) {
            done(null, { id: user.id, email: user.email, userName: user.userName });
        } else {
            done({ type: 'password', message: 'Passwords did not match' }, false);
        }
    },
    ),
);

module.exports = passport;
