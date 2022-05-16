var_ = require("lodash");
var appUtils = require('../appUtils');
var constant = require('../constant');
var exceptions = require('../customException');

"use strict";


var validatePost = function (req, res, next) {
    var {userid, postCaption, postImage, postLocation, accessToken} = req.body;
    // console.log(req.body, "req.body in validation.js");
    var {} = req.headers;
    var errors = [];
    
    if (_.isEmpty(userid)) {
        errors.push({
          fieldName: "userid",
          message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "userid"),
        });
      }

    if (_.isEmpty(postCaption)) {
      errors.push({
        fieldName: "postCaption",
        message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "postCaption"),
      });
    }
  
    if (_.isEmpty(postImage)) {
      errors.push({
        fieldName: "postImage",
        message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "postImage id"),
      });
    }

    if (_.isEmpty(postLocation)) {
      errors.push({
        fieldName: "postLocation",
        message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "postLocation"),
      });
    }

    if (_.isEmpty(accessToken)) {
        errors.push({
          fieldName: "accessToken",
          message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "accessToken"),
        });
      }
  
    if (errors && errors.length > 0) {
      validationError(errors, next);
    }
  
    next();
  };
  
  
  var validationError = function (errors, next) {
    if (errors && errors.length > 0) {
      return exceptions.getCustomErrorException(constant.MESSAGES.VALIDATION_ERROR,errors
        )
    }
    next();
  };
  
  module.exports = {
    validatePost
  };
  