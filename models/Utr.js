const mongoose = require('mongoose');

const UtrSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  utrNumber: String,
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Utr', UtrSchema);
