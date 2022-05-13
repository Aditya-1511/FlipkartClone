const { query } = require("express");
const { default: mongoose } = require("mongoose");
var likeCommentModel = require("../model/likeCommentModel");
const ObjectId = require("mongodb").ObjectId;
const { db, findOne } = require("../model/likeCommentModel");

async function addLikeComment(postInfo) {
  console.log("Add Like Comment in likeCommentDao", postInfo);
  console.log(typeof postInfo.likePost, "type");
  let add_Like_Comment = await db
    .collection("likeComments")
    .insertOne(postInfo);
  // console.log(add_Like_Comment, "add_Like_Comment");
  return add_Like_Comment;
}

async function getPost(postId) {
  // console.log(postId,"++++++++");
  let obj = mongoose.Types.ObjectId(postId);
  let query = {};
  query._id = obj;
  // console.log(query);
  let findPost = await db.collection("posts").findOne(query);
  // console.log(findPost);
  return findPost;
}

async function getTotalLikes(postId) {
  console.log(postId, "postId");
  let postid = mongoose.Types.ObjectId(postId.postId);
  console.log("Get total likes in likeCommentDao");
  let countLikes = await db
    .collection("likeComments")
    .aggregate([
      {
        //  $match: { commentOnPost: "Good" } ,
        $group: {
          _id: postId,
          totallikes: {
            $sum: "$likePost",
          },
        },
      },
    ])
    .toArray();
  console.log("+++", countLikes);
  // .then(function (result, error) {
  //   if (result) {
  //     console.log(result);
  //   } else {
  //     console.log(error);
  //   }
  // });
}

module.exports = {
  addLikeComment,
  getPost,
  getTotalLikes,
};
