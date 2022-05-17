var postDao = require("../Dao/postDao");
const nodemailer = require("../service/nodemailer_email");

function add_post(postInfo) {
  // console.log(postInfo,"postInfo in postController");
  nodemailer.send_mail(productInfo.email, data);
  return postDao.add_post(postInfo);
}

async function update_post(postInfo) {
  // console.log("update post in postController");
  // console.log(postInfo, "postInfo in postController");
  postDao
    .get_post(postInfo.postId)
    .then(async function (result) {
      if (result) {
        return await postDao.update_post(postInfo);
      } else {
        return "Post does not exist";
      }
    })
    .catch(function (error) {
      return "No post found";
    });
}

async function delete_post(postInfo) {
  console.log("Delete post in postController");
  // console.log(postInfo, "postInfo in postController");
  return await postDao.delete_post(postInfo);
}

function get_all_information(accessToken){
  console.log("Get all info in postController");
  // console.log(accessToken);
 return postDao.get_all_information(accessToken);
}

module.exports = {
  add_post,
  update_post,
  delete_post,
  get_all_information
};
