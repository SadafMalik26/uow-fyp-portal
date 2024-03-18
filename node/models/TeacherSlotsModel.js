const mongoose = require("mongoose");

const teacherSlotSchema = mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: [true, "Please add the teacher ID"],
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "group",
      default:null
    },
    isBooked: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: 'none'
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    }
   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Slot", teacherSlotSchema);
