const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
require('dotenv').config();

// Import routes
const Middleware = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const statusRoutes = require('./routes/statusRoutes');
const provinceRoutes = require('./routes/provinceRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk keamanan dan performa
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true })); 

// Konfigurasi session dengan opsi tambahan
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',  
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'strict'
  }
}));

// All Routes
app.use('/auth', authRoutes);
app.use('/status', Middleware, statusRoutes);
app.use('/province', Middleware, provinceRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${new Date().toISOString()}: ${err.stack}`);
  res.status(500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal Server Error' 
      : err.message
  });
});

// Tangani route tidak ditemukan
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Route tidak ditemukan'
  });
});

// Jalankan server
const server = app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});

// Tangani shutdown server dengan graceful
process.on('SIGTERM', () => {
  console.log('SIGTERM signal diterima. Menutup server...');
  server.close(() => {
    console.log('Proses server ditutup');
  });
});

module.exports = app;