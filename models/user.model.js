const express = require('express');
const mongoose = require('mongoose');
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const bodyParser = require('body-parser');
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const userSchema = new mongoose.Schema({
    username: {type: String, require: true, lowercase: true},
    email: {type: String, require: true, lowercase: true, index: {unique: true}},
    password: {type: String, require: true},
    orderId: {type: [String], require: false},
    dataCreate: {type: Date, default: Date.now(), require: true},
  });

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
mongoose.set("useCreateIndex", true);



const User = new mongoose.model("User", userSchema);


passport.use(new GoogleStrategy({
    clientID: '337624496879-ucdmgd6jmp1j07gba4q2vog74hmf0ts4.apps.googleusercontent.com',
    clientSecret: 'dYJDofNuW56nGdli7oAdPPoR',
    callbackURL: "https://alvestore.herokuapp.com/user/auth/google/appstore",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  (accessToken, refreshToken, profile, cb) => {
    User.findOrCreate({ googleId: profile.id }, (err, user) => {

        return cb(err, user);
    });
  }
));

// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:3000/auth/facebook/appstore",
//     enableProof: true
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate({facebookId: profile.id}, function(err, user) {
//       if (err) { return done(err); }
//       else {done(null, profile);}
//     });
//   }
// ));

module.exports = User;