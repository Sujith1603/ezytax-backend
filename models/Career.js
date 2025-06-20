// models/Career.js
const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  postedDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Career', careerSchema);
