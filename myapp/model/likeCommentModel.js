// Importing mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var likeCommentSchema = new Schema({
  postId: {
    type: Number,
    required: true,
  },
  likePost: {
    type: Number,
    default: 0,
  },
  commentOnPost: {
    type: String,
  },
});

//Export user module
const likeComment = mongoose.model("likeComment", likeCommentSchema);
module.exports = likeComment;
