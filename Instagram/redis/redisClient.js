// const Promise = require("bluebird"),
const redis = require("redis");

// Promise.promisifyAll(redis.RedisClient.prototype),
//   Promise.promisifyAll(redis.Multi.prototype);

var client;
// (_ = require("lodash")),
//   (config = require("../config")),
//   (logger = require("../logger"));

var redisClient = redis.createClient(6379, "127.0.0.1");
redisClient.connect();
redisClient.on("connect", function (err) {
  console.log("Redis connected successfully");
});

exports.setValue = async function (key, value) {
  // console.log(key, "key");
  // console.log(value, "value");
  return redisClient
    .set(key, value)
    .then(function (response) {
      if (response) {
        //   console.log(response ,"hhh");
        // logger.info({ value: response }, "_redisSetValue");
        return response;
      }
    })
    .catch(function (error) {
      return error;
    });
  // let result = await redisClient.set(key,value)
  // return result;
};

exports.getValue = function (key) {
  return redisClient
    .get(key)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

exports.expire = function (key, expiryTime) {
  return client
    .expireAsync(key, expiryTime)
    .then(function (response) {
      return response;
      logger.info({ expire: response }, "_expireToken");
    })
    .catch(function (error) {
      logger.error({ error: error }, "_expireToken");
    });
};

exports.deleteValue = async function (key) {
  return redisClient
    .del(key)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      throw error;
    });
};
