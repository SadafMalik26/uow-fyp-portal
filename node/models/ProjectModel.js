const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add Title"],
    },
    status: {
      type: String,
      required: [true, "Please add Status"],
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    details: {
      type: String,
      required: [true, "Please add Details"],
    },
    proposal_document: {
      data: Buffer
    },
    requirement_document: {
      data: Buffer,
      
    },
    prop_document: {
      data: Buffer
    },
    defense_document: {
      data: Buffer
    },
    mid_document: {
      data: Buffer
    },
    final_document: {
      data: Buffer
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("project", projectSchema);
