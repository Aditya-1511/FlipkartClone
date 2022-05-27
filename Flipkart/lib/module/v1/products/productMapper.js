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
    },
  };
  return respObj;
}

module.exports = {
  loginMapping,
};
