// server/src/app.js
const express = require('express');
const cors = require('cors');
const telemetryRoutes = require('./routes/telemetry.routes');

const app = express();

// Standard middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
}));

app.use(express.json());

// API routes
app.use('/api', telemetryRoutes);

// Health check & root route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'GitSyncra API is active and healthy',
    timestamp: new Date().toISOString(),
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
  });
});

module.exports = app;
