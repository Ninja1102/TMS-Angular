const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Route imports
const authRoutes = require('./routes/auth.routes');
const companyRoutes = require('./routes/company.routes');
const vendorRoutes = require('./routes/vendor.routes');
const trainerRoutes = require('./routes/trainer.routes');
const trainingRoutes = require('./routes/training.routes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/trainings', trainingRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});