const Promise = require("bluebird"),
  RedisSessions = require("redis-sessions");

var rs;
var config = require("../config");

var rsapp = config.cfg.redis.appname;
logger = require("../logger");

var init = function () {
  rs = new RedisSessions({
    host: config.cfg.redis.server,
    port: config.cfg.redis.port,
    namespace: config.cfg.redis.namespace,
  });
};

//create token
exports.create = function (value) {
  return new Promise(function (resolve, reject) {
    rs.create(
      {
        app: rsapp,
        id: value.userId,
        ip: value.IP,
        ttl: value.expTime,
        d: value.userObj,
      },
      function (err, resp) {
        if (err) {
          reject(err);
        }
        if (resp) {
          resolve(resp);
        }
        // resp should be something like
        // {token: "r30kKwv3sA6ExrJ9OmLSm4Wo3nt9MQA1yG94wn6ByFbNrVWhcwAyOM7Zhfxqh8fe"}
      }
    );
  });
};

//update token data
exports.set = function (token, value) {
  return new Promise(function (resolve, reject) {
    rs.set(
      {
        app: rsapp,
        token: token,
        d: value,
      },
      function (err, resp) {
        if (err) {
          reject(err);
        }
        if (resp) {
          resolve(resp);
        }
      }
    );
  });
};

//get token detail
exports.getByToken = function (token) {
  return new Promise(function (resolve, reject) {
    rs.get(
      {
        app: rsapp,
        token: token,
      },
      function (err, resp) {
        if (err) {
          reject(err);
        }
        if (resp) {
          resolve(resp);
        }
      }
    );
  });
};

//expair / kill token
exports.expire = function (token) {
  return new Promise(function (resolve, reject) {
    rs.kill(
      {
        app: rsapp,
        token: token,
      },
      function (err, resp) {
        if (err) {
          reject(err);
        }
        if (resp) {
          resolve(resp);
        }
        /*
            resp contains the result:

            {kill: 1}
            */
      }
    );
  });
};

//get user all session/token detail
exports.getByUserId = function (userId) {
  return new Promise(function (resolve, reject) {
    rs.soid(
      {
        app: rsapp,
        id: userId,
      },
      function (err, resp) {
        if (err) {
          reject(err);
        }
        if (resp) {
          resolve(resp);
        }
      }
    );
  });
};

//Kill all sessions of an id within an app
exports.expireByUserId = function (userId) {
  return new Promise(function (resolve, reject) {
    rs.killsoid(
      {
        app: rsapp,
        id: userId,
      },
      function (err, resp) {
        if (err) {
          reject(err);
        }
        if (resp) {
          resolve(resp);
        }
      }
    );
  });
};

init();
