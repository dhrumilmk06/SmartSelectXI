const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../.env' }); // Load .env if present

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth.routes');
const lineupRoutes = require('./routes/lineup.routes');

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/lineup', lineupRoutes);

// Base Route
app.get('/', (req, res) => {
  res.send('SelectXI AI Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
