// client/src/App.jsx
// -------------------------------------------------------------
// GitSyncra - Unified Competitive Programming Portfolio Engine
// -------------------------------------------------------------

import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [apiStatus, setApiStatus] = useState('Connecting to GitSyncra API...');
  const [isBackendHealthy, setIsBackendHealthy] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/health')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'healthy') {
          setApiStatus(`Live • Express Engine v1.0 (Uptime: ${Math.round(data.uptime)}s)`);
          setIsBackendHealthy(true);
        } else {
          setApiStatus('API reachable, unexpected response');
        }
      })
      .catch(() => {
        setApiStatus('Backend offline (Run: npm run dev in /server)');
        setIsBackendHealthy(false);
      });
  }, []);

  return (
    <div className="container">
      <header className="header">
        <span className="badge">🔥 GitSyncra v1.0 • Phase 0 Initialized</span>
        <h1>GitSyncra</h1>
        <p className="subtitle">
          Turn your competitive programming grind into verified GitHub proof.
          One-click sync across Codeforces, LeetCode, CodeChef, and GeeksforGeeks.
        </p>
      </header>

      {/* Backend Health Check Card */}
      <div className={`status-card ${isBackendHealthy ? 'online' : 'offline'}`}>
        <div className="status-indicator"></div>
        <div>
          <strong>System Status: </strong>
          <span>{apiStatus}</span>
        </div>
      </div>

      {/* Multi-Platform Support Preview */}
      <section className="platforms-section">
        <h3>Multi-Platform Adapter Pipeline</h3>
        <div className="platform-grid">
          <div className="platform-tag cf">Codeforces</div>
          <div className="platform-tag lc">LeetCode</div>
          <div className="platform-tag cc">CodeChef</div>
          <div className="platform-tag gfg">GeeksforGeeks</div>
          <div className="platform-tag hr">HackerRank</div>
        </div>
      </section>

      {/* Architecture Highlights */}
      <div className="info-box">
        <h4>⚡ Core Engineering Stack:</h4>
        <ul>
          <li><strong>Architecture:</strong> Node.js / Express decoupled engine (<code>app.js</code> / <code>server.js</code>)</li>
          <li><strong>Database:</strong> PostgreSQL with atomic deduplication (<code>ON CONFLICT DO NOTHING</code>)</li>
          <li><strong>Queue & Worker:</strong> Redis + BullMQ background queue with exponential backoff</li>
          <li><strong>Security:</strong> GitHub OAuth 2.0 + AES-256-GCM token encryption</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
