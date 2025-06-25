
const express = require('express');
const router = express.Router();
const db = require("../db");
const multer = require('multer');
const path = require('path');

// Storage setup for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Get all messages
router.get('/', (req, res) => {
  const q = `
    SELECT c.message_id, c.message, c.image_url, c.timestamp, u.username
    FROM community_chat c
    JOIN users u ON c.user_id = u.id
    ORDER BY c.timestamp DESC LIMIT 100
  `;
  db.query(q, (err, results) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    res.json(results);
  });
});

// Post new text or image message
router.post('/', upload.single('image'), (req, res) => {
  const { user_id, message } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  const q = `INSERT INTO community_chat (user_id, message, image_url) VALUES (?, ?, ?)`;
  db.query(q, [user_id, message, image_url], (err) => {
    if (err) return res.status(500).json({ error: 'Insert failed' });
    res.json({ success: true });
  });
});

module.exports = router;


