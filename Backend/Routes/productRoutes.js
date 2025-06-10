const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } = require("../controllers/productController");

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isImage = file.mimetype.startsWith('image/');
    const uploadPath = isImage ? path.join(__dirname, '../uploads/images') : path.join(__dirname, '../uploads/files');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf' || file.mimetype === 'text/plain') {
      cb(null, true);
    } else {
      cb(new Error('Only image, PDF and text files are allowed!'), false);
    }
  }
});

// Product routes
router.get("/", getAllProducts);
router.post("/", upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'productFile', maxCount: 1 }
]), createProduct);
router.get('/:id', getProductById);
router.put('/:id', upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'productFile', maxCount: 1 }
]), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;