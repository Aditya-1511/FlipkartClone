var express = require("express");
var router = express.Router();
var likeCommentModel = require("../model/likeCommentModel");
var likeCommentDao = require("../Dao/likeCommentDao");
var likeCommentController = require("../controller/likeCommentController");
var verifyToken = require("../middleware/verifyToken");

router.post("/add_like_comment", (req, res) => {
  console.log("Add like comment route is working fine");
  console.log(typeof req.body.likePost, "typeroute");
  likeCommentController
    .addLikeComment(req.body)
    .then(function (result) {
      return result;
    })
    .catch(function (error) {
      return error;
    });
});

router.get("/total_likes_on_post", [verifyToken.isValidToken], (req, res) => {
  console.log("Total likes route is working fine");
  // console.log(req.headers.accesstoken);
  // console.log(req.query, "req.query");

  likeCommentController.getTotalLikes(req.query);
});

router.put("/update_comment", (req, res) => {
  console.log("Update comment route is working fine");
  // console.log(req.body);
  likeCommentController.updateComment(req.body);
});

module.exports = router;
