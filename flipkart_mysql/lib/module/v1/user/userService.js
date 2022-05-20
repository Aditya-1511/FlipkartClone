"use strict";

//========================== Load Modules Start =======================

//========================== Load internal modules ====================
const promise = require("bluebird");
// Load user dao
var _ = require("lodash");
const userDao = require("./userDao");

//========================== Load Modules End ==============================================

function login(loginInfo) {
  return userDao.login(loginInfo);
}

function signUp(loginInfo) {
  return userDao.signUp(loginInfo);
}

function isEmailIdExist(loginInfo) {
  // console.log(loginInfo, "saJAfdhgd");
  return userDao.isEmailIdExist(loginInfo);
}

//========================== Export Module Start ==============================

module.exports = {
  login,
  signUp,
  isEmailIdExist,
};

//========================== Export Module End ===============================
