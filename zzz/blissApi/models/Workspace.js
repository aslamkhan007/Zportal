var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var workspaceSchema = new Schema(
  {
    workspace: { type: String, required: true },
    invitedUsers: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    workspacePic : String,
    color: String,
    created_by: { type: Schema.Types.ObjectId, ref: "User" },
    created_at: Date,
    updated_at: Date,
  },
  { collection: "workspaces", timestamps: { createdAt: true, updatedAt: true } }
);

var Workspace = mongoose.model("Workspace", workspaceSchema);

module.exports = Workspace;
