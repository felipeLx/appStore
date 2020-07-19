const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const findOrCreate = require("mongoose-findorcreate");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

const orderSchema = new mongoose.Schema({
    total: {type: String, require: true},
    userId: {type: String, require: true},
    modifiedOn: {type: Date, required: true, default: new Date().getTime()},
    products: {
      _id:{type: String, require: true},
      quantity: {type: Number, require: true},
      name: {type: String, require: true},
      price: {type: Number, require: true},
    }
  });

orderSchema.plugin(findOrCreate);
mongoose.set("useCreateIndex", true);

const Order = new mongoose.model("Order", orderSchema);

module.exports = Order;
