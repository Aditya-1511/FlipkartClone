var express = require("express");
const { db } = require("../model/userModel");
var router = express.Router();
var User = require("../model/userModel");
var userDao = require('../Dao/userDao');

router.post("/signup", (req, res) => {
  console.log("Signup route is working fine");
  userDao.signUp(req.body);

  // console.log(user);
  res.send("User signed up successfully");
});

module.exports = router;
