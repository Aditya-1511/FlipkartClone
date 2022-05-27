"use strict";
//========================== Load Modules Start =======================

//========================== Load internal modules ====================
var mongoose = require("mongoose");
var promise = require("bluebird");

var _ = require("lodash");
//========================== Load internal modules ====================
const userModel = require("./userModel");

// init user dao
// let BaseDao = require("../../../dao/baseDao");
// const userDao = new BaseDao(UserModel);

//========================== Load Modules End ==============================================

async function signUp(userInfo) {
  // console.log(userInfo, "hasfjgvfhvma");
  const jane = await userModel.User.build(userInfo);
  return jane.save();
}

async function isEmailIdExist(params) {
  // console.log(params, "sahgfasjdgfsahdf");
  let emailExists = await userModel.User.findAll({
    where: { email: params.email },
  });
  return emailExists;
}

//========================== Export Module Start ==============================

module.exports = {
  signUp,
  isEmailIdExist,
};

//========================== Export Module End ===============================
