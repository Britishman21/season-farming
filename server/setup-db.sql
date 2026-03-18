-- ============================================
-- Sunlit Valley - Complete MySQL Setup Script (CORRECTED)
-- ============================================
-- Updated to match official wiki: https://sunlitvalley.miraheze.org/wiki/Crops
-- Run this script to set up database with ALL 48 crops
-- Usage: mysql -u root -p < setup-db-corrected.sql

-- ============================================
-- Step 1: Drop existing tables (clean slate)
-- ============================================
DROP TABLE IF EXISTS processors;
DROP TABLE IF EXISTS visit_events;
DROP TABLE IF EXISTS crops;
DROP TABLE IF EXISTS site_config;

-- ============================================
-- Step 2: Create Database
-- ============================================
CREATE DATABASE IF NOT EXISTS sunlit_valley;
USE sunlit_valley;

-- ============================================
-- Step 3: Create Tables
-- ============================================

-- Site Configuration Table
CREATE TABLE IF NOT EXISTS site_config (
  config_id INT PRIMARY KEY AUTO_INCREMENT,
  site_version VARCHAR(10) DEFAULT '1.1',
  modpack_version VARCHAR(10) DEFAULT '4.0',
  modpack_url VARCHAR(255),
  data_last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP On UPDATE CURRENT_TIMESTAMP,
  data_source VARCHAR(255),
  github_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP On UPDATE CURRENT_TIMESTAMP
);

-- Crops Table
CREATE TABLE IF NOT EXISTS crops (
  crop_id INT PRIMARY KEY AUTO_INCREMENT,
  crop_name VARCHAR(100) NOT NULL UNIQUE,
  seasons VARCHAR(50) NOT NULL,
  base_value INT NOT NULL,
  grow_time INT NOT NULL,
  avg_yield DECIMAL(3, 1) NOT NULL,
  seed_cost INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP On UPDATE CURRENT_TIMESTAMP,
  INDEX idx_crop_name (crop_name),
  INDEX idx_seasons (seasons)
);

-- Processors Table (for pickling, preserving, dehydrating)
CREATE TABLE IF NOT EXISTS processors (
  processor_id INT PRIMARY KEY AUTO_INCREMENT,
  processor_type VARCHAR(50) NOT NULL,
  processor_name VARCHAR(100) NOT NULL,
  crop_name VARCHAR(100) NOT NULL,
  crop_base_value INT NOT NULL,
  processing_days DECIMAL(2, 1) NOT NULL,
  output_value INT NOT NULL,
  profit INT NOT NULL,
  profit_per_day DECIMAL(8, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP On UPDATE CURRENT_TIMESTAMP,
  INDEX idx_processor_type (processor_type),
  INDEX idx_crop_name (crop_name),
  FOREIGN KEY (crop_name) REFERENCES crops(crop_name)
);

-- Visit Events Table (unique visitor/day tracking)
CREATE TABLE IF NOT EXISTS visit_events (
  event_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  visitor_id VARCHAR(64) NOT NULL,
  visit_date DATE NOT NULL,
  hits INT NOT NULL DEFAULT 1,
  first_seen_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_seen_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP On UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_visitor_day (visitor_id, visit_date),
  INDEX idx_visit_date (visit_date)
);

-- ============================================
-- Step 4: Insert Configuration Data
-- ============================================
INSERT INTO site_config 
(site_version, modpack_version, modpack_url, data_source, github_url) 
VALUES 
('1.1', '4.0', 'https://www.curseforge.com/minecraft/modpacks/society-sunlit-valley', 
'Official Wiki: https://sunlitvalley.miraheze.org/wiki/Crops (Updated Jan 31, 2026)', 
'https://github.com/Chakyl/society-sunlit-valley')
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;

-- ============================================
-- Step 5: Insert Crops Data (48 crops - repo-aligned)
-- ============================================
INSERT INTO crops (crop_name, seasons, base_value, grow_time, avg_yield, seed_cost) VALUES
('Aloe Vera', 'Su', 16, 8, 1.5, 999),
('Ancient Fruit', 'Sp,Su,Au', 128, 10, 1.0, 999),
('Barley', 'Au,Wi', 11, 4, 2.0, 2),
('Beetroot', 'Au', 24, 3, 1.0, 4),
('Bell Pepper', 'Su', 32, 7, 2.0, 64),
('Blueberry', 'Su', 24, 7, 3.5, 4),
('Broccoli', 'Au', 54, 5, 1.0, 999),
('Cabbage', 'Au,Wi', 70, 7, 1.0, 64),
('Carrot', 'Sp,Au', 23, 7, 1.5, 2),
('Cauliflower', 'Sp', 48, 7, 2.0, 6),
('Coffee Beans', 'Sp', 8, 3, 1.5, 999),
('Corn', 'Su,Au', 28, 4, 1.0, 4),
('Cotton', 'Su', 24, 3, 1.0, 999),
('Cucumber', 'Sp', 72, 7, 2.0, 64),
('Eggplant', 'Au', 42, 6, 1.0, 8),
('Flax', 'Sp', 68, 7, 1.0, 48),
('Foul Berries', 'Au', 4, 4, 2.0, 999),
('Garlic', 'Sp', 27, 5, 2.0, 32),
('Gearo Berries', 'Sp', 24, 4, 2.0, 999),
('Ghost Pepper', 'Su', 36, 7, 2.0, 64),
('Ginger', 'Wi', 24, 7, 1.0, 4),
('Grapes', 'Sp,Au', 20, 3, 3.5, 256),
('Green Tea', 'Sp,Su,Au', 20, 3, 1.0, 999),
('Hops', 'Su', 21, 6, 2.0, 999),
('Jungle Grapes', 'Su', 20, 3, 2.5, 512),
('Lettuce', 'Sp', 24, 3, 1.0, 4),
('Nether Grapes', 'Sp,Au', 24, 3, 3.5, 2048),
('Oat', 'Su', 36, 5, 1.0, 4),
('Onion', 'Sp', 12, 4, 1.5, 4),
('Peanut', 'Au', 24, 7, 2.0, 512),
('Pitcher Plant', 'Su', 64, 4, 1.0, 999),
('Potato', 'Sp', 24, 7, 1.5, 2),
('Rice', 'Su,Au', 16, 6, 1.0, 256),
('Rooibos', 'Su', 8, 3, 2.0, 999),
('Savanna Grapes', 'Sp,Su', 20, 3, 3.5, 512),
('Strawberry', 'Sp', 18, 5, 2.0, 3),
('Sweet Berries', 'Sp,Au', 4, 3, 2.5, 999),
('Sweet Potato', 'Au', 20, 5, 2.0, 64),
('Taiga Grapes', 'Wi', 20, 2, 3.5, 512),
('Tomato', 'Sp,Su,Au', 24, 4, 1.0, 4),
('Torchflower', 'Su', 128, 4, 1.0, 999),
('Tubabacco', 'Sp,Wi', 87, 9, 1.0, 512),
('Turnip', 'Sp', 36, 5, 1.0, 6),
('Wheat', 'Su,Au', 46, 7, 1.0, 8),
('Wild Berries', 'Wi', 8, 3, 1.5, 999),
('Yerba Mate', 'Sp,Su,Au', 6, 3, 2.0, 999),
('Sparkpod', 'Su', 100, 4, 1.0, 999),
('Zucchini', 'Su', 72, 7, 1.0, 999);

-- ============================================
-- Step 6: Insert Processors Data (Pickling)
-- ============================================
INSERT INTO processors (processor_type, processor_name, crop_name, crop_base_value, processing_days, output_value, profit, profit_per_day) VALUES
('pickling', 'Pickling Station', 'Beetroot', 24, 0.8, 78, 54, 67.5),
('pickling', 'Pickling Station', 'Carrot', 23, 0.8, 69, 46, 57.5),
('pickling', 'Pickling Station', 'Cauliflower', 48, 0.8, 144, 96, 120.0),
('pickling', 'Pickling Station', 'Eggplant', 42, 0.8, 126, 84, 105.0),
('pickling', 'Pickling Station', 'Garlic', 27, 0.8, 81, 54, 67.5),
('pickling', 'Pickling Station', 'Ginger', 24, 0.8, 72, 48, 60.0),
('pickling', 'Pickling Station', 'Lettuce', 24, 0.8, 72, 48, 60.0),
('pickling', 'Pickling Station', 'Potato', 24, 0.8, 72, 48, 60.0),
('pickling', 'Pickling Station', 'Turnip', 36, 0.8, 144, 108, 135.0),
('pickling', 'Pickling Station', 'Zucchini', 72, 0.8, 216, 144, 180.0);

-- ============================================
-- Step 7: Insert Processors Data (Preserving)
-- ============================================
INSERT INTO processors (processor_type, processor_name, crop_name, crop_base_value, processing_days, output_value, profit, profit_per_day) VALUES
('preserving', 'Preserving Cask', 'Ancient Fruit', 128, 2, 1984, 1856, 928),
('preserving', 'Preserving Cask', 'Beetroot', 24, 2, 424, 400, 200),
('preserving', 'Preserving Cask', 'Blueberry', 24, 2, 424, 400, 200),
('preserving', 'Preserving Cask', 'Carrot', 23, 2, 409, 386, 193),
('preserving', 'Preserving Cask', 'Corn', 28, 2, 484, 456, 228),
('preserving', 'Preserving Cask', 'Foul Berries', 4, 2, 124, 120, 60),
('preserving', 'Preserving Cask', 'Gearo Berries', 24, 2, 424, 400, 200),
('preserving', 'Preserving Cask', 'Ghost Pepper', 36, 2, 604, 568, 284),
('preserving', 'Preserving Cask', 'Onion', 12, 2, 244, 232, 116),
('preserving', 'Preserving Cask', 'Peanut', 24, 2, 424, 400, 200),
('preserving', 'Preserving Cask', 'Potato', 24, 2, 424, 400, 200),
('preserving', 'Preserving Cask', 'Sparkpod', 100, 2, 1564, 1464, 732),
('preserving', 'Preserving Cask', 'Strawberry', 18, 2, 334, 316, 158),
('preserving', 'Preserving Cask', 'Sweet Berries', 4, 2, 124, 120, 60),
('preserving', 'Preserving Cask', 'Tomato', 24, 2, 424, 400, 200),
('preserving', 'Preserving Cask', 'Cauliflower', 48, 3, 784, 736, 245.33);

-- ============================================
-- Step 8: Insert Processors Data (Dehydrator)
-- ============================================
INSERT INTO processors (processor_type, processor_name, crop_name, crop_base_value, processing_days, output_value, profit, profit_per_day) VALUES
('dehydrator', 'Dehydrator', 'Ancient Fruit', 128, 1, 1856, 1728, 1728),
('dehydrator', 'Dehydrator', 'Blueberry', 24, 1, 400, 376, 376),
('dehydrator', 'Dehydrator', 'Foul Berries', 4, 1, 120, 116, 116),
('dehydrator', 'Dehydrator', 'Gearo Berries', 24, 1, 400, 376, 376),
('dehydrator', 'Dehydrator', 'Sparkpod', 100, 1, 1464, 1364, 1364),
('dehydrator', 'Dehydrator', 'Strawberry', 18, 1, 316, 298, 298),
('dehydrator', 'Dehydrator', 'Sweet Berries', 4, 1, 120, 116, 116);

-- ============================================
-- VERIFICATION QUERIES (uncomment to test)
-- ============================================
-- SELECT COUNT(*) as total_crops FROM crops;
-- SELECT crop_name, base_value, grow_time, avg_yield FROM crops ORDER BY base_value DESC;
-- SELECT COUNT(*) as total_recipes FROM processors;
-- SELECT processor_type, COUNT(*) as count FROM processors GROUP BY processor_type;

-- ============================================
-- SETUP COMPLETE
-- ============================================
-- This script has created:
-- ✓ Database: sunlit_valley
-- ✓ Tables: site_config, crops, processors, visit_events
-- ✓ 48 crops with repo-aligned values
-- ✓ 32 processor recipes
-- ✓ Indexes on crop_name, seasons, processor_type
--
-- Next Steps:
-- 1. Update .env with your MySQL credentials
-- 2. Restart backend: npm start
-- 3. Verify at http://localhost:3001/api/crops
--
-- Data Source: https://sunlitvalley.miraheze.org/wiki/Crops (Jan 31, 2026)
-- ============================================
