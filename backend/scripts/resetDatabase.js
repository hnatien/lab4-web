const mongoose = require('mongoose');
const Product = require('../models/Product');
const { seedProducts } = require('../utils/seedData');

mongoose.connect('mongodb://localhost:27017/ecommerce')
  .then(async () => {
    try {
      console.log('🔄 Đang reset database...');
      
      // Clear all products
      await Product.deleteMany({});
      console.log('🗑️ Đã xóa tất cả sản phẩm cũ');
      
      // Seed new products
      await seedProducts();
      
      console.log('✅ Database đã được reset và seed thành công!');
      
    } catch (error) {
      console.error('❌ Lỗi khi reset database:', error);
    } finally {
      mongoose.connection.close();
      console.log('🔌 Đã đóng kết nối database');
    }
  })
  .catch(err => {
    console.error('❌ Lỗi kết nối MongoDB:', err);
  });
