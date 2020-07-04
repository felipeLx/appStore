const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const fs = require('fs');



const productSchema = new mongoose.Schema({
    product: {type: String, require: true},
    description: {type: String, require: true},
    brand: {type: String, require: true},
    googleId: {type: String},
    category: {type: String, require: true},
    picture: {type: Object, data: Buffer, require: false},
    price: {type: Number, require: true},
    rating: {type: Number, require: false},
    order: {type: String, require: false}
  });

const options = {
  errorMessages: {
    pictureSize: 'Tamanho da foto maior que o permitido.',
    descBadWords: 'Foi usado termos ou expressões não permitidos.'
  }
}  

productSchema.plugin(passportLocalMongoose,options);
productSchema.plugin(findOrCreate);
mongoose.set("useCreateIndex", true);

const Product = new mongoose.model("Product", productSchema);
  
passport.use(Product.createStrategy());

passport.serializeUser((user, done) => {
  done(null, user.id);                                                                                                                                                                                                                                                      
});

passport.deserializeUser((id, done) => {
  Product.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.SECRET,
  callbackURL: '/auth/google/register',
  ProductProfileURL: 'https://googleapis.com/oauth2/v3/userinfo'
},                                                                                                                                                        
(acessToken, refreshToken, profile, cb) => {
  Product.findOrCreate({googleId: profile.id}, (err, user) => {
    return cb(err, user);
    });
  }
));

module.exports = Product;