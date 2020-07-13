const mongoose = require('mongoose');
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

productSchema.plugin(findOrCreate);
mongoose.set("useCreateIndex", true);

const Product = new mongoose.model("Product", productSchema);
  
module.exports = Product;