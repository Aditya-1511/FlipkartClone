var express = require("express");
const { db } = require("../model/userModel");
var router = express.Router();
var User = require("../model/userModel");
var userDao = require("../Dao/userDao");
var userController = require("../controller/userController");
var middleware = require("../middleware/verifyToken");

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

router.post("/logout", [middleware.isValidToken], (req, res) => {
  console.log("Logout route is working fine");
  // console.log(req.payload);
  let email = req.payload;
  userController
    .userLogout(email)
    .then(function (result) {
      res.send(result);
    })
    .catch(function (error) {
      res.send(error);
    });
});

router.delete("/delete", (req, res) => {
  console.log("Delete route is working fine");
  // console.log(req.headers.userid, "userid");
  let userid = req.headers.userid;
  userController
    .userDelete(userid)
    .then(function (result) {
      res.send(result);
    })
    .catch(function (error) {
      res.send(error);
    });
});

module.exports = router;
