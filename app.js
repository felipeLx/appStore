"use strict";
require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const {json} = require("body-parser");
const mongoose = require('mongoose');
const session = require("express-session");
// const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const indexRoute = require('./routes/index');
const productsRoute = require('./routes/products');
const ordersRoute = require('./routes/orders');
const dashboardRoute = require('./routes/dashboard');
const usersRoute = require('./routes/users');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json())
app.use(multer({ dest: './uploads/'}).single('profile'));
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));  
  app.get('/', (req,res) => {
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
  
//Routes
app.use('/api', productsRoute);
app.use('/users', usersRoute);
app.use('/orders', ordersRoute);
app.use('/dashboard', dashboardRoute);
app.use('/', indexRoute);


// Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

//Get the default connection
let db = mongoose.connect('mongodb+srv://felipealisboa:Universidade.2010@cluster0-fqbok.mongodb.net/storeDB', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
.then(() => {
console.log("DB Connected");
})
.catch(err => {
  console.log(`DB Connection Error: ${err.message}`);
});

const PORT = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there

app.listen(PORT, console.log(`Server start on port: ${PORT}`)); 