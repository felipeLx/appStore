const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

const orderSchema = new mongoose.Schema({
    total: {type: String, require: true},
    userId: {type: String, require: true},
    productId: {type: String, require: true}
  });

orderSchema.plugin(findOrCreate);
mongoose.set("useCreateIndex", true);

const Order = new mongoose.model("Order", orderSchema);

module.exports = Order;
