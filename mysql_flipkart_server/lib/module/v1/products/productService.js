"use strict";

//========================== Load Modules Start =======================

//========================== Load internal modules ====================
const promise = require("bluebird");
// Load user dao
var _ = require("lodash");
const productDao = require("./productDao");

//========================== Load Modules End ==============================================

async function addProduct(productInfo) {
  const result = await productDao.addProduct(productInfo);
  return result;
}

async function getProduct(productInfo) {
  const result = await productDao.getProduct(productInfo);
  return result;
}

async function place_order(productInfo) {
  // console.log(productInfo)
  const result = await productDao.place_order(productInfo);
  // console.log(result, "result from service");
  return result;
}

async function update_product(productInfo) {
  // console.log(productInfo.quantity);
  const result = await productDao.updated_product(productInfo);
  return result;
}

async function delete_product(productInfo) {
  // console.log(productInfo.quantity);
  const result = await productDao.delete_product(productInfo);
  return result;
}

async function get_all_information(accessToken) {
  // console.log('productService', accessToken);
  productDao.get_all_information(accessToken);
}

//========================== Export Module Start ==============================

module.exports = {
  addProduct,
  getProduct,
  place_order,
  update_product,
  delete_product,
  get_all_information,
};

//========================== Export Module End ===============================
