const { token } = require("morgan");
var likeCommentDao = require("../Dao/likeCommentDao");
var jwtHandler = require("../jwtHandler");
var redisClient = require("../redis/redisClient");

async function addLikeComment(postInfo) {
  // console.log(postInfo);
  console.log("Add Like Comment in likeCommentController", postInfo.postId);
  return await likeCommentDao
    .getPost(postInfo.postId)
    .then(async function (result) {
      if (result) {
        return await likeCommentDao.addLikeComment(postInfo);
      } else {
        return "Post does not exist";
      }
    })
    .catch(function (error) {
      return error;
    });
}

async function getTotalLikes(postId) {
  console.log("Get total likes in likeCommentController");
  likeCommentDao.getTotalLikes(postId);
}

async function updateComment(postInfo) {
  // console.log(postInfo)
  console.log("likeCommentController");
  return await likeCommentDao
    .updateComment(postInfo)
    .then(async function (result) {
      if (result) {
        return await likeCommentDao.updateComment(postInfo.commentOnPost);
      } else {
        return "Post does not exist";
      }
    })
    .catch(function (error) {
      return "No post found";
    });
}

module.exports = {
  addLikeComment,
  getTotalLikes,
  updateComment,
};
