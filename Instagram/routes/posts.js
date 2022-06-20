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
var mediaUpload = require("../middleware/mediaUpload");

router.post(
  "/add_post",
  [
    verifyToken.isValidToken,
    middlewareMulter.array("postImage"),
    mediaUpload.uploadMultipleMediaToS3("postImage"),
  ],
  (req, res) => {
    console.log("Add post route is working fine");
    // console.log(req.payload, "req.payload");
    // console.log(req.body, "req.body");
    let { userid, postCaption, postLocation, imageLoction } = req.body;
    // console.log(imageLoction, "imageLocation");
    postController
      .add_post({ userid, postCaption, postLocation, imageLoction })
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

router.get("/get_all_information", (req, res) => {
  console.log("Get all information route is working fine");
  // console.log(req.headers.accesstoken);
  let accessToken = req.headers.accesstoken;
  return postController
    .get_all_information(accessToken)
    .then(function (result) {
      res.send(result);
    })
    .catch(function (error) {
      res.send(error);
    });
});

module.exports = router;
