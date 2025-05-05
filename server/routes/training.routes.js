const express = require('express');
const router = express.Router();
const Training = require('../models/training.model');
const { authMiddleware, roleMiddleware } = require('../middleware/auth.middleware');

// Create training requirement (Company only)
router.post('/', authMiddleware, roleMiddleware(['company']), async (req, res) => {
  try {
    const training = new Training({
      ...req.body,
      companyId: req.user.userId
    });
    await training.save();
    res.status(201).json(training);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get available trainings
router.get('/available', authMiddleware, async (req, res) => {
  try {
    const trainings = await Training.find({ status: 'open' });
    res.json(trainings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Assign trainer to training
router.patch('/:id/assign', authMiddleware, roleMiddleware(['company', 'vendor']), async (req, res) => {
  try {
    const { trainerId } = req.body;
    const training = await Training.findByIdAndUpdate(
      req.params.id,
      {
        trainerId,
        status: 'assigned',
        updatedAt: Date.now()
      },
      { new: true }
    );
    res.json(training);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update training status
router.patch('/:id/status', authMiddleware, roleMiddleware(['company', 'vendor']), async (req, res) => {
  try {
    const { status } = req.body;
    const training = await Training.findByIdAndUpdate(
      req.params.id,
      {
        status,
        updatedAt: Date.now()
      },
      { new: true }
    );
    res.json(training);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get trainings by company
router.get('/company', authMiddleware, roleMiddleware(['company']), async (req, res) => {
  try {
    const trainings = await Training.find({ companyId: req.user.userId });
    res.json(trainings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get trainings by vendor
router.get('/vendor', authMiddleware, roleMiddleware(['vendor']), async (req, res) => {
  try {
    const trainings = await Training.find({ vendorId: req.user.userId });
    res.json(trainings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get trainings by trainer
router.get('/trainer', authMiddleware, roleMiddleware(['trainer']), async (req, res) => {
  try {
    const trainings = await Training.find({ trainerId: req.user.userId });
    res.json(trainings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;