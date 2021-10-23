var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ticketSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        type: { type: String, default: "TICKET" },
        ticketCode: {
            type: String,
        },
        description: {
            type: String,
        },
        stageId: {
            type: Schema.Types.ObjectId,
            ref: "Stages",
        },
        projectId: {
            type: Schema.Types.ObjectId,
            ref: "Projects",
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
        status: {
            type: Schema.Types.ObjectId,
            ref: "Status",
        },
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
        subTasks: [
            {
                title: {
                    type: String,
                },
                description: {
                    type: String,
                },
                complete: {
                    type: Boolean,
                },
            },
        ],
        deletedOn: { type: Date, default: null },
        archivedOn: { type: Date, default: null },
        archivedBy: { type: Schema.Types.ObjectId, ref: "User" },
        deletedBy: { type: Schema.Types.ObjectId, ref: "User" },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        position: {
            type: Number,
        },
        archived: {
            type: Boolean,
            default: false,
        },
        comments: [{
            _id: true,
            type: String
        }],
        attachments: [
            {
                _id: true,
                type: String
            }
        ]
    },
    { collection: "tickets", timestamps: { createdAt: true, updatedAt: true } }
);

var TicketsModel = mongoose.model("Tickets", ticketSchema);
module.exports = { TicketsModel };

