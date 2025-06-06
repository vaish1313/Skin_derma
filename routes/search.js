const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

// MySQL search route
router.get('/search', (req, res) => {
  const query = req.query.query;
  const sql = `SELECT * FROM diseases WHERE name LIKE ? OR symptoms LIKE ?`;

  db.query(sql, [`%${query}%`, `%${query}%`], (err, results) => {
    if (err) {
      console.error('Database query failed:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
});

// Multer config for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Image scan route
router.post('/scan', upload.single('image'), async (req, res) => {
  const imagePath = req.file.path;

  try {
    const formData = new FormData();
    formData.append('image', fs.createReadStream(imagePath));

    const response = await axios.post('http://127.0.0.1:5000/scan', formData, {
      headers: formData.getHeaders()
    });

    res.json({ result: response.data.prediction });
  } catch (err) {
    console.error('Error calling ML API:', err);
    res.status(500).json({ error: 'Failed to process image' });
  }
});

module.exports = router;
