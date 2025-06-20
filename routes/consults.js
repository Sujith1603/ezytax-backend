const express = require('express');
const router = express.Router();
const Consult = require('../models/Consult');

// @route POST /api/consults
// @desc Save consultation request
router.post('/', async (req, res) => {
  const { name, email, state } = req.body;

  try {
    const newConsult = new Consult({ name, email, state });
    const savedConsult = await newConsult.save();
    res.status(201).json(savedConsult);
  } catch (err) {
    console.error('Error saving consult:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
