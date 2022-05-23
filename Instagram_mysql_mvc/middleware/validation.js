var_ = require("lodash");
var appUtils = require("../appUtils");
var constant = require("../constant");
var exceptions = require("../customException");

("use strict");

var validateSignup = function (req, res, next) {
  var { userid, name, email, password } = req.body;
  // console.log(req.body, "req.body in validation.js");
  var {} = req.headers;
  var errors = [];

  if (_.isEmpty(userid)) {
    errors.push({
      fieldName: "userid",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "userid"),
    });
  }

  if (_.isEmpty(name)) {
    errors.push({
      fieldName: "name",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "name"),
    });
  }

  if (_.isEmpty(email)) {
    errors.push({
      fieldName: "email",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "Email id"),
    });
  } else if (appUtils.isValidEmail(email)) {
    errors.push({
      fieldName: "email",
      message: constant.MESSAGES.INVALID_EMAIL,
    });
  }
  if (_.isEmpty(password)) {
    errors.push({
      fieldName: "password",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "Password"),
    });
  }

  if (errors && errors.length > 0) {
    validationError(errors, next);
  }

  next();
};

var validateLogin = function (req, res, next) {
  var { email, password } = req.body;
  var {} = req.headers;
  var errors = [];

  email = req.body.email = _.toLower(email);
  if (_.isEmpty(email)) {
    errors.push({
      fieldName: "email",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "Email id"),
    });
  }
  // else if(appUtils.isValidEmail(email)){
  //     errors.push({ fieldName: "email", message: constant.MESSAGES.invalidEmail });
  // }

  if (_.isEmpty(password)) {
    errors.push({
      fieldName: "password",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "Password"),
    });
  }

  if (errors && errors.length > 0) {
    validationError(errors, next);
  }
  next();
};

var validationError = function (errors, next) {
  if (errors && errors.length > 0) {
    return exceptions.getCustomErrorException(
      constant.MESSAGES.VALIDATION_ERROR,
      errors
    );
  }
  next();
};

module.exports = {
  validateSignup,
  validateLogin,
};
