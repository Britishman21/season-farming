-- ============================================
-- Create Dedicated MySQL User for Sunlit Valley
-- ============================================
-- Run this BEFORE setup-db.sql if you want a dedicated user
-- Usage: mysql -u root -p < create-user.sql

-- ============================================
-- Option 1: Create user 'sunlit' (recommended)
-- ============================================
CREATE USER IF NOT EXISTS 'sunlit'@'%' IDENTIFIED BY 'PwI*BE70qZ6';
GRANT ALL PRIVILEGES ON sunlit_valley.* TO 'sunlit'@'%';
FLUSH PRIVILEGES;

-- Verify user was created
SELECT User, Host FROM mysql.user WHERE User='sunlit';

-- ============================================
-- If you want to use this user in .env:
-- ============================================
-- DB_HOST=localhost
-- DB_USER=sunlit
-- DB_PASSWORD=PwI*BE{70qZ6
-- DB_NAME=sunlit_valley
-- DB_PORT=3306

-- ============================================
-- Future: Change password if needed
-- ============================================
-- ALTER USER 'sunlit'@'localhost' IDENTIFIED BY 'new_password';
-- FLUSH PRIVILEGES;

-- ============================================
-- Future: Drop user if needed
-- ============================================
-- DROP USER 'sunlit'@'localhost';
-- FLUSH PRIVILEGES;
