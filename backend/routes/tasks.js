const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { authenticateToken } = require('../middleware/auth');

// GET /api/tasks - Retrieve all tasks for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching tasks',
            error: error.message
        });
    }
});

// POST /api/tasks - Create a new task
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { title, description, completed } = req.body;

        // Validation
        if (!title || title.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Title is required'
            });
        }

        const task = new Task({
            title: title.trim(),
            description: description ? description.trim() : '',
            completed: completed || false,
            userId: req.user._id
        });

        const savedTask = await task.save();
        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: savedTask
        });
    } catch (error) {
        console.error('Error creating task:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                error: error.message
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error creating task',
            error: error.message
        });
    }
});

// GET /api/tasks/:id - Retrieve a specific task
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
        
        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        console.error('Error fetching task:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid task ID format'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error fetching task',
            error: error.message
        });
    }
});

// PUT /api/tasks/:id - Update a task
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const updateData = {};

        // Only update fields that are provided
        if (title !== undefined) {
            if (!title || title.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: 'Title cannot be empty'
                });
            }
            updateData.title = title.trim();
        }

        if (description !== undefined) {
            updateData.description = description.trim();
        }

        if (completed !== undefined) {
            updateData.completed = Boolean(completed);
        }

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            updateData,
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: task
        });
    } catch (error) {
        console.error('Error updating task:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid task ID format'
            });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                error: error.message
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error updating task',
            error: error.message
        });
    }
});

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
            data: task
        });
    } catch (error) {
        console.error('Error deleting task:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid task ID format'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error deleting task',
            error: error.message
        });
    }
});

module.exports = router;
