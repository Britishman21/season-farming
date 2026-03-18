# Sunlit Valley Crop Planner

A full-stack farming optimization tool for the Society: Sunlit Valley modpack.

## 📁 Project Structure

```
sunlitvally(original)/
├── public/                    # Frontend website files
│   ├── index.html            # Main seasonal planner
│   ├── about.html            # About & FAQ page
│   ├── process-*.html        # Processor recipe pages
│   ├── css/
│   │   └── styles.css        # Main stylesheet
│   └── js/
│       ├── config.js         # Configuration & static data
│       ├── api-client.js     # API communication
│       ├── utils.js          # Helper functions
│       ├── site-footer.js    # Footer & navigation
│       └── storage-notice.js # Local storage management
├── server/                    # Backend API
│   ├── server.js             # Express entry point
│   ├── db.js                 # Database connection
│   ├── package.json          # Node dependencies
│   ├── .env                  # Environment variables
│   ├── setup-db.sql          # Database initialization
│   ├── create-user.sql       # Optional MySQL user setup
│   ├── README.md             # API documentation
│   ├── DATABASE_SETUP.md     # Database guide
│   └── routes/               # API endpoints
├── docs/                      # Documentation
│   ├── QUICKSTART_SETUP.md   # Setup instructions
│   ├── API_REFERENCE.md      # API documentation
│   ├── DEBUGGING.md          # Troubleshooting guide
│   └── DATA_VERIFICATION_REPORT.md # Data audit
└── README.md                 # This file
```

## 🚀 Quick Start

### Backend Setup
```bash
cd server
npm install
npm start
# Runs on localhost:3001
```

### Frontend Setup
```bash
# Option 1: Python
cd public
python -m http.server 5500

# Option 2: Node.js
npm install -g http-server
http-server public -p 5500
```

Visit `http://localhost:5500` to start planning! 📊

## 📚 Documentation

- **[QUICKSTART_SETUP.md](docs/QUICKSTART_SETUP.md)** - Complete setup guide (5-12 minutes)
- **[DATABASE_SETUP.md](server/DATABASE_SETUP.md)** - Database configuration options
- **[API_REFERENCE.md](docs/API_REFERENCE.md)** - API endpoint documentation
- **[DEBUGGING.md](docs/DEBUGGING.md)** - Troubleshooting & common issues
- **[DATA_VERIFICATION_REPORT.md](docs/DATA_VERIFICATION_REPORT.md)** - Data accuracy audit

## ✨ Features

✅ **47 Official Crops** - All verified against official wiki
✅ **Real-time Profit Calculator** - Sort by profitability, grow time, season
✅ **Processor Recipes** - Pickling, Preserving, Dehydrator optimization  
✅ **Smart API** - Real-time database sync, graceful fallback
✅ **Responsive Design** - Works on desktop and mobile
✅ **Local Storage** - Remember your favorite crops and filters
✅ **No Database Required** - Works with static fallback data

## 🔧 Tech Stack

**Frontend:** Vanilla HTML, CSS, JavaScript (no dependencies!)
**Backend:** Node.js, Express.js
**Database:** MySQL 5.7+
**Caching:** Browser localStorage + 5-minute API cache

## 📊 Data

All crop data is verified against the official sources:
- **Official Wiki**: https://sunlitvalley.miraheze.org/wiki/Crops
- **GitHub Modpack**: https://github.com/Chakyl/society-sunlit-valley
- **Last Updated:** January 31, 2026

## 🐛 Troubleshooting

See [DEBUGGING.md](docs/DEBUGGING.md) for common issues.

Common problems:
- **Port already in use** → Kill existing process or use different port
- **MySQL connection failed** → Check `.env` credentials
- **Crops not loading** → Check browser console (F12) for errors

## 📝 License

Community project for Society: Sunlit Valley modpack.

## 🤝 Contributing

Data corrections welcome! Check current accuracy in [DATA_VERIFICATION_REPORT.md](docs/DATA_VERIFICATION_REPORT.md).

---

**Version:** 2.0 | **Last Updated:** February 21, 2026
