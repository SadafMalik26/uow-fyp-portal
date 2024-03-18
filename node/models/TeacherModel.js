const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema(
  {
    qualification: {
      type: String,
      required: [true, "Please add Qualification"],
    },
    interest: {
      type: String,
      required: [true, "Please add your interests"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Teacher", teacherSchema);