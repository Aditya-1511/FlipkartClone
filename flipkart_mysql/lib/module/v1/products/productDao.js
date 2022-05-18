"use strict";
//========================== Load Modules Start =======================

//========================== Load internal modules ====================
var mongoose = require("mongoose");
var promise = require("bluebird");

var _ = require("lodash");
//========================== Load internal modules ====================
const Product = require("./productModel");

// init user dao
let BaseDao = require("../../../dao/baseDao");
const { uploadSingleMediaToS3 } = require("../../../middleware/mediaUpload");
const productDao = new BaseDao(Product);

//========================== Load Modules End ==============================================

async function addProduct(productInfo) {
  console.log(productInfo);

  const result = await productDao.findOne({ productId: productInfo.productId });
  if (result) {
    // console.log("product hai!!!")
    return [{ message: "product is already in DB" }];
  } else {
    let query = {};
    query.productName = productInfo.productName;
    query.productId = productInfo.productId;
    query.price = productInfo.price;
    query.deliveryPinCode = productInfo.deliveryPinCode;
    query.size = productInfo.size;
    query.color = productInfo.color;
    query.quantity = productInfo.quantity;
    query.location = productInfo.location;
    query.key = productInfo.key;
    await productDao.save(query);

    return query;
  }
}

async function getProduct(productInfo) {
  const result = await productDao.findOne({ productId: productInfo.productId });
  if (result) {
    return result;
  } else {
    console.log("Product is not in DB");
  }
}

async function place_order(productInfo) {
  // console.log(productInfo.productId);
  const result = await productDao.findOne({
    _id: productInfo.productId,
  });
  return result;
}

async function update_product(params) {
  console.log(params);
  var query = {};
  query._id = params.productId;
  let update = {};

  update.quantity = params.quantity;
  let option = {};
  option.new = true;
  const result = await productDao.findByIdAndUpdate(query, update, option);
  //console.log(result);
  //return result;
}

async function updated_product(params) {
  console.log(params);
  var query = {};
  query._id = params.productId;
  let update = {};
  update.quantity = params.quantity;
  let option = {};
  option.new = true;
  const result = await productDao.findByIdAndUpdate(query, update, option);
  console.log(result, "result");
}

async function delete_product(params) {
  // console.log(params);
  var query = {};
  query._id = params.productId;
  const result = await productDao.findOne(query);
  // console.log(result, "result");

  const deleteFromDb = await productDao.findByIdAndRemove(query);
  if (deleteFromDb) {
    console.log("Product deleted successfully");
  } else {
    console.log("Product has already been deleted");
  }
  return result;
}

//========================== Export Module Start ==============================
module.exports = {
  addProduct,
  getProduct,
  place_order,
  update_product,
  updated_product,
  delete_product,
};

//========================== Export Module End ===============================
