const mongoose = require("mongoose");

const groupSchema = mongoose.Schema(
  {
    student1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    student2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: false,

    },
    student3: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: false,

    },
    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: false,

    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'project',
      default:null

    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("group", groupSchema);
