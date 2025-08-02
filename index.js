// index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const logger = require('./middleware/logger');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(logger); // <- Logging middleware

// Routes
app.use('/api/users', userRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
  });
