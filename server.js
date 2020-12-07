const express = require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');

// set up view engine
app.set('view engine', 'ejs');

// set up routes
app.use('/auth', authRoutes)

// Create home router
app.get('/', (req, res) => {
  res.render('home');
})
  
app.listen(3000, () => {
  console.log('App now listening for requests on port 3000')
})