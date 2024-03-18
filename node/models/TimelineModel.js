const mongoose = require("mongoose");

const timelineSchema = mongoose.Schema(
     {
        description: {
            type: String,
            required: [true],
        },
         title: {
            type: String,
            required: [true],
        },
        date: {
            type: String,
            required: [true],
        },
    },
    {
        timestamps: true,
    }
    );
    

module.exports = mongoose.model("timeline", timelineSchema);

