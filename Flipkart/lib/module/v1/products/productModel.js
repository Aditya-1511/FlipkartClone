// Importing mongoose
var mongoose = require("mongoose");
var constants = require("../../../constant");

var Schema = mongoose.Schema;
var Product;

var ProductSchema = new Schema({
  productName: {
    type: String,
    default: "",
    required: true,
  },
  productId: {
    type: String,
    index: true,
    unique: true,
  },
  location: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  deliveryPinCode: {
    type: Number,
  },
  size: {
    type: Number,
  },
  color: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  key: {
    type: String,
  },
});

ProductSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.updated;
  return obj;
};

//Export user module
Product = module.exports = mongoose.model(
  constants.DB_MODEL_REF.PRODUCT,
  ProductSchema
);
