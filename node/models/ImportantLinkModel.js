const mongoose = require("mongoose");

const linkSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true],   
    },
    description: {
        type: String,
        required: [true],
      },
      url: {
        type: String,
        required: [true],
      },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("link", linkSchema);
