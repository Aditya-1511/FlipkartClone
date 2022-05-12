var express = require("express");
const { db } = require("../model/userModel");
var router = express.Router();
var User = require("../model/userModel");
var userDao = require("../Dao/userDao");
var userController = require("../controller/userController");

router.post("/signup", (req, res) => {
  console.log("Signup route is working fine");
  userDao.signUp(req.body);

  // console.log(user);
  res.send("User signed up successfully");
});

router.post("/login", (req, res) => {
  // console.log(req.body);
  console.log("Login route is working fine");
  userController
    .userLogin(req.body)
    .then(function (result) {
      res.send(result);
    })
    .catch(function (error) {
      res.send(error);
    });
});

module.exports = router;
