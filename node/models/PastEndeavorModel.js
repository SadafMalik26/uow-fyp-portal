const mongoose = require("mongoose");

const PastEndeavorschema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true],
    },
    supervisorname: {
      type: String,
      required: [true],
    },
     membersname: {
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
      inyear: {
        type: String,
        required: [true],
      },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("pastendeavor", PastEndeavorschema);
