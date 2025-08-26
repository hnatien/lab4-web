const Product = require('../models/Product');

const sampleProducts = [
  {
    name: 'iPhone 15 Pro',
    description: 'Smartphone',
    price: 999.99,
    category: 'Electronics',
    stock: 50,
    image: '',
    isActive: true
  },
  {
    name: 'MacBook Air M2',
    description: 'Laptop',
    price: 1199.99,
    category: 'Electronics',
    stock: 30,
    image: '',
    isActive: true
  },
  {
    name: 'Nike Air Max 270',
    description: 'Shoes',
    price: 129.99,
    category: 'Sports',
    stock: 100,
    image: '',
    isActive: true
  },
  {
    name: 'Samsung 4K TV',
    description: 'Television',
    price: 699.99,
    category: 'Electronics',
    stock: 25,
    image: '',
    isActive: true
  },
  {
    name: 'Adidas Ultraboost',
    description: 'Shoes',
    price: 179.99,
    category: 'Sports',
    stock: 75,
    image: '',
    isActive: true
  },
  {
    name: 'Sony Headphones',
    description: 'Audio',
    price: 349.99,
    category: 'Electronics',
    stock: 40,
    image: '',
    isActive: true
  },
  {
    name: 'Yoga Mat',
    description: 'Fitness',
    price: 49.99,
    category: 'Sports',
    stock: 200,
    image: '',
    isActive: true
  },
  {
    name: 'Canon Camera',
    description: 'Photography',
    price: 2499.99,
    category: 'Electronics',
    stock: 15,
    image: '',
    isActive: true
  }
];

const seedProducts = async () => {
  try {
    // Check if products already exist
    const existingCount = await Product.countDocuments();
    
    if (existingCount === 0) {
      // Insert sample products only if database is empty
      await Product.insertMany(sampleProducts);
      console.log(`✅ Đã thêm ${sampleProducts.length} sản phẩm mẫu vào database`);
    } else {
      console.log(`📦 Database đã có ${existingCount} sản phẩm, bỏ qua seed data`);
    }
  } catch (error) {
    console.error('❌ Lỗi khi seed products:', error);
  }
};

module.exports = { seedProducts };
