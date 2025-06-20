// routes/careers.js
const express = require('express');
const router = express.Router();
const Career = require('../models/Career');

// Get all careers
router.get('/', async (req, res) => {
  const careers = await Career.find();
  res.json(careers);
});

// Post new job
router.post('/', async (req, res) => {
  const newCareer = new Career(req.body);
  await newCareer.save();
  res.status(201).json({ message: 'Career posted!' });
});

module.exports = router;
