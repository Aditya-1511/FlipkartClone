"use strict";
//========================== Load Modules Start =======================

//========================== Load internal modules ====================
var mongoose = require("mongoose");
const { db } = require("../model/userModel");

//========================== Load internal modules ====================
const User = require("../model/userModel");

//========================== Load Modules End ==============================================

function signUp(userInfo) {
  let user = new User(userInfo);
  console.log(user);
  let result = db.collection("user").insertOne(user);
  if (result) {
    return result;
  } else {
    console.log(err);
  }
}

// function isEmailIdExist(params) {
//   let query = {};
//   query.email = params.email;
//   return userDao.findOne(query).then(function (result) {
//     if (result) {
//       return result;
//     } else {
//       return false;
//     }
//   });
// }

//========================== Export Module Start ==============================

module.exports = {
  signUp,
  //   isEmailIdExist,
};

//========================== Export Module End ===============================
