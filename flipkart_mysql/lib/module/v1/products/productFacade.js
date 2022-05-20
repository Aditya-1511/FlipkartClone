"use strict";

//========================== Load Modules Start =======================

//========================== Load external modules ====================
// Load user service
var _ = require("lodash");
var Promise = require("bluebird");
//========================== Load internal modules ====================

const productService = require("./productService");
const productMapper = require("./productMapper");

const appUtils = require("../../../appUtils");
const redisClient = require("../../../redisClient/init");
const exceptions = require("../../../customException");
const nodemailer = require("./nodemailer");
const middleware = require("../../../middleware/mediaUpload");

//========================== Load Modules End ==============================================

async function addProduct(productInfo) {
  const data = await productService.addProduct(productInfo);

  const map = productMapper.loginMapping({ user: data, jwt: "12345" });
  return map;
}

async function getProduct(productInfo) {
  const data = await productService.getProduct(productInfo);

  const map = productMapper.loginMapping({ user: data, jwt: "12345" });
  return map;
}

async function place_order(productInfo) {
  // console.log(productInfo);
  const data = await productService.place_order(productInfo);
  productInfo.quantity = data.quantity - productInfo.quantity;
  if (data) {
    var updatedResult = await productService.update_product(productInfo);
    nodemailer.send_mail(productInfo.email, data);
    //  console.log(updatedResult);
  }
  // return map;
}

async function update_product(productInfo) {
  // console.log(productInfo);
  const data = await productService.update_product(productInfo);
  // console.log(data)
}

async function delete_product(productInfo) {
  // console.log(productInfo);
  const data = await productService.delete_product(productInfo);
  // console.log(data, "facade data");
  middleware.deletefromaws(data.key);
  // console.log(data)
}

//========================== Export Module Start ==============================

module.exports = {
  addProduct,
  getProduct,
  place_order,
  update_product,
  delete_product,
};

//========================== Export Module End ===============================signUp
