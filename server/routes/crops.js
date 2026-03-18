const express = require('express');
const router = express.Router();
const pool = require('../db');

// 1️⃣ Static routes first
router.get('/seasons', (req, res) => {
  const seasons = { Sp: 'Spring', Su: 'Summer', Au: 'Autumn', Wi: 'Winter' };
  res.json({ success: true, data: seasons });
});

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

// 2️⃣ Parameterized routes
router.get('/season/:season', async (req, res) => {
  try {
    const season = req.params.season.toUpperCase();
    const [crops] = await pool.query(
      "SELECT * FROM crops WHERE FIND_IN_SET(?, UPPER(seasons)) > 0 ORDER BY crop_name",
      [season]
    );
    res.json({ success: true, season, count: crops.length, data: crops });
  } catch (error) {
    console.error('Error fetching crops by season:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch crops by season', message: error.message });
  }
});

// 3️⃣ Catch-all dynamic route last
router.get('/:id', async (req, res) => {
  try {
    const [crop] = await pool.query('SELECT * FROM crops WHERE crop_id = ?', [req.params.id]);
    if (crop.length === 0) return res.status(404).json({ success: false, error: 'Crop not found' });
    res.json({ success: true, data: crop[0] });
  } catch (error) {
    console.error('Error fetching crop:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch crop', message: error.message });
  }
});

// 4️⃣ All crops
router.get('/', async (req, res) => {
  try {
    const [crops] = await pool.query('SELECT * FROM crops ORDER BY crop_name');
    res.json({ success: true, count: crops.length, data: crops });
  } catch (error) {
    console.error('Error fetching crops:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch crops', message: error.message });
  }
});

module.exports = router;