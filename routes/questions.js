const express = require('express');
const Question = require('../models/Question');

const router = express.Router();

// Create a new question
router.post('/', async (req, res) => {
  const { description } = req.body;

  try {
    const newQuestion = new Question({
      description,
      answers: []
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
