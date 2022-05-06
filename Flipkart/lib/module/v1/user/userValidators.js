//========================== Load Modules Start ===========================

//========================== Load external Module =========================
var _ = require("lodash");

//========================== Load Internal Module =========================
var appUtils = require("../../../appUtils");
var constant = require("../../../constant");
var exceptions = require("../../../customException");

//========================== Load Modules End =============================

//========================== Export Module Start ===========================

var validateSignup = function (req, res, next) {

    var { name, email, password, gender, dob} = req.body;

    var {  } = req.headers;
    var errors = [];
   
    if(_.isEmpty(name)){
        errors.push({fieldName : "name", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}","name")});
    }

    if (_.isEmpty(email)) {
        errors.push({ fieldName: "email", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "Email id") });
    }
    // else if(appUtils.isValidEmail(email)){
    //     errors.push({ fieldName: "email", message: constant.MESSAGES.invalidEmail });
    // }
    if (_.isEmpty(password)) {
        errors.push({ fieldName: "password", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "Password") });
    }

    if (_.isEmpty(gender)) {
        errors.push({ fieldName: "gender", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "Gender") });
    }
   
    if (_.isEmpty(dob)) {
        errors.push({ fieldName: "dob", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "Dob") });
    }

    if (errors && errors.length > 0) {
        validationError(errors, next);
    }

    next();
}

var validateLogin = function (req, res, next) {

    var {  email, password} = req.body;
    var { } = req.headers;
    var errors = [];

    email = req.body.email = _.toLower(email);
    if (_.isEmpty(email)) {
        errors.push({ fieldName: "email", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "Email id") });
    }
    // else if(appUtils.isValidEmail(email)){
    //     errors.push({ fieldName: "email", message: constant.MESSAGES.invalidEmail });
    // }

    if (_.isEmpty(password)) {
        errors.push({ fieldName: "password", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "Password") });
    }

    if (errors && errors.length > 0) {
        validationError(errors, next);
    }
    next();
};


var validationError = function (errors, next) {
    if (errors && errors.length > 0) {
        return next(exceptions.getCustomErrorException(constant.MESSAGES.validationError, errors))
    }
    next();
}

module.exports = {
    validateSignup,
    validateLogin
};
//========================== Export module end ==================================
