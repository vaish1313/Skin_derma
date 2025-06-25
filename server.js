
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const http = require('http'); // For socket.io
const { Server } = require('socket.io');
const db = require('./db'); 
const fs = require('fs');// Your DB file in root

const searchRoutes = require('./routes/search');
const authRoutes = require('./routes/auth');
const doctorRoutes = require('./routes/doctors');
const communityRoutes = require('./routes/community');

const uploadPath = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const app = express();
const server = http.createServer(app); // ⬅️ Replace app.listen with this
const io = new Server(server);         // ⬅️ Attach socket.io

const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', searchRoutes);
app.use('/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/community', communityRoutes);

// Frontend pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'search.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, 'public', 'signup.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'public', 'dashboard.html')));
app.get('/doctors', (req, res) => res.sendFile(path.join(__dirname, 'public', 'doctors.html')));
app.get('/community', (req, res) => res.sendFile(path.join(__dirname, 'public', 'community.html')));

// Image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

app.post('/upload-image', upload.single('image'), (req, res) => {
  try {
    const { user_id, message } = req.body;

    const image_url = req.file ? '/uploads/' + req.file.filename : null;

    // Insert message into DB here if needed...

    res.json({ image_url });
  } catch (err) {
    console.error('❌ Upload error:', err);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

// ✅ Socket.io integration
io.on('connection', (socket) => {
  console.log('🟢 A user connected to chat');

  socket.on('chatMessage', (data) => {
    const { user_id, message, image_url } = data;

    const insertQuery = `
      INSERT INTO community_chat (user_id, message, image_url) VALUES (?, ?, ?)
    `;

    db.query(insertQuery, [user_id, message, image_url || null], (err, result) => {
      if (err) {
        console.error("DB error while inserting message:", err);
        return;
      }

      db.query(`
        SELECT c.*, u.username, u.role 
        FROM community_chat c
        JOIN users u ON c.user_id = u.id
        WHERE c.message_id = ?
      `, [result.insertId], (err2, rows) => {
        if (!err2 && rows.length > 0) {
          io.emit('newMessage', rows[0]); // Broadcast message
        }
      });
    });
  });

  socket.on('disconnect', () => {
    console.log('🔴 A user disconnected from chat');
  });
});

app.get('/messages', (req, res) => {
  db.query(`
    SELECT c.message_id, c.message, c.image_url, c.timestamp, u.username
    FROM community_chat c
    JOIN users u ON c.user_id = u.id
    ORDER BY c.timestamp DESC LIMIT 100
  `, (err, result) => {
    if (err) {
      console.error("❌ DB error in /messages:", err);
      return res.status(500).json({ error: 'DB query failed' });
    }
    res.json(result.reverse());
  });
});



// Start server with socket.io support
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});


