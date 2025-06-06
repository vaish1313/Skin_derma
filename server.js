const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const searchRoutes = require('./routes/search');

// Middlewares
app.use(cors());
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// When user visits "/", serve "search.html"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'search.html'));
});

// API routes
app.use('/api', searchRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

