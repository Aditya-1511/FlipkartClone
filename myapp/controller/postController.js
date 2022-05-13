var postDao = require("../Dao/postDao");

function add_post(postInfo) {
  // console.log(postInfo,"postInfo in postController");
  postDao.add_post(postInfo);
}

function update_post(postInfo) {
  // console.log("update post in postController");
  // console.log(postInfo, "postInfo in postController");
  postDao
    .get_post(postInfo.postId)
    .then(function (result) {
      if (result) {
        postDao.update_post(postInfo);
      } else {
        return "Post does not exist";
      }
    })
    .catch(function (error) {
      return "No post found";
    });
}

module.exports = {
  add_post,
  update_post,
};
