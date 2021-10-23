var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const StatusSchema = new Schema({
    status: {
        type: String,
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Projects',
    },
    type: { type: String, default: "STATUS" },
    position: {
        type: Number
    }
}, { collection: "status", timestamps: { createdAt: true, updatedAt: true } });


var StatusModel = mongoose.model("Status", StatusSchema);
module.exports = { StatusModel };