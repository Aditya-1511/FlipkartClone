const { token } = require("morgan");
var userDao = require("../Dao/userDao");
var jwtHandler = require("../jwtHandler");
var redisClient = require("../redis/redisClient");

async function signUp(userInfo) {
  // console.log(userInfo, "userInfo in Controller");
  // console.log("userController");
  userDao.signUp(userInfo);
}

async function userLogin(userInfo) {
  // console.log("Reached userController");
  // console.log(userInfo, "userInfo");

  return userDao
    .userLogin(userInfo)
    .then(async function (result) {
      // console.log(result, "result");
      // console.log(result[0].dataValues.email);
      var userToken = jwtHandler.generateUserToken(result[0].dataValues.email);

      let rs = await redisClient.setValue(
        result[0].dataValues.email,
        userToken
      );
      return userToken;
    })
    .catch(function (error) {
      return "Wrong credentials entered";
    });
}

async function userLogout(email) {
  // console.log(email, "email");
  let deletedUser = await redisClient.deleteValue(email);
  if (deletedUser) {
    return "User has been logged out successfully";
  }
}

async function userDelete(userid) {
  console.log(userid, "userId in controller");
  return userDao.userDelete(userid);
}
module.exports = {
  signUp,
  userLogin,
  userLogout,
  userDelete,
};
