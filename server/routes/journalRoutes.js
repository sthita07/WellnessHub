const express = require('express');
const router = express.Router();
const Journal = require('../models/journals.js');

const protect  = require('../middleware/authMiddleware');

// POST /api/createjournals - createJournal
router.post('/createjournals', protect, async (req, res) => {
  try {
    const journal = await Journal.create({
      user: req.user._id,
      content: req.body.content,
    });
    res.status(201).json(journal);
  } catch (error) {
    console.error('Error creating journal:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/getjournals - getJournals
router.get('/getjournals', protect, async (req, res) => {
  try {
    const journals = await Journal.find({ user: req.user._id });
    res.json(journals);
  } catch (error) {
    console.error('Error fetching journals:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;