const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('./../models/user-model');

passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
})

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
    // console.log('passport callback function fired.');
    console.log(profile);
    console.log(profile.photos[0].value)

    // Check if the user already exists in our DB
    User.findOne({googleId: profile.id}).then((currentUser) => {
      if(currentUser){
        // already have the user
        console.log('user is: ', currentUser)
        // done(null, currentUser)
      } else {
        // if not, create user in our db
        new User({
          username: profile.displayName,
          googleId: profile.id,
          thumbnail: profile.photos[0].value
        }).save().then((newUser) => {
          console.log('new user created:' + newUser)
          done(null, newUser)
        })
      }
    })
  })
)