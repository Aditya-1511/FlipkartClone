//========================== Load Modules Start ===========================

//========================== Load external Module =========================
var _ = require("lodash");

//========================== Load Internal Module =========================
var appUtils = require("../../../appUtils");
var constant = require("../../../constant");
var exceptions = require("../../../customException");

//========================== Load Modules End =============================



//========================== Export Module Start ===========================

var validateProduct = function (req, res, next) {

    var { productName, productId, deliveryPinCode, price, color, size, quantity} = req.body;
    console.log(productName);

    var {  } = req.headers;
    var errors = [];
   
    if(_.isEmpty(productName)){
        errors.push({fieldName : "productName", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}","productName")});
        console.log(productName);
    }

    if (_.isEmpty(productId)) {
        errors.push({ fieldName: "productId", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "ProductId") });
    }
   
    if (_.isEmpty(deliveryPinCode)) {
        errors.push({ fieldName: "deliveryPinCode", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "DeliveryPinCode") });
    }

    if (_.isEmpty(price)) {
        errors.push({ fieldName: "price", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "Price") });
    }
    if (_.isEmpty(color)) {
        errors.push({ fieldName: "color", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "Color") });
    }
    if (_.isEmpty(size)) {
        errors.push({ fieldName: "size", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "Size") });
    }
    if (_.isEmpty(quantity)) {
        errors.push({ fieldName: "quantity", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "Quantity") });
    }
   
    if (errors && errors.length > 0) {
        validationError(errors, next);
    }

    next();
}

var validationError = function (errors, next) {
    if (errors && errors.length > 0) {
        return next(exceptions.getCustomErrorException(constant.MESSAGES.validationError, errors))
    }
    next();
}

module.exports = {
    validateProduct

};
//========================== Export module end ==================================
