const express = require('express');
const router = express.Router();
const Utr = require('../models/Utr');

// Add UTR
router.post('/', async (req, res) => {
  try {
    const utr = new Utr(req.body);
    await utr.save();
    res.status(201).json(utr);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all UTRs
router.get('/', async (req, res) => {
  try {
    const utrs = await Utr.find();
    res.json(utrs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
