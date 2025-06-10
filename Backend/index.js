const express = require('express');
const cors = require('cors');
const compression = require('compression');
const sequelize = require('./config/db');
const Routes = require('./Routes/productRoutes');
const userRoutes = require('./Routes/userRoutes');
const cartRoutes = require('./Routes/cartRoutes');
const reviewRoutes = require('./Routes/reviewRoutes');
const uploadRoutes = require('./Routes/uploadRoutes');
const paymentRoutes = require('./Routes/paymentRoutes');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(compression());
app.use(express.json());

// Create upload directories if they don't exist
const uploadsDir = path.join(__dirname, 'uploads');
const imagesDir = path.join(uploadsDir, 'images');
const filesDir = path.join(uploadsDir, 'files');

[uploadsDir, imagesDir, filesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Serve static files from uploads directory
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')));
app.use('/uploads/files', express.static(path.join(__dirname, 'uploads/files')));

// Routes
app.use('/api/products', Routes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/payment', paymentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});