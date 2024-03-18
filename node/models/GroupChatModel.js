const mongoose = require("mongoose");

const groupChatSchema = mongoose.Schema(
    {
      
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'group',
        },
        userType: {
            type: String,
        },
        message: {
            type: String,
            required: [true, "Please add Message"],
        },
        status: {
            type: String,
            default: false
        },
    },
    {
        timestamps: true,
    }
    );
    
    module.exports = mongoose.model("groupchat", groupChatSchema);
    