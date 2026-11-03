// server/src/routes/telemetry.routes.js
const express = require('express');
const { fetchLeetCodeStats } = require('../services/leetcode.service');
const { fetchCodeforcesStats } = require('../services/codeforces.service');
const { generateStatsBadgeSvg } = require('../services/badge.service');

const router = express.Router();

// GET /api/telemetry/leetcode/:username
router.get('/leetcode/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const stats = await fetchLeetCodeStats(username);
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/telemetry/codeforces/:handle
router.get('/codeforces/:handle', async (req, res) => {
  try {
    const { handle } = req.params;
    const stats = await fetchCodeforcesStats(handle);
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/badge/stats/:username
router.get('/badge/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const cfHandle = req.query.cf || username;

    const [lcStats, cfStats] = await Promise.all([
      fetchLeetCodeStats(username),
      fetchCodeforcesStats(cfHandle)
    ]);

    const svg = generateStatsBadgeSvg({
      username,
      leetcode: lcStats,
      codeforces: cfStats
    });

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=1800'); // Cache for 30 minutes
    res.status(200).send(svg);
  } catch (error) {
    res.status(500).send(`<svg><text>Error generating badge: ${error.message}</text></svg>`);
  }
});

module.exports = router;
