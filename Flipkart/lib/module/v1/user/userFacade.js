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
  return usrService
    .isEmailIdExist(loginInfo)
    .bind({})
    .then(function (user) {
      this.user = user;
      if (this.user) {
        return usrService.updateUser(loginInfo);
      } else {
        return usrService.signUp(loginInfo);
      }
    })
    .then(function (user) {
      return userMapper.loginMapping({
        user: user,
        jwt: "12345",
        hitTime: [],
        chanellist: [],
        currentVersion: loginInfo.currentVersion,
        deviceTypeID: loginInfo.deviceTypeID,
        appType: loginInfo.appType,
      });
    });
}

/**
 * @function login
 * login via email
 * @param {Object} loginInfo login details
 */
function login(loginInfo) {
  return usrService
    .isEmailIdExist(loginInfo)
    .bind({})
    .then(async function (user) {
      this.user = user;
      if (this.user) {
        if (loginInfo.password === user.password) {
          console.log("Login Successful");
        }
        // return usrService.verifyUser(loginInfo)
        var tokenObj = buildUserTokenGenObj(user);
        // console.log(tokenObj);
                var token = await jwtHandler.genUsrToken(tokenObj);
                console.log(token);
                //store token in redis
                redisClient.setValue(user.email, token);
      } else {
        return usrService.login(loginInfo);
      }
    })
    .then(function (user) {
      return userMapper.loginMapping({
        user: user,
        jwt: "12345",
        hitTime: [],
        chanellist: [],
        currentVersion: loginInfo.currentVersion,
        deviceTypeID: loginInfo.deviceTypeID,
        appType: loginInfo.appType,
      });
    });
}

function logout(loginInfo) {
  // console.log(loginInfo);
  return redisClient.deleteValue(loginInfo.email);
}

function buildUserTokenGenObj(user) {
  var userObj = {};
  // userObj.deviceToken = user.deviceToken;
  userObj.email = user.email;
  //userObj.deviceTypeID = user.deviceTypeID;
  // userObj.deviceID = user.deviceID;
  userObj.userId = user._id;
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
