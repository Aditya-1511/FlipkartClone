const { token } = require("morgan");
var userDao = require("../Dao/userDao");
var jwtHandler = require("../jwtHandler");
var redisClient = require("../redis/redisClient");

async function userLogin(userInfo) {
  // console.log("Reached userController");
  // console.log(userInfo, "userInfo");

  return userDao
    .userLogin(userInfo)
    .then(async function (result) {
      // console.log(result, "result");
      if (result.password == userInfo.password) {
        console.log("Login successful");
        var userToken = jwtHandler.generateUserToken(result.email);
        // console.log(userToken);
        let rs = await redisClient.setValue(result.email, userToken);

        return userToken;
      }
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
module.exports = {
  userLogin,
  userLogout,
};
