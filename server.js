require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// --- Middleware ---
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// --- API Routes ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/favourites', require('./routes/favourites'));
app.use('/api/properties', require('./routes/properties'));

// --- Health check ---
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// --- Serve static frontend ---
app.use(express.static(path.join(__dirname, './frontend/public')));

// SPA fallback: any non-API route sends index.html
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/public/index.html'));
});

// --- Global error handler ---
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error.',
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n🏠 Buyer Portal API running on http://localhost:${PORT}`);
  console.log(`   Frontend:  http://localhost:${PORT}`);
  console.log(`   API:       http://localhost:${PORT}/api/health\n`);
});
