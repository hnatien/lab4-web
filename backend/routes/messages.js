const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { authenticateToken } = require('../middleware/auth');

// Get messages for a room
router.get('/room/:room', authenticateToken, async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.room })
      .populate('sender', 'username')
      .sort({ timestamp: 1 })
      .limit(50);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all rooms
router.get('/rooms', authenticateToken, async (req, res) => {
  try {
    const rooms = await Message.distinct('room');
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a message
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { content, room } = req.body;
    const message = new Message({
      content,
      sender: req.user.id,
      room: room || 'general'
    });
    await message.save();
    
    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'username');
    
    res.json(populatedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
