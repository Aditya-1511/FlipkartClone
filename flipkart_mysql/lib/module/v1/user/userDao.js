"use strict";
//========================== Load Modules Start =======================

//========================== Load internal modules ====================
var mongoose = require("mongoose");
var promise = require("bluebird");

var _ = require("lodash");
//========================== Load internal modules ====================
const User = require("./userModel");

// init user dao
let BaseDao = require("../../../dao/baseDao");
const userDao = new BaseDao(User);

//========================== Load Modules End ==============================================

function signUp(userInfo) {
  userInfo.totalPred = 0;
  (userInfo.wonPred = 0), (userInfo.lostPred = 0);

  let user = new User(userInfo);
  // console.log(user);
  return userDao.save(user);
}

function isEmailIdExist(params) {
  // console.log(params, "params in userDao");
  let query = {};
  query.email = params.email;
  // return userDao.findOne(query).then(function (result) {
  //   if (result) {
  //     return result;
  //   } else {
  //     return false;
  //   }
  // });
}

//========================== Export Module Start ==============================

module.exports = {
  signUp,
  isEmailIdExist,
};

//========================== Export Module End ===============================
