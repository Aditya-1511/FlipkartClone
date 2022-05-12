var jwt = require("jsonwebtoken");
var redisClient = require("../redis/redisClient");

async function isValidToken(req, res, next) {
  console.log(req.body);
  try {
    const decode = jwt.verify(
      req.headers.accesstoken,
      "sOpcLaROd5WoA38IbIbbnvn6wOkteAhO"
    );
    let token = await redisClient.getValue(decode.email);
    if (token) {
      req.payload = decode;
      next();
    } else {
      res.send("Your Session Expired Please Login !!!!");
    }
  } catch (error) {
    res.send(error);
  }
}

module.exports = {
  isValidToken,
};
