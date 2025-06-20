const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  date: { type: Date, default: Date.now },
  status: String,
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
