// load all dependencies
var Promise = require("bluebird"),
    config = require('./config');
var jwt = Promise.promisifyAll(require("jsonwebtoken"));
var exceptions = require('./customException');
var redisClient = require("./redisClient/init");

var genUsrToken = function (userObject, setExpire) {
    // console.log(userObject);
    let expireTime;
    if (userObject.tokenExpirationTime)
        expireTime = userObject.tokenExpirationTime;
    else{
        
        expireTime = 6 * 30 *  config.cfg.tokenExpirationTime; //6 months
        // expireTime = userObject.companyId.session == 2? "2h" : userObject.companyId.session == 4? "4h" : userObject.companyId.session == 24? '24h' : config.cfg.tokenExpirationTime; // 1 day
    }
  
    delete userObject.tokenExpirationTime;
    return jwt.signAsync({
        'userId':userObject.userId,
        'email' : userObject.email,
        },
         config.cfg.jwtSecretKey)
         .then(function (jwtToken) {
            //  console.log(jwtToken, "jwtToken");
        return jwtToken;
    }).catch(function (error) {
        throw new exceptions.tokenGenException(error)
    });
}

var genAdminToken = function (admin, setExpire) {
    var options = {};
    return jwt.signAsync(admin, config.cfg.jwtSecretKey, options)
        .then(function (jwtToken) {
            return jwtToken;
        })
        .catch(function (err) {
            throw new exceptions.tokenGenException()
        })
}

var verifyUsrToken = function (acsTokn) {
    return jwt.verifyAsync(acsTokn, config.cfg.jwtSecretKey)
        .then(function (tokenPayload) {
            this.tokenPayload = tokenPayload;
            return redisClient.getValue(acsTokn);
        })
        .then(function (reply) {
            if (reply) return this.tokenPayload;
            else throw new exceptions.unauthorizeAccess();
        })
        .catch(function (err) {
            throw new exceptions.unauthorizeAccess(err);
        })
}

var verifyUsrForgotPassToken = function (acsTokn) {
    return jwt.verifyAsync(acsTokn, config.cfg.jwtSecretKey)
        .then(function (tokenPayload) {
            return tokenPayload;
        })
        .catch(function (err) {
            throw new exceptions.unauthorizeAccess(err);
        })
}

var expireToken = function (accessToken) {
    if (accessToken) {
        //blacklist token in redis db
        //it will be removed after 6 months
        redisClient.setValue(accessToken, true);
        redisClient.expire(accessToken, 0);
    }
}   

module.exports = {
    genUsrToken,
    verifyUsrToken,
    expireToken,
    genAdminToken,
    verifyUsrForgotPassToken
}
