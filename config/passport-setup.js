const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');

passport.use(
  // we want to use the Google+ api to authenticate people on our website using Google
  // So we are using the Google api behind the scenes
  // to do this we need two things clientId and clientSecret
  new GoogleStrategy({
    // options for the google strategy
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    // passport callback function
    console.log('passport callback function fired.');
    console.log(profile);
  })
)