/**
 * This file will have request and response object mappings.
 */
var _ = require("lodash");
const contstants = require("../../../constant");
const config = require("../../../config");

function loginMapping(params) {
  var respObj = {
    message: "User has been registered successfully",
    accessToken: params.jwt,
    userProfile: {
      _id: params.user._id,
      email: params.user.email,
      name: params.user.name,
      gender: params.user.gender,
      dob: params.user.dob,
    },
  };
  return respObj;
}

module.exports = {
  loginMapping,
};
