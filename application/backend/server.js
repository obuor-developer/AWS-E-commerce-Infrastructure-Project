const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API routes
app.get('/api/products', (req, res) => {
  res.json({
    products: [
      { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
      { id: 2, name: 'Smartphone', price: 699.99, category: 'Electronics' },
      { id: 3, name: 'Headphones', price: 199.99, category: 'Audio' }
    ]
  });
});

app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = {
    id: productId,
    name: 'Sample Product',
    price: 99.99,
    description: 'This is a sample product',
    category: 'Sample Category'
  };
  res.json(product);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
