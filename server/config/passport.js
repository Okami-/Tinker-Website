const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// =========================================================================
// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session

// =========================================================================
// LOCAL LOGIN =============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'
passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, username, password, done) { // callback with email and password from our form
    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    client.hmget('user', 'username', 'password', function(err, user) {
        if (err)
            return done(err);
        if(username !== user[0])
            return done(null, false, {message: 'No user found.'});
        if(password !== user[1])
            return done(null, false, {message: 'Oops! Wrong password.'});
        return done(null, user);
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = passport;