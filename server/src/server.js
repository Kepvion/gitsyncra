// server/src/server.js
// -------------------------------------------------------------
// GitSyncra - HTTP Server Entrypoint
// -------------------------------------------------------------

require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 [GitSyncra] API server running on port ${PORT}`);
  console.log(`📍 [GitSyncra] Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 [GitSyncra] Health check: http://localhost:${PORT}/health`);
});

process.on('SIGTERM', () => {
  console.log('🛑 [GitSyncra] SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('💤 [GitSyncra] Server terminated.');
  });
});
