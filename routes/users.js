// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const userSchema = require('../validators/userValidator');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST new user
router.post('/', async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: `Validation error: ${error.details.map(d => d.message).join(', ')}`
    });
  }

  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: savedUser
    });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// BONUS: PUT update user
router.put('/:id', async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: `Validation error: ${error.details.map(d => d.message).join(', ')}`
    });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// BONUS: DELETE user
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
