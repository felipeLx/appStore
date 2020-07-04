require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const {json} = require("body-parser");
const mongoose = require('mongoose');
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const flash = require('connect-flash');
const indexRoute = require('./routes/index');
const productsRoute = require('./routes/products');
const ordersRoute = require('./routes/orders');
const usersRoute = require('./routes/users');

// Passport config
require('./config/passport')(passport);

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json())
app.use(multer({ dest: './uploads/'}).single('profile'));
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));  
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else {
    app.use(express.static(path.join(__dirname, 'client/public')));
  }

  // Express session
  app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//Routes
app.use('/api/', productsRoute);
app.use('/user/', usersRoute);
app.use('/order/', ordersRoute);
app.use('/', indexRoute);

//Get the default connection
let db = mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
.then(() => {
console.log("DB Connected");
})
.catch(err => {
  console.log(`DB Connection Error: ${err.message}`);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server start on port: ${PORT}`));