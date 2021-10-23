var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userPasswordSchema = new Schema(
  {
    password: { type: String },
    user_id: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { collection: "userPassword", timestamps: { createdAt: true, updatedAt: true } }
);

var UserPassword = mongoose.model("UserPassword", userPasswordSchema);

module.exports = UserPassword;
