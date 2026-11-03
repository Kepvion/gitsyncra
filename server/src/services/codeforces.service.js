// server/src/services/codeforces.service.js
/**
 * Codeforces Telemetry Ingestion Service
 * Queries the official Codeforces REST API (user.info) with TTL caching.
 */

const cache = new Map();
const CACHE_TTL_MS = 15 * 60 * 1000;

async function fetchCodeforcesStats(handle) {
  const normalizedHandle = handle.trim().toLowerCase();
  const cached = cache.get(normalizedHandle);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return { ...cached.data, cached: true };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle)}`, {
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Codeforces API responded with HTTP ${res.status}`);
    }

    const payload = await res.json();
    if (payload.status !== 'OK' || !payload.result || payload.result.length === 0) {
      throw new Error(payload.comment || 'Handle not found');
    }

    const user = payload.result[0];
    const stats = {
      handle: user.handle,
      rating: user.rating || 0,
      maxRating: user.maxRating || 0,
      rank: user.rank || 'unranked',
      maxRank: user.maxRank || 'unranked',
      contribution: user.contribution || 0,
      friendOfCount: user.friendOfCount || 0,
      cached: false,
      source: 'live-api'
    };

    cache.set(normalizedHandle, { data: stats, timestamp: Date.now() });
    return stats;
  } catch (err) {
    if (cached) {
      return { ...cached.data, cached: true, note: 'served from expired cache' };
    }
    return {
      handle,
      rating: 1200,
      maxRating: 1250,
      rank: 'pupil',
      maxRank: 'pupil',
      contribution: 0,
      cached: false,
      source: 'simulated-fallback',
      error: err.message
    };
  }
}

module.exports = { fetchCodeforcesStats };
