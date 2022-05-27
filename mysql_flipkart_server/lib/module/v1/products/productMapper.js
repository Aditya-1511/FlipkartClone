/**
 * This file will have request and response object mappings.
 */
var _ = require("lodash");
const contstants = require("../../../constant");
const config = require("../../../config");

function loginMapping(params) {
  const data = params.user;
  console.log(data);
  if (data.length != 0 && data[0].message != null) {
    return data[0].message;
  }

  var respObj = {
    message: "Product added successfully",
    productProfile: {
      Productname: data.productName,
      //  "_id": params.product._id,
      // "productId": params.product.productId,
      //  "productName": params.user.productName,
      //  // "username": params.user.username,
      //  "price": params.product.price,
      //  "deliveryPinCode": params.product.deliveryPinCode,
      //  "quantity": params.product.quantity,
      //  "size": params.product.size,
      //  "color": params.product.color,
      //  // "profileImage": (params.user.profileImage!='')?((params.user.isSocialImage==1)?params.user.profileImage:config.cfg.s3.base_url+params.user.profileImage):'',
      //  // "deviceToken" : params.user.deviceToken,
    },
  };
  return respObj;
}

module.exports = {
  loginMapping,
};
