"use strict";
//========================== Load Modules Start =======================

//========================== Load internal modules ====================
var mongoose = require("mongoose");
const { db, findOne } = require("../model/userModel");

//========================== Load internal modules ====================
const User = require("../model/userModel");
const jwt = require("../jwtHandler");

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

  return emailExist;
}

async function userDelete(userid) {
  // console.log(userid, "userid");
  let query = {};
  query._id = userid;
  // console.log(query, "query");
  // console.log(query._id, "query._id");
  // console.log(userid, "userid");
  let userExist = await db.collection("user").deleteOne(query);

  console.log(userExist);
  // return userExist;
}
//========================== Export Module Start ==============================

module.exports = {
  signUp,
  userLogin,
  userDelete,
};

//========================== Export Module End ===============================
