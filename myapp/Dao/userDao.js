"use strict";
//========================== Load Modules Start =======================

//========================== Load internal modules ====================
var mongoose = require("mongoose");
const { db, findOne } = require("../model/userModel");

//========================== Load internal modules ====================
const User = require("../model/userModel");

//========================== Load Modules End ==============================================

async function signUp(userInfo) {
  let user = new User(userInfo);
  //   console.log(user);
  //    console.log(userInfo.email);
  let query = {};
  query.email = userInfo.email;
  //    console.log(query.email);

  let emailExist = await db.collection("user").findOne(query);
  //   console.log(emailExist, "emailexist")

  if (emailExist) {
    console.log("This email has already been taken");
  } else {
    let result = db.collection("user").insertOne(user);
    if (result) {
      console.log("Data inserted ");
    }
  }
}

async function userLogin(userInfo) {
  // console.log(userInfo, "userinfo");
  let query = {};
  query.email = userInfo.email;
  let passwordQuery = {};
  query.password = userInfo.password;
  let emailExist = await db.collection("user").findOne(query);
  let passwordMatched = await db.collection("user").findOne(passwordQuery);

  if (emailExist && passwordMatched) {
    console.log("Login successful");
  } else {
    console.log("Wrong credentials entered");
  }
}
//========================== Export Module Start ==============================

module.exports = {
  signUp,
  userLogin,
};

//========================== Export Module End ===============================
