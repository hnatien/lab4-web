const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    console.log('Connected to MongoDB successfully');
    
    // Seed sample data if database is empty
    const { seedProducts } = require('./utils/seedData');
    await seedProducts();
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});

// Routes
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Socket.io authentication middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error'));
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new Error('Authentication error'));
    }
    socket.userId = decoded.userId;
    socket.username = decoded.username;
    next();
  });
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.username}`);
  
  // Join a room
  socket.on('join_room', (room) => {
    socket.join(room);
    socket.room = room;
    socket.to(room).emit('user_joined', { username: socket.username });
  });
  
  // Leave a room
  socket.on('leave_room', (room) => {
    socket.leave(room);
    socket.to(room).emit('user_left', { username: socket.username });
  });
  
  // Send message
  socket.on('send_message', async (data) => {
    const message = {
      content: data.content,
      sender: socket.userId,
      room: data.room,
      timestamp: new Date()
    };
    
    // Save to database
    const Message = require('./models/Message');
    const newMessage = new Message(message);
    await newMessage.save();
    
    // Emit to room
    io.to(data.room).emit('new_message', {
      ...message,
      sender: { _id: socket.userId, username: socket.username }
    });
  });
  
  // Typing indicator
  socket.on('typing', (data) => {
    socket.to(data.room).emit('user_typing', { username: socket.username });
  });
  
  socket.on('stop_typing', (data) => {
    socket.to(data.room).emit('user_stop_typing', { username: socket.username });
  });
  
  // Disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.username}`);
    if (socket.room) {
      socket.to(socket.room).emit('user_left', { username: socket.username });
    }
  });
});

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Task Manager API is running!' });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
