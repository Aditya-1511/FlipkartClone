"use strict";

//========================== Load Modules Start =======================

//========================== Load external modules ====================
// Load user service
var _ = require("lodash");
var Promise = require("bluebird");
//========================== Load internal modules ====================

const usrService = require("./userService");
const userMapper = require("./userMapper");

const appUtils = require("../../../appUtils");
const redisClient = require("../../../redisClient/init");
const exceptions = require("../../../customException");
const jwtHandler = require("../../../jwtHandler");

//========================== Load Modules End ==============================================

function signUp(loginInfo) {
  // console.log(loginInfo, "AJSgdafdvkjsvfbfkshfd")
  return usrService.isEmailIdExist(loginInfo).then(function (result) {
    if (result[0 != undefined]) {
      return "exist";
    } else {
      return usrService.signUp(loginInfo);
    }
  });
  // console.log(loginInfo);
}

async function login(loginInfo) {
  return usrService.isEmailIdExist(loginInfo).then(async function (user) {
    if (user[0] != undefined) {
      console.log("Login successful");
      if (loginInfo.password === user.password) {
        console.log("Login Successful");
      }
      // return usrService.verifyUser(loginInfo)
      var tokenObj = buildUserTokenGenObj(user);
      // console.log(user, "user");
      // console.log(tokenObj, "tokenObj");
      var token = await jwtHandler.generateUserToken(tokenObj);
      // console.log(token, "token");
      //store token in redis
      redisClient.setValue(loginInfo.email, token);
    } else {
      // console.log("User already exists");
      return usrService.login(loginInfo);
    }
  });
}

function logout(loginInfo) {
  // console.log(loginInfo);
  return redisClient.deleteValue(loginInfo.email);
}

function buildUserTokenGenObj(user) {
  // console.log(user, "user");
  var userObj = {};
  userObj.email = user[0].dataValues.email;
  // console.log(userObj)
  return userObj;
}

//========================== Export Module Start ==============================

module.exports = {
  signUp,
  login,
  buildUserTokenGenObj,
  logout,
};

//========================== Export Module End ===============================signUp
