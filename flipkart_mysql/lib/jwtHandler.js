const jwt = require("jsonwebtoken");

async function generateUserToken(tokenObj) {
  const token = await jwt.sign(tokenObj, process.env.JWT_SECRET_KEY);
  // console.log("gentoken",token);
  return token;
}

function decode(tokenObj) {
  const decode = jwt.verify(tokenObj, process.env.JWT_SECRET_KEY);
  // console.log("decode", decode);
  return decode;
}

module.exports = {
  generateUserToken,
  decode,
};
