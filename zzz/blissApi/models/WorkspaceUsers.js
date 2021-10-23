var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var workspaceUsersSchema = new Schema(
    {
        workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace" },
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        name: { type: String },
        type: { type: String },
        location: { type: String },
        deletedOn: { type: Date, default: null },
        deletedBy: { type: Schema.Types.Mixed, ref: "User", default: "" },
        restoreOn: { type: Date, default: null },
        restoreBy: { type: Schema.Types.Mixed, ref: "User", default: "" },
        isDeleted: { type: Boolean, default: false },
        created_at: Date,
        updated_at: Date,
    },
    { collection: "wsusers", timestamps: { createdAt: true, updatedAt: true } }
);

var WorkspaceUsers = mongoose.model("WorkspaceUsers", workspaceUsersSchema);
module.exports = WorkspaceUsers;
