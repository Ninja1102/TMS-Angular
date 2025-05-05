const express = require('express');
const router = express.Router();
const Company = require('../models/company.model');
const Training = require('../models/training.model');
const Trainer = require('../models/trainer.model');
const { authMiddleware, roleMiddleware } = require('../middleware/auth.middleware');

// Get company profile
router.get('/profile', authMiddleware, roleMiddleware(['company']), async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user.userId });
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update company profile
router.put('/profile', authMiddleware, roleMiddleware(['company']), async (req, res) => {
  try {
    const company = await Company.findOneAndUpdate(
      { userId: req.user.userId },
      req.body,
      { new: true }
    );
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Post new training requirement
router.post('/trainings', authMiddleware, roleMiddleware(['company']), async (req, res) => {
  try {
    const training = new Training({
      ...req.body,
      companyId: req.user.userId,
      status: 'open'
    });
    await training.save();
    res.status(201).json(training);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get company's trainings
router.get('/trainings', authMiddleware, roleMiddleware(['company']), async (req, res) => {
  try {
    const trainings = await Training.find({ companyId: req.user.userId });
    res.json(trainings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get available trainers
router.get('/available-trainers', authMiddleware, roleMiddleware(['company']), async (req, res) => {
  try {
    const { skills } = req.query;
    const skillsArray = skills ? skills.split(',') : [];
    
    const query = { isAvailable: true };
    if (skillsArray.length > 0) {
      query.skills = { $in: skillsArray };
    }
    
    const trainers = await Trainer.find(query);
    res.json(trainers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Assign trainer to training
router.patch('/trainings/:trainingId/assign', authMiddleware, roleMiddleware(['company']), async (req, res) => {
  try {
    const { trainerId } = req.body;
    const training = await Training.findOneAndUpdate(
      { _id: req.params.trainingId, companyId: req.user.userId },
      {
        trainerId,
        status: 'assigned',
        updatedAt: new Date()
      },
      { new: true }
    );
    
    // Update trainer availability
    await Trainer.findByIdAndUpdate(trainerId, { isAvailable: false });
    
    res.json(training);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;