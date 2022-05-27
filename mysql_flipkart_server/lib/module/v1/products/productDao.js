"use strict";
//========================== Load Modules Start =======================

//========================== Load internal modules ====================
var mongoose = require("mongoose");
var promise = require("bluebird");

var _ = require("lodash");
//========================== Load internal modules ====================
const productModel = require("./productModel");

// init user dao
let BaseDao = require("../../../dao/baseDao");
const { uploadSingleMediaToS3 } = require("../../../middleware/mediaUpload");
const { where } = require("../admin/adminModel");
// const productDao = new BaseDao(Product);

//========================== Load Modules End ==============================================

async function addProduct(productInfo) {
  // console.log(productInfo, "productInfo");
  const jane = await productModel.Product.build(productInfo);
  return jane.save();
}

async function getProduct(productInfo) {
  // console.log(productInfo,"ahgdsajgfvajdg");
  const result = await productModel.Product.findAll({ productId: productInfo });
  // console.log(result, "result");
  if (result) {
    return result;
  } else {
    console.log("Product is not in DB");
  }
}

async function place_order(productInfo) {
  // console.log(productInfo.productId);
  const result = await productModel.Product.findOne({
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
  // console.log(params);
  let updatedQuantity = params.quantity;
  const result = await productModel.Product.update(
    { quantity: updatedQuantity },
    { where: { productId: params.productId } }
  );
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

async function get_all_information(accessToken) {
  // console.log("productDao", accessToken);
}

//========================== Export Module Start ==============================
module.exports = {
  addProduct,
  getProduct,
  place_order,
  update_product,
  updated_product,
  delete_product,
  get_all_information,
};

//========================== Export Module End ===============================
