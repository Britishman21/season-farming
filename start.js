#!/usr/bin/env node

/**
 * Sunlit Valley - ONE-START Launcher (Port 3000)
 * Runs backend API and serves frontend static files from "public" folder.
 * Usage: node start.js
 */

const express = require('express');
const path = require('path');
const cors = require('cors');
const crypto = require('crypto');
require('dotenv').config({ path: path.join(__dirname, 'server', '.env') });
const pool = require('./server/db');

// ===== Express App =====
const app = express();
const PORT = process.env.PORT || 3000;

function parseCookies(cookieHeader) {
  const header = String(cookieHeader || '');
  if (!header) return {};
  return header.split(';').reduce((acc, part) => {
    const idx = part.indexOf('=');
    if (idx <= 0) return acc;
    const key = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {});
}

function appendSetCookie(res, cookieValue) {
  const prev = res.getHeader('Set-Cookie');
  if (!prev) {
    res.setHeader('Set-Cookie', cookieValue);
    return;
  }
  if (Array.isArray(prev)) {
    res.setHeader('Set-Cookie', [...prev, cookieValue]);
    return;
  }
  res.setHeader('Set-Cookie', [prev, cookieValue]);
}

function getOrCreateVisitorId(req, res) {
  const cookies = parseCookies(req.headers.cookie);
  const existing = cookies.sv_uid;
  if (typeof existing === 'string' && /^[a-f0-9\-]{20,64}$/i.test(existing)) {
    return existing;
  }

  const visitorId = crypto.randomUUID();
  const secure = req.secure || String(req.headers['x-forwarded-proto'] || '').toLowerCase() === 'https';
  const cookie = `sv_uid=${encodeURIComponent(visitorId)}; Path=/; Max-Age=31536000; SameSite=Lax${secure ? '; Secure' : ''}`;
  appendSetCookie(res, cookie);
  return visitorId;
}

async function ensureVisitSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS visit_events (
      event_id BIGINT PRIMARY KEY AUTO_INCREMENT,
      visitor_id VARCHAR(64) NOT NULL,
      visit_date DATE NOT NULL,
      hits INT NOT NULL DEFAULT 1,
      first_seen_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_seen_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY uniq_visitor_day (visitor_id, visit_date),
      INDEX idx_visit_date (visit_date)
    )
  `);
}

async function registerVisit(req, res) {
  const visitorId = getOrCreateVisitorId(req, res);
  await pool.query(
    `
      INSERT INTO visit_events (visitor_id, visit_date, hits)
      VALUES (?, CURDATE(), 1)
      ON DUPLICATE KEY UPDATE
        hits = hits + 1,
        last_seen_at = CURRENT_TIMESTAMP
    `,
    [visitorId]
  );
}

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json());

// Count page visits for non-API HTML page requests
app.use((req, res, next) => {
  if (req.method !== 'GET') return next();
  if (req.path.startsWith('/api')) return next();
  const accept = String(req.headers.accept || '').toLowerCase();
  if (!accept.includes('text/html')) return next();
  const cookies = parseCookies(req.headers.cookie);
  if (cookies.sv_optout === '1') return next();
  if (cookies.sv_track !== '1') return next();
  registerVisit(req, res)
    .catch(err => {
      console.error('Visit tracking failed:', err.message);
    })
    .finally(() => next());
});

// Serve frontend static files
const PUBLIC_DIR = path.join(__dirname, 'public');
app.use(express.static(PUBLIC_DIR));

// ===== API Routes =====
app.use('/api/crops', require('./server/routes/crops'));
app.use('/api/processors', require('./server/routes/processors'));
app.use('/api/data', require('./server/routes/data'));

// Visits stats endpoint for frontend banner
app.get('/api/visits', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM visit_events WHERE visit_date = CURDATE()) AS daily_unique,
        (SELECT COUNT(DISTINCT visitor_id) FROM visit_events) AS all_time_unique
    `);

    const stats = rows[0] || {};
    res.json({
      success: true,
      data: {
        dailyUnique: Number(stats.daily_unique) || 0,
        allTimeUnique: Number(stats.all_time_unique) || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch visit stats', message: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'Server is running', timestamp: new Date().toISOString() });
});

// Fallback: serve index.html for frontend routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ 
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
ensureVisitSchema()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Sunlit Valley running on http://localhost:${PORT}`);
      console.log('🌐 Frontend + API live on the same port');
    });
  })
  .catch(error => {
    console.error('Failed to initialize visit tracking schema:', error.message);
    process.exit(1);
  });