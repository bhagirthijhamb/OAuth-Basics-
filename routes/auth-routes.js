const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
  res.render('login', { user: req.user });
})

// auto logout
router.get('/logout', (req, res) => {
  // handle with passport
  // res.send('logging out');
  req.logout();
  res.redirect('/');
})

// auth with google
// router.get('/google', (req, res) => {
//   // handle with passport
//   res.send('logging in with google');
// })

router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}))

// callback route for google toredirect to 
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // res.send('you reached the callback URI')
  // res.send(req.user);
  res.redirect('/profile/');
})

module.exports = router;