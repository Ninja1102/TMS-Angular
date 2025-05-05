const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  skills: [{
    type: String,
    required: true
  }],
  experience: {
    type: Number,
    required: true
  },
  preferredLocation: {
    type: String,
    enum: ['remote', 'onsite', 'hybrid'],
    required: true
  },
  dailyRate: {
    type: Number,
    required: true
  },
  resumeUrl: String,
  isAvailable: {
    type: Boolean,
    default: true
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor'
  }
});

module.exports = mongoose.model('Trainer', trainerSchema);