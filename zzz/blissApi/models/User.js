var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    email: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    password: { type: String },
    phone: { type: String },
    created_by: { type: Schema.Types.ObjectId, ref: "User" },
    role: { type: Number, required: true },
    status: { type: Number, default: 0 },
    token: { type: String },
    pw_token: { type: String },
    profile_img: { type: String, default: "user.png" },
    workSpaceCount: { type: Number, default: 1 },
    getInvitedCount: { type: Number, default: 1 },
    selectedTimeZone: { type: String, default: null },
    selectedTimeFormat: { type: Number, default: 12 },
    selectedDateFormat: { type: String, default: "DD/MM/YYYY" },
    notifications: { type: String, default: "yes" },
    created_at: Date,
    updated_at: Date,
  },
  { collection: "users", timestamps: { createdAt: true, updatedAt: true } }
);

var User = mongoose.model("User", userSchema);

module.exports = User;
