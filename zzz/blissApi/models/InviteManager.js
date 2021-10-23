
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var inviteManagerSchema = new Schema(
  {
    invites: [{
      type: Schema.Types.ObjectId,
      ref: 'Workspace'
    }],
    acceptedInvites: [{
      type: Schema.Types.ObjectId,
      ref: 'Workspace'
    }],
    rejectedInvites: [{
      type: Schema.Types.ObjectId,
      ref: 'Workspace'
    }],
    email: { type: String },
    created_at: Date,
    updated_at: Date,
  },
  { collection: "invitesManager", timestamps: { createdAt: true, updatedAt: true } }
);

var InviteManager = mongoose.model("InviteManager", inviteManagerSchema);

module.exports = InviteManager;