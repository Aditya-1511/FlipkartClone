var_ = require("lodash");
var appUtils = require("../appUtils");
var constant = require("../constant");
var exceptions = require("../customException");

("use strict");

var validateLikeComment = function (req, res, next) {
  var { accessToken, postId, likePost, commentOnPost } = req.body;
  // console.log(req.body, "req.body in validation.js");
  var {} = req.headers;
  var errors = [];

  if (_.isEmpty(accessToken)) {
    errors.push({
      fieldName: "accessToken",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace(
        "{{key}}",
        "accessToken"
      ),
    });
  }

  if (_.isEmpty(postId)) {
    errors.push({
      fieldName: "postId",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "postId"),
    });
  }

  if (_.isEmpty(likePost)) {
    errors.push({
      fieldName: "likePost",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace(
        "{{key}}",
        "likePost id"
      ),
    });
  }

  if (_.isEmpty(commentOnPost)) {
    errors.push({
      fieldName: "commentOnPost",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace(
        "{{key}}",
        "commentOnPost"
      ),
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
  validateLikeComment,
};
