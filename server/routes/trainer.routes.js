const express = require('express');
const router = express.Router();
const Trainer = require('../models/trainer.model');
const Training = require('../models/training.model');
const { authMiddleware, roleMiddleware } = require('../middleware/auth.middleware');

// Get trainer profile
router.get('/profile', authMiddleware, roleMiddleware(['trainer']), async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ userId: req.user.userId });
    res.json(trainer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update trainer profile
router.put('/profile', authMiddleware, roleMiddleware(['trainer']), async (req, res) => {
  try {
    const trainer = await Trainer.findOneAndUpdate(
      { userId: req.user.userId },
      req.body,
      { new: true }
    );
    res.json(trainer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update trainer availability
router.patch('/availability', authMiddleware, roleMiddleware(['trainer']), async (req, res) => {
  try {
    const { isAvailable } = req.body;
    const trainer = await Trainer.findOneAndUpdate(
      { userId: req.user.userId },
      { isAvailable },
      { new: true }
    );
    res.json(trainer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get available trainings matching trainer's skills
router.get('/available-trainings', authMiddleware, roleMiddleware(['trainer']), async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ userId: req.user.userId });
    const trainings = await Training.find({
      status: 'open',
      requiredSkills: { $in: trainer.skills }
    });
    res.json(trainings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Apply for training
router.post('/trainings/:trainingId/apply', authMiddleware, roleMiddleware(['trainer']), async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ userId: req.user.userId });
    const training = await Training.findById(req.params.trainingId);
    
    if (!training) {
      return res.status(404).json({ message: 'Training not found' });
    }
    
    if (training.status !== 'open') {
      return res.status(400).json({ message: 'Training is not open for applications' });
    }
    
    // Check if trainer has required skills
    const hasRequiredSkills = training.requiredSkills.every(skill => 
      trainer.skills.includes(skill)
    );
    
    if (!hasRequiredSkills) {
      return res.status(400).json({ message: 'You do not have all required skills for this training' });
    }
    
    // Add trainer to applications
    if (!training.applications) {
      training.applications = [];
    }
    
    training.applications.push({
      trainerId: trainer._id,
      status: 'pending',
      appliedAt: new Date()
    });
    
    await training.save();
    res.json(training);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get trainer's trainings
router.get('/trainings', authMiddleware, roleMiddleware(['trainer']), async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ userId: req.user.userId });
    const trainings = await Training.find({ trainerId: trainer._id });
    res.json(trainings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;