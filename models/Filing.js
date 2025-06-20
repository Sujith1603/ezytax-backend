const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  filename: String,
  mimetype: String,
  data: Buffer
});

const filingSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  mobile: String,
  pan: String,
  dob: String,
  date: String,
  employmentType: String,
  incomeSources: [String],
  deductions: [String],
  remarks: String,
  documents: [documentSchema]
});

module.exports = mongoose.model('Filing', filingSchema);
