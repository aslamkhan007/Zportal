var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const StageSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Projects',
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    tickets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tickets',
        },
    ],
    type: { type: String, default: "STAGE" },

    deletedOn: { type: Date, default: null },
    archivedOn: { type: Date, default: null },
    archivedBy: { type: Schema.Types.ObjectId, ref: "User" },
    deletedBy: { type: Schema.Types.ObjectId, ref: "User" },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    archived: {
        type: Boolean,
        default: false,
    },
    position: {
        type: Number
    },
    label: {
        type: String,
    },
    assignTo: [
        {
            type: Schema.Types.ObjectId,
            ref: "users",
        }
    ],
    startDate: { type: Date, default: null },
    dueDate: { type: Date, default: null },
    daysCount: { type: Number, default: null },

    priority: {
        type: String,
        enum: ['low', 'high', 'medium', 'none'],
        default: 'none'
    },
    watchers: [
        {
            type: Schema.Types.ObjectId,
            ref: "users",
        }
    ],
    estimate: {
        type: Number,
        default: null,
    },
    workedOn: {
        type: Date,
        default: null,
    },
    riskStatus: {
        type: String,
    },
    progress: {
        type: String,
    },
    watcher: {
        type: String,
    },

}, { collection: "stages", timestamps: { createdAt: true, updatedAt: true } });


var StagesModel = mongoose.model("Stages", StageSchema);
module.exports = { StagesModel };