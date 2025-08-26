const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { authenticateToken } = require('../middleware/auth');

// Get user's cart
router.get('/', authenticateToken, async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
        
        if (!cart) {
            cart = new Cart({ user: req.user.id, items: [] });
            await cart.save();
        }
        
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Add item to cart
router.post('/add', authenticateToken, async (req, res) => {
    try {
        const { productId, quantity = 1, variant } = req.body;
        
        // Validate product exists and has stock
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Insufficient stock' });
        }
        
        let cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            cart = new Cart({ user: req.user.id, items: [] });
        }
        
        // Check if item already exists in cart
        const existingItemIndex = cart.items.findIndex(item => 
            item.product.toString() === productId &&
            JSON.stringify(item.variant) === JSON.stringify(variant || {})
        );
        
        if (existingItemIndex > -1) {
            // Update quantity
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // Add new item
            cart.items.push({
                product: productId,
                quantity,
                variant: variant || {}
            });
        }
        
        await cart.save();
        await cart.populate('items.product');
        
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update cart item quantity
router.put('/update/:itemId', authenticateToken, async (req, res) => {
    try {
        const { quantity } = req.body;
        
        if (quantity < 1) {
            return res.status(400).json({ message: 'Quantity must be at least 1' });
        }
        
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        const item = cart.items.id(req.params.itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
        
        // Check stock availability
        const product = await Product.findById(item.product);
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Insufficient stock' });
        }
        
        item.quantity = quantity;
        await cart.save();
        await cart.populate('items.product');
        
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Remove item from cart
router.delete('/remove/:itemId', authenticateToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
        await cart.save();
        await cart.populate('items.product');
        
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Clear cart
router.delete('/clear', authenticateToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        cart.items = [];
        await cart.save();
        
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
