var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ProgramSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    workspaceId: {
        type: Schema.Types.ObjectId,
        ref: 'Workspace',
    },
    projects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Projects',
        },
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    location: { type: String },

    deletedOn: { type: Date, default: null },
    archivedOn: { type: Date, default: null },
    archivedBy: { type: Schema.Types.ObjectId, ref: "User" },
    deletedBy: { type: Schema.Types.ObjectId, ref: "User" },
    type: { type: String, default: "PROGRAM" },
    archived: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
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
}, { collection: "programs", timestamps: { createdAt: true, updatedAt: true } });


var ProgramModel = mongoose.model("Program", ProgramSchema);
module.exports = { ProgramModel };