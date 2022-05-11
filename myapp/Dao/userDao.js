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

if(emailExist){
    console.log("This email has already been taken");
}else{
    let result = db.collection("user").insertOne(user);
  if(result){
      console.log("Data inserted ");
  }
}
}

//========================== Export Module Start ==============================

module.exports = {
  signUp,
};

//========================== Export Module End ===============================
