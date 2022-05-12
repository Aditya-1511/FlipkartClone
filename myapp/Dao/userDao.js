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
  console.log("==================================");
  console.log(userid, "userid in Dao 1");
  let query = {};
  query._id = mongoose.Types.ObjectId(userid);
  // mongoose.Types.ObjectId(query);
  console.log(userid, "userid in Dao 2");
  console.log(query, "query in Dao");
  console.log(query._id, "query._id in Dao");
  console.log(userid, "userid in Dao 3");
  let userExist = await db.collection("user").deleteOne(query);
  console.log(userExist);
  console.log("==============================");
  return userExist;
}
//========================== Export Module Start ==============================

module.exports = {
  signUp,
  userLogin,
  userDelete,
};

//========================== Export Module End ===============================
