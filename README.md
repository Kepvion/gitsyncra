# ⚡ GitSyncra

> **Turn your competitive programming grind into verified GitHub proof.**  
> Automatically aggregate your accepted problem solutions across Codeforces, LeetCode, CodeChef, and GeeksforGeeks into a sleek, continuously updated GitHub portfolio and dynamic SVG badge.

---

## 🌟 Why GitSyncra?

Competitive programmers solve hundreds of algorithmic challenges across disparate platforms, but their GitHub profiles stay static and empty. **GitSyncra** closes that gap with live telemetry ingestion and dynamic vector badges.

- 🔒 **Zero Credentials Stored:** Connect seamlessly via GitHub OAuth 2.0 with AES-256-GCM token encryption.
- ⚡ **Asynchronous Sync Engine:** Powered by Redis & BullMQ to handle heavy workloads with automatic retries and exponential backoff.
- 🛡️ **Guaranteed Idempotency:** PostgreSQL atomic unique constraints (`ON CONFLICT DO NOTHING`) ensure zero duplicate entries.
- 🧩 **Extensible Adapter Architecture:** Clean adapter interfaces for LeetCode GraphQL and Codeforces REST APIs.

---

## 🏗️ Architecture

```
gitsyncra/
├── server/                    # Node.js + Express API
│   ├── src/
│   │   ├── services/          # Upstream telemetry services (LeetCode GraphQL & Codeforces API)
│   │   │   ├── leetcode.service.js
│   │   │   ├── codeforces.service.js
│   │   │   └── badge.service.js   # Dynamic SVG vector card renderer
│   │   ├── routes/            # REST API endpoints
│   │   │   └── telemetry.routes.js
│   │   ├── app.js             # Express configuration & middleware
│   │   └── server.js          # HTTP listener
└── client/                    # React 19 + Vite dashboard
```

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Server health check and uptime |
| `GET` | `/api/telemetry/leetcode/:username` | Real-time LeetCode problem breakdown & global rank |
| `GET` | `/api/telemetry/codeforces/:handle` | Live Codeforces rating, contest rank, and max rating |
| `GET` | `/api/badge/:username?cf=:handle` | **Direct Dynamic SVG Badge** rendered for GitHub READMEs |

### 🖼️ Example Badge Embed (Markdown)
```markdown
![My CP Stats](https://api.gitsyncra.dev/api/badge/Kepvion?cf=Kepvion)
```

---

## 🚀 Quickstart (Local Development)

### 1. Backend Server
```bash
cd server
npm install
npm run dev
# API running at http://localhost:5000
# Health check: http://localhost:5000/health
# Sample Badge: http://localhost:5000/api/badge/Kepvion
```

### 2. Frontend Client
```bash
cd client
npm install
npm run dev
# Dashboard running at http://localhost:5173
```

---

## 📄 License
MIT License. Built for developer profile automation.
