const express = require('express');
const router = express.Router();
const Vendor = require('../models/vendor.model');
const Trainer = require('../models/trainer.model');
const Training = require('../models/training.model');
const { authMiddleware, roleMiddleware } = require('../middleware/auth.middleware');

// Get vendor profile
router.get('/profile', authMiddleware, roleMiddleware(['vendor']), async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user.userId });
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update vendor profile
router.put('/profile', authMiddleware, roleMiddleware(['vendor']), async (req, res) => {
  try {
    const vendor = await Vendor.findOneAndUpdate(
      { userId: req.user.userId },
      req.body,
      { new: true }
    );
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get trainers associated with vendor
router.get('/trainers', authMiddleware, roleMiddleware(['vendor']), async (req, res) => {
  try {
    const trainers = await Trainer.find({ vendorId: req.user.userId });
    res.json(trainers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Associate trainer with vendor
router.post('/trainers/:trainerId', authMiddleware, roleMiddleware(['vendor']), async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndUpdate(
      req.params.trainerId,
      { vendorId: req.user.userId },
      { new: true }
    );
    res.json(trainer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update trainer availability
router.patch('/trainers/:trainerId/availability', authMiddleware, roleMiddleware(['vendor']), async (req, res) => {
  try {
    const { isAvailable } = req.body;
    const trainer = await Trainer.findOneAndUpdate(
      { _id: req.params.trainerId, vendorId: req.user.userId },
      { isAvailable },
      { new: true }
    );
    res.json(trainer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get vendor's trainings
router.get('/trainings', authMiddleware, roleMiddleware(['vendor']), async (req, res) => {
  try {
    const trainings = await Training.find({ vendorId: req.user.userId });
    res.json(trainings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;