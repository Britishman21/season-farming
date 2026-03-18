const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET available processor types
router.get('/types', async (req, res) => {
  try {
    const [types] = await pool.query(
      'SELECT DISTINCT processor_type FROM processors ORDER BY processor_type'
    );
    res.json({ success: true, count: types.length, data: types.map(t => t.processor_type) });
  } catch (error) {
    console.error('Error fetching processor types:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch processor types', message: error.message });
  }
});

// GET processor recipes by type
router.get('/type/:type', async (req, res) => {
  try {
    const type = String(req.params.type || '').toLowerCase();
    const [recipes] = await pool.query(
      'SELECT * FROM processors WHERE LOWER(processor_type) = ? ORDER BY profit_per_day DESC, crop_name',
      [type]
    );
    res.json({ success: true, type, count: recipes.length, data: recipes });
  } catch (error) {
    console.error('Error fetching processor recipes by type:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch processor recipes', message: error.message });
  }
});

// GET one recipe by id
router.get('/:id', async (req, res) => {
  try {
    const [recipe] = await pool.query('SELECT * FROM processors WHERE processor_id = ?', [req.params.id]);
    if (recipe.length === 0) return res.status(404).json({ success: false, error: 'Recipe not found' });
    res.json({ success: true, data: recipe[0] });
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch recipe', message: error.message });
  }
});

// GET all processor recipes
router.get('/', async (req, res) => {
  try {
    const [recipes] = await pool.query('SELECT * FROM processors ORDER BY processor_type, profit_per_day DESC, crop_name');
    res.json({ success: true, count: recipes.length, data: recipes });
  } catch (error) {
    console.error('Error fetching processor recipes:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch processor recipes', message: error.message });
  }
});

module.exports = router;