// Sunlit Valley Configuration (CORRECTED)
// Data source: https://sunlitvalley.miraheze.org/wiki/Crops (Updated Jan 31, 2026)
// This can work in two modes:
// 1. STATIC MODE: Uses embedded config.js data (no backend required)
// 2. API MODE: Fetches from Node.js/Express backend (recommended for production)

const USE_API = true;
const API_BASE_URL = '/api';
window.API_BASE_URL = API_BASE_URL;

window.sunlitData = {
  siteVersion: '3.0',
  modpackVersion: '4.0',
  modpackUrl: 'https://www.curseforge.com/minecraft/modpacks/society-sunlit-valley',
  dataLastUpdated: 'Jan 31, 2026 (Wiki)',
  dataSource: 'Official Wiki: https://sunlitvalley.miraheze.org/wiki/Crops',
  githubUrl: 'https://github.com/Chakyl/society-sunlit-valley',
  apiEnabled: USE_API,
  dataMode: USE_API ? 'API' : 'Static',
  seasons: { Sp: 'Spring', Su: 'Summer', Au: 'Autumn', Wi: 'Winter' },
  
  // Static fallback data (47 crops - CORRECTED from official wiki)
  crops: [
  ],
  processors: {
    pickling: [

    ],
    preserving: [

    ],
    dehydrator: [

    ],
  },
};

// Derive a processors list with metadata for nav and lookup
window.sunlitData.processorsList = [
  { id: 'planner', label: 'Seasonal planner', href: 'index.html', rows: null },
  { id: 'pickling', label: 'Pickling (0.8-day)', href: 'process-pickling.html', rows: window.sunlitData.processors.pickling },
  { id: 'preserving', label: 'Preserving', href: 'process-preserving.html', rows: window.sunlitData.processors.preserving },
  { id: 'dehydrator', label: 'Dehydrator (1-day)', href: 'process-dehydrator.html', rows: window.sunlitData.processors.dehydrator },
  { id: 'about', label: 'About & FAQ', href: 'about.html', rows: null },
];
