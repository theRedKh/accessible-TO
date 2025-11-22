require('dotenv').config();
const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/users');
const searchRoutes = require('./routes/search');
const geminiRoutes = require('./routes/gemini');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/gemini', geminiRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'Accessible TO Backend Running!',
    timestamp: new Date().toISOString()
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
});