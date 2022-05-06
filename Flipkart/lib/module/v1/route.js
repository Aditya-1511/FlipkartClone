var express = require("express");
var router = express.Router();

const adminRoute = require("./admin/adminRoute");
const userRoute = require("./user/userRoute");
const productRoute = require("./products/productRoute");

//========================== Export Module Start ==========================

//API version 1
router.use("/admin", adminRoute);
router.use("/user", userRoute);
router.use("/product", productRoute);

module.exports = router;
//========================== Export Module End ============================
