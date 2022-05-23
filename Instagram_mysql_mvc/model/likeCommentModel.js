// Importing mongoose
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const Schema = mongoose.Schema;

var likeCommentSchema = new Schema({
  postId: {
    type: ObjectId,
    required: true,
  },
  likePost: {
    type: Number,
    default: 0,
  },
  userid: {
    type: String,
    required: true,
  },
  commentOnPost: {
    type: String,
  },
});

//Export user module
const likeComment = mongoose.model("likeComment", likeCommentSchema);
module.exports = likeComment;
