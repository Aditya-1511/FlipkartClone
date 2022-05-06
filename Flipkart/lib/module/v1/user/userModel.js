// Importing mongoose
var mongoose = require("mongoose");
var constants = require("../../../constant");

var Schema = mongoose.Schema;
var User;

var UserSchema = new Schema({
  name: {
    type: String,
    default: "",
    required: true,
  },
  email: {
    type: String,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  dob: {
    type: String,
    default: "",
  }
});

UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.updated;
  return obj;
};

//Export user module
User = module.exports = mongoose.model(constants.DB_MODEL_REF.USER, UserSchema);
