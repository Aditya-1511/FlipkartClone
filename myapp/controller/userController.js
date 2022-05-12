var userDao = require('../Dao/userDao');
var jwtHandler = require('../jwtHandler');

async function userLogin(userInfo){
    console.log("Reached userController");
    // console.log(userInfo, "userInfo");

    return userDao.userLogin(userInfo)
        .then(function(result){
            // console.log(result, "result");
            if(result.password == userInfo.password){
               var userToken = jwtHandler.generateUserToken(result.email);
               return userToken;
            }
        })
    // return userInfo;
}



module.exports = {
    userLogin
}