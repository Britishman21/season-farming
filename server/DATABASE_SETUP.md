# MySQL User & Database Setup Guide

You have **two SQL scripts** to set up your database. Choose the option that fits your needs.

## 📋 Quick Navigation

- **Option A (Easiest):** Use root user → [Simple Setup](#option-a-simple-setup-use-root-user)
- **Option B (Recommended):** Create dedicated user → [Dedicated User Setup](#option-b-dedicated-user-setup)
- **Option C (Remote):** Set up for remote access → [Remote Access Setup](#option-c-remote-access)

---

## Option A: Simple Setup (Use Root User)

### Use Case
You want to keep setup simple and only have local access.

### Step 1: Run Database Setup Script

```bash
cd server
mysql -u root -p < setup-db.sql
```

When prompted, enter your MySQL root password (or press Enter if you haven't set one).

**Expected output:**
```
Query OK, 0 rows affected
...
(multiple query confirmations)
```

### Step 2: Verify Database Creation

```bash
mysql -u root -p -e "USE sunlit_valley; SELECT COUNT(*) FROM crops;"
```

**Expected output:**
```
COUNT(*)
38
```

### Step 3: Update .env File

Edit `server/.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=              # Leave empty if no password, otherwise enter your password
DB_NAME=sunlit_valley
DB_PORT=3306
```

### Step 4: Test Connection

```bash
cd server
npm start
```

✅ **Success if you see:**
```
🚀 Sunlit Valley API running on http://localhost:3001
```

---

## Option B: Dedicated User Setup (Recommended)

### Use Case
You want a dedicated user for security/isolation, or multiple projects.

### Step 1: Create the User

Run the user creation script:
```bash
cd server
mysql -u root -p < create-user.sql
```

When prompted, enter your MySQL root password.

**Expected output:**
```
Query OK, 0 rows affected
...
User  | Host
------|----------
sunlit| localhost
```

### Step 2: Create Database with New User

Run the database setup (same as Option A):
```bash
mysql -u root -p < setup-db.sql
```

### Step 3: Verify New User Can Access Database

Test connection with the new user:
```bash
mysql -u sunlit -p sunlit_valley -e "SELECT COUNT(*) FROM crops;"
```

When prompted for password, enter: `sunlit_password`

**Expected output:**
```
COUNT(*)
38
```

### Step 4: Update .env File

Edit `server/.env`:
```env
DB_HOST=localhost
DB_USER=sunlit
DB_PASSWORD=sunlit_password
DB_NAME=sunlit_valley
DB_PORT=3306
```

### Step 5: Test Connection

```bash
cd server
npm start
```

✅ **Success if you see:**
```
🚀 Sunlit Valley API running on http://localhost:3001
```

### Optional: Change Password Later

If you want to change the password:
```bash
mysql -u root -p
```

Then run:
```sql
ALTER USER 'sunlit'@'localhost' IDENTIFIED BY 'new_password';
FLUSH PRIVILEGES;
```

Update `.env` with the new password.

---

## Option C: Remote Access Setup

### Use Case
You want to connect from a different machine (e.g., production server).

### Step 1: Create User with Remote Access

Edit `create-user.sql` before running:
```sql
-- Change this line:
CREATE USER IF NOT EXISTS 'sunlit'@'localhost' IDENTIFIED BY 'sunlit_password';

-- To this (allows access from anywhere):
CREATE USER IF NOT EXISTS 'sunlit'@'%' IDENTIFIED BY 'sunlit_password';

-- Or to a specific IP (e.g., 192.168.1.100):
CREATE USER IF NOT EXISTS 'sunlit'@'192.168.1.100' IDENTIFIED BY 'sunlit_password';
```

Then run:
```bash
mysql -u root -p < create-user.sql
mysql -u root -p < setup-db.sql
```

### Step 2: Find Your MySQL Host IP

```bash
# Linux/Mac
hostname -I

# Windows (in PowerShell)
ipconfig
# Look for IPv4 Address under your network adapter
```

### Step 3: Update .env on Remote Server

```env
DB_HOST=192.168.1.50        # Your MySQL server IP
DB_USER=sunlit
DB_PASSWORD=sunlit_password
DB_NAME=sunlit_valley
DB_PORT=3306
```

### Step 4: Test Remote Connection

From the remote machine:
```bash
mysql -h 192.168.1.50 -u sunlit -p sunlit_valley -e "SELECT COUNT(*) FROM crops;"
```

---

## The Three SQL Files Explained

| File | Purpose | When to Use |
|------|---------|-----------|
| `create-user.sql` | Creates dedicated MySQL user 'sunlit' with password | Option B (recommended for security) |
| `setup-db.sql` | Creates database, tables, and inserts all data | All options (always needed) |
| `schema.sql` | Old file (keep for reference) | Legacy/backup only |

---

## What Gets Created

### Database: `sunlit_valley`

**Tables:**

1. **site_config** (1 row)
   - Metadata: version, URLs, timestamps

2. **crops** (38 rows)
   - Crop data: name, seasons, value, grow time, yield

3. **processors** (24 rows)
   - Processing recipes: type, input/output, profit, timing

**Indexes:**
- `idx_crop_name` on crops
- `idx_seasons` on crops
- `idx_processor_type` on processors

**Foreign Key:**
- `processors.crop_name` → `crops.crop_name`

---

## Verify Your Setup

Run these commands to check everything:

### 1. Check Database Exists
```bash
mysql -u root -p -e "SHOW DATABASES LIKE 'sunlit_valley';"
```

### 2. Check Tables Exist
```bash
mysql -u root -p sunlit_valley -e "SHOW TABLES;"
```

Expected output:
```
Tables_in_sunlit_valley
processors
crops
site_config
```

### 3. Check Data Exists
```bash
mysql -u root -p -e "USE sunlit_valley; SELECT COUNT(*) as crops, (SELECT COUNT(*) FROM processors) as processors FROM crops;"
```

Expected output:
```
crops | processors
38    | 24
```

### 4. Check User Exists (if using dedicated user)
```bash
mysql -u root -p -e "SELECT User, Host FROM mysql.user WHERE User='sunlit';"
```

Expected output:
```
User  | Host
------|----------
sunlit| localhost
```

---

## Troubleshooting

### Error: "Can't connect to MySQL server"

**Cause:** MySQL not running

**Fix:**
```bash
# Check if MySQL is running
mysql --version

# Start MySQL (if not running)
# Windows: Start → Services → MySQL
# Mac: brew services start mysql@5.7
# Linux: sudo systemctl start mysql
```

### Error: "Access denied for user 'root'@'localhost'"

**Cause:** Wrong password

**Fix:**
- Make sure you're entering the correct password
- If you don't remember it, you may need to reset it

### Error: "Unknown database 'sunlit_valley'"

**Cause:** setup-db.sql not run yet

**Fix:**
```bash
mysql -u root -p < server/setup-db.sql
```

### Error: "User 'sunlit'@'localhost' already exists"

**Cause:** You've already created the user

**Fix:**
- Skip the `create-user.sql` script
- Just update your `.env` with the credentials and test it

---

## Advanced: Backup & Restore

### Backup Database

```bash
mysqldump -u sunlit -p sunlit_valley > sunlit_valley_backup.sql
```

### Restore Database

```bash
mysql -u sunlit -p sunlit_valley < sunlit_valley_backup.sql
```

---

## Security Best Practices

✅ **DO:**
- Use strong passwords (not `sunlit_password`)
- Restrict user access to specific IPs if remote
- Regularly backup your database
- Use `.env` to store credentials (not in code)

❌ **DON'T:**
- Use the root user for everyday tasks
- Store passwords in version control
- Allow `@'%'` access unless you need it
- Share database credentials in docs/code

---

## Connection String Examples

**For Node.js:**
```javascript
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});
```

**For MySQL CLI:**
```bash
mysql -h localhost -u sunlit -p sunlit_valley
```

**For Python:**
```python
import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="sunlit",
    password="sunlit_password",
    database="sunlit_valley"
)
```

---

## Next Steps

1. ✅ Run one of the setup options above
2. ✅ Verify database creation
3. ✅ Update `.env` file
4. ✅ Run `npm start` in `server/` directory
5. ✅ Visit `http://localhost:3001/api/health` to test API

---

**Version:** 1.0 | **Last Updated:** Feb 21, 2026
