const mongoose = require("mongoose");

const noticeSchema = mongoose.Schema(
    {
        description: {
            type: String,
            required: [true],
        },
        title: {
            type: String,
            required: [true],
        },
    },
    {
        timestamps: true,
    }
    );
    
    module.exports = mongoose.model("notice", noticeSchema);
    