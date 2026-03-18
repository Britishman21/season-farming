const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET site configuration and stats
router.get('/config', async (req, res) => {
  try {
    const [config] = await pool.query('SELECT * FROM site_config LIMIT 1');
    const [counts] = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM crops) AS total_crops,
        (SELECT COUNT(*) FROM processors) AS total_recipes,
        (SELECT COUNT(DISTINCT processor_type) FROM processors) AS processor_types
    `);

    res.json({
      success: true,
      data: {
        config: config[0] || {},
        stats: counts[0]
      }
    });
  } catch (error) {
    console.error('Error fetching config:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch configuration', message: error.message });
  }
});

// GET seasons reference
router.get('/seasons', (req, res) => {
  const seasons = { Sp: 'Spring', Su: 'Summer', Au: 'Autumn', Wi: 'Winter' };
  res.json({ success: true, data: seasons });
});

// GET full data export (crops + processors + config)
router.get('/export', async (req, res) => {
  try {
    const [crops] = await pool.query('SELECT * FROM crops ORDER BY crop_name');
    const [processors] = await pool.query('SELECT * FROM processors ORDER BY processor_type, crop_name');
    const [config] = await pool.query('SELECT * FROM site_config LIMIT 1');

    res.json({
      success: true,
      data: {
        config: config[0] || {},
        crops,
        processors
      }
    });
  } catch (error) {
    console.error('Error exporting data:', error);
    res.status(500).json({ success: false, error: 'Failed to export data', message: error.message });
  }
});

module.exports = router;