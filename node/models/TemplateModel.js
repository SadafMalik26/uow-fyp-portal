const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  document: {
      data: Buffer  },
  title: {
    type: String,
    required: true
},
 
}, { timestamps: true });

module.exports = mongoose.model('Template', templateSchema);
