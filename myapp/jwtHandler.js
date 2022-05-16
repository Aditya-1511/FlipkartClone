const jwt = require("jsonwebtoken");

function generateUserToken(tokenObj) {
  // console.log(tokenObj, "tokenObj");
  const token = jwt.sign(tokenObj, "sOpcLaROd5WoA38IbIbbnvn6wOkteAhO");
  // console.log("gentoken",token);
  return token;
}

function decodeToken(tokenObj) {
  const decode = jwt.verify(tokenObj, "sOpcLaROd5WoA38IbIbbnvn6wOkteAhO");
  // console.log("decode", decode);
  return decode;
}

module.exports = {
  generateUserToken,
  decodeToken,
};
