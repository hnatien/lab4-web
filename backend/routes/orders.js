const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { authenticateToken } = require('../middleware/auth');

// Get user's orders
router.get('/', authenticateToken, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate('items.product')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get single order
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('items.product')
            .populate('user', 'username email');
            
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        // Check if user owns this order or is admin
        if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Create order from cart
router.post('/create', authenticateToken, async (req, res) => {
    try {
        const { shippingAddress, paymentMethod } = req.body;
        
        // Get user's cart
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }
        
        // Validate stock and calculate total
        let total = 0;
        const orderItems = [];
        
        for (const item of cart.items) {
            const product = item.product;
            
            if (product.stock < item.quantity) {
                return res.status(400).json({ 
                    message: `Insufficient stock for ${product.name}` 
                });
            }
            
            // Update product stock
            await Product.findByIdAndUpdate(product._id, {
                $inc: { stock: -item.quantity }
            });
            
            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price,
                variant: item.variant
            });
            
            total += product.price * item.quantity;
        }
        
        // Create order
        const order = new Order({
            user: req.user.id,
            items: orderItems,
            total,
            shippingAddress,
            paymentMethod
        });
        
        await order.save();
        
        // Clear cart
        cart.items = [];
        await cart.save();
        
        await order.populate('items.product');
        
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update order status (Admin only)
router.put('/:id/status', authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }
        
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate('items.product');
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get all orders (Admin only)
router.get('/admin/all', authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }
        
        const orders = await Order.find()
            .populate('user', 'username email')
            .populate('items.product')
            .sort({ createdAt: -1 });
            
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
