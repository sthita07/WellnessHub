const Journal = require('../models/journals');

exports.createJournal = async (req, res) => {
  const journal = await Journal.create({
    user: req.user._id,
    content: req.body.content
  });
  res.status(201).json(journal);
};

exports.getJournals = async (req, res) => {
  const journals = await Journal.find({ user: req.user._id });
  res.json(journals);
};
