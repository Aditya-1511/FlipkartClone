const usrRoutr = require("express").Router();
const resHndlr = require("../../../responseHandler");
const middleware = require("../../../middleware");
const constants = require("../../../constant");
const productFacade = require("./productFacade");
const validators = require("./productValidators");
const { deletefromaws } = require("../../../middleware/mediaUpload");

usrRoutr
  .route("/add_product")
  .post([middleware.multer.single("prodImage"),middleware.mediaUpload.uploadSingleMediaToS3("prodImage"),validators.validateProduct], function (req, res) {
    console.log(req.body.key)
    let {
      productName,
      productId,
      price,
      deliveryPinCode,
      size,
      color,
      quantity,
      location,
      key
    } = req.body;
    // console.log(req.body, "add product");
    productFacade
      .addProduct({
        productName,
        productId,
        price,
        deliveryPinCode,
        size,
        color,
        quantity,
        location,
        key
      })
      .then(function (result) {
        resHndlr.sendSuccess(res, result, req);
      })
      .catch(function (err) {
        resHndlr.sendError(res, err, req);
      });
  });

usrRoutr.route("/get_product")
.post(async function (req, res) {
  console.log("Get is working fine");
  let { productId } = req.body;
  let prodFac = await productFacade
    .getProduct({ productId })
    .then(function (result) {
      resHndlr.sendSuccess(res, result, req);
    })
    .catch(function (err) {
      resHndlr.sendError(res, err, req);
    });
});

usrRoutr.route("/place_order")
.post(async function (req, res) {
  console.log("Place order is working fine");
  let {
    productId,
    quantity,
    email
  } = req.body;
//   console.log(quantity);
  productFacade
    .place_order({
      productId,
      quantity,
      email
    })
    .then(function (result) {
      resHndlr.sendSuccess(res, result, req);
    })
    .catch(function (err) {
      resHndlr.sendError(res, err, req);
    });
});

usrRoutr.route("/update_product")
.put(async function (req, res) {
  console.log("Update Product is working fine");
  let { productId, quantity } = req.body;
  // console.log(req.body);
  productFacade
    .update_product({ productId, quantity })
    .then(function (result) {
      resHndlr.sendSuccess(res, result, req);
    })
    .catch(function (err) {
      resHndlr.sendError(res, err, req);
    });
});

usrRoutr.route("/delete_product")
.delete(async function (req, res) {
  console.log("Delete Product is working fine");
  let { productId} = req.body;
  // console.log(req.body, "delete route data");
  productFacade
    .delete_product({productId})
    .then(function (result) {
      resHndlr.sendSuccess(res, result, req);
    })
    .catch(function (err) {
      resHndlr.sendError(res, err, req);
    });
});

module.exports = usrRoutr;
