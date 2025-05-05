const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Company = require('../models/company.model');
const Vendor = require('../models/vendor.model');
const Trainer = require('../models/trainer.model');

// Register Company
router.post('/register/company', async (req, res) => {
  try {
    const { email, password, companyName, phone, address, website, industries } = req.body;

    const user = new User({
      email,
      password,
      role: 'company'
    });

    const savedUser = await user.save();

    const company = new Company({
      userId: savedUser._id,
      companyName,
      phone,
      address,
      website,
      industries
    });

    await company.save();

    res.status(201).json({ message: 'Company registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register Vendor
router.post('/register/vendor', async (req, res) => {
  try {
    const { email, password, vendorName, phone, address, licenseNumber, specializations } = req.body;

    const user = new User({
      email,
      password,
      role: 'vendor'
    });

    const savedUser = await user.save();

    const vendor = new Vendor({
      userId: savedUser._id,
      vendorName,
      phone,
      address,
      licenseNumber,
      specializations
    });

    await vendor.save();

    res.status(201).json({ message: 'Vendor registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register Trainer
router.post('/register/trainer', async (req, res) => {
  try {
    const { email, password, fullName, phone, address, skills, experience, preferredLocation, dailyRate, resumeUrl } = req.body;

    const user = new User({
      email,
      password,
      role: 'trainer'
    });

    const savedUser = await user.save();

    const trainer = new Trainer({
      userId: savedUser._id,
      fullName,
      phone,
      address,
      skills,
      experience,
      preferredLocation,
      dailyRate,
      resumeUrl,
      isAvailable: true
    });

    await trainer.save();

    res.status(201).json({ message: 'Trainer registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    let profile;
    switch (user.role) {
      case 'company':
        profile = await Company.findOne({ userId: user._id });
        break;
      case 'vendor':
        profile = await Vendor.findOne({ userId: user._id });
        break;
      case 'trainer':
        profile = await Trainer.findOne({ userId: user._id });
        break;
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        profile
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;