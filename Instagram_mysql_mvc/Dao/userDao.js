"use strict";
//========================== Load Modules Start =======================

//========================== Load internal modules ====================
var mongoose = require("mongoose");
const { db, findOne } = require("../model/userModel");

//========================== Load internal modules ====================
const userModel = require("../model/userModel");
const jwt = require("../jwtHandler");

//========================== Load Modules End ==============================================

async function signUp(userInfo) {
  // console.log(userInfo, "userInfo in Dao");
  // console.log(userInfo.email);
  let emailExists = await userModel.User.findAll({
    where: { email: userInfo.email },
  });
  // console.log(emailExists, "emailExists");
  if (emailExists[0]) {
    console.log("This email has already been taken");
  } else {
    const jane = await userModel.User.build(userInfo);
    return jane.save();
  }
}

async function userLogin(userInfo) {
  // console.log(userInfo, "userinfo");
  let emailExists = await userModel.User.findAll({
    where: { email: userInfo.email },
  });
  let passwordMatched = await userModel.User.findAll({
    where: { password: userInfo.password },
  });
  if (emailExists[0] && passwordMatched[0]) {
    console.log("Login successful");
  } else {
    console.log("Wrong credentials entered");
  }
  return emailExists;
}

async function userDelete(userid) {
  //  console.log(userid, "userid in userDao");
  let userExists = await userModel.User.findAll({
    where: { userid: userid },
  });
  if (userExists[0]) {
    let deleteUser = await userModel.User.destroy(userid);
  } else {
    console.log("User does not exist");
  }
}
//========================== Export Module Start ==============================

module.exports = {
  signUp,
  userLogin,
  userDelete,
};

//========================== Export Module End ===============================
