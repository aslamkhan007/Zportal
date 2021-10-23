var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var projectsSchema = new Schema(
    {
        projectName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        programId: { type: Schema.Types.ObjectId, ref: "Program" },
        projectCode: {
            type: String,
        },
        archived: {
            type: Boolean,
            default: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        view: {
            type: String,
            enum: ['list', 'gantt', 'board',],
            default: 'gantt'
        },
        deletedOn: { type: Date, default: null },
        archivedOn: { type: Date, default: null },
        archivedBy: { type: Schema.Types.ObjectId, ref: "User" },
        deletedBy: { type: Schema.Types.ObjectId, ref: "User" },
        type: { type: String, default: "PROJECT" },
        createdBy: { type: Schema.Types.ObjectId, ref: "User" },
        stages: [
            {
                type: Schema.Types.ObjectId,
                ref: "Stages",
            },
        ],
        status: [
            {
                type: Schema.Types.ObjectId,
                ref: "Status",
            },
        ],
        workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace" },
        activity: [
            {
                text: {
                    type: String,
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        backgroundURL: {
            type: String,
        },
        members: [
            {
                _id: false,
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
                first_name: {
                    type: String,
                },
                last_name: {
                    type: String,
                },
                role: {
                    type: String,
                    default: "member",
                },
            },
        ],
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
    },


    { collection: "projects", timestamps: { createdAt: true, updatedAt: true } }
);

var ProjectsModel = mongoose.model("Projects", projectsSchema);

module.exports = { ProjectsModel };
