const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        message: {
            type: String
        },
        isRead: {
            type: Boolean,
            default: false
          },
    },
    {
        timestamps: true,
    }
    );
    
    module.exports = mongoose.model("notification", notificationSchema);