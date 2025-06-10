const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Store files in different directories based on type
    const isImage = file.mimetype.startsWith('image/');
    const uploadPath = isImage ? 'uploads/images' : 'uploads/files';
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Add timestamp to filename to make it unique
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Accept images and text files
    if (file.mimetype.startsWith('image/') || file.mimetype === 'text/plain') {
      cb(null, true);
    } else {
      cb(new Error('Only image and text files are allowed!'), false);
    }
  }
});

// Upload endpoint
router.post('/', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Return the file URL
    const fileUrl = `http://localhost:3000/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 