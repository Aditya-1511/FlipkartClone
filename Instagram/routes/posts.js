var express = require("express");
const { db } = require("../model/postModel");
var router = express.Router();
var Post = require("../model/postModel");
var postDao = require("../Dao/postDao");
var postController = require("../controller/postController");
var multer = require("multer");
var verifyToken = require("../middleware/verifyToken");
var middlewareMulter = require("../middleware/multer");
var postValidation = require("../middleware/postValidation");

router.post(
  "/add_post",
  [
    verifyToken.isValidToken,
    middlewareMulter._singleFile("postImage"),
    postValidation.validatePost,
  ],
  (req, res) => {
    console.log("Add post route is working fine");
    // console.log(req.payload, "req.payload");
    // console.log(req.body, "req.body");
    let { userid, postCaption, postLocation } = req.body;
    postController
      .add_post({ userid, postCaption, postLocation })
      .then(function (result) {
        res.send(result);
      })
      .catch(function (error) {
        res.send(error);
      });
  }
);

router.put(
  "/update_post",
  [verifyToken.isValidToken, postValidation.validatePost],
  (req, res) => {
    console.log("Update post is working fine");
    // console.log(req.body, "req.body in posts");
    postController
      .update_post(req.body)
      .then(function (result) {
        res.send("Caption Updated");
      })
      .catch(function (error) {
        res.send("Some Error Occured");
      });
  }
);

router.delete("/delete_post", [verifyToken.isValidToken], (req, res) => {
  console.log("Delete post is working fine");
  // console.log(req.body, "req.body in posts.js");
  postController
    .delete_post(req.body)
    .then(function (result) {
      res.send(result);
    })
    .catch(function (result) {
      res.send("No post to delete");
    });
});

module.exports = router;
