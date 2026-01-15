// ============================================================================
// SUNLIT VALLEY - Centralized Data Configuration
// ============================================================================
// All crop and processor data for the Sunlit Valley planner
// Last updated: Dec 15, 2025 | Modpack: v3.4.3 | Site: v1.0

window.sunlitData = {
  // Site & Modpack Information
  siteVersion: '3.0',
  modpackVersion: '3.4.3',
  modpackUrl: 'https://www.curseforge.com/minecraft/modpacks/society-sunlit-valley',
  dataLastUpdated: 'Dec 17, 2025',
  githubUrl: 'https://github.com/yourusername/sunlitvally',

  // Season Codes
  seasons: {
    Sp: 'Spring',
    Su: 'Summer',
    Au: 'Autumn',
    Wi: 'Winter',
  },

  // Fertilizer Types
  fertilizers: {
    weak: { label: 'Weak Fertilizer', growTimeReduction: 1, yieldBonus: 0 },
    strong: { label: 'Strong Fertilizer', growTimeReduction: 2, yieldBonus: 0 },
    hyper: { label: 'Hyper Fertilizer', growTimeReduction: 3, yieldBonus: 0 },
    bountiful: { label: 'Bountiful Fertilizer', growTimeReduction: 0, yieldBonus: 0.25 },
  },

  // ============================================================================
  // CROPS DATA
  // ============================================================================
  // Fields: seasons, crop, sellPrice, growTime, avgYield, seedCost
  // Note: profit calculations are done dynamically in the UI
  crops: [
    // SUMMER CROPS
    { seasons: 'Su',         crop: 'Aloe Vera',      sellPrice: 16,  growTime: 8,  avgYield: 1.5, seedCost: 2   },
    { seasons: 'Su',         crop: 'Bell Pepper',    sellPrice: 32,  growTime: 7,  avgYield: 2,   seedCost: 64  },
    { seasons: 'Su',         crop: 'Blueberry',      sellPrice: 24,  growTime: 7,  avgYield: 3.5, seedCost: 8   },
    { seasons: 'Su',         crop: 'Cotton',         sellPrice: 24,  growTime: 3,  avgYield: 1,   seedCost: 2   },
    { seasons: 'Su',         crop: 'Ghost Pepper',   sellPrice: 36,  growTime: 7,  avgYield: 2,   seedCost: 64  },
    { seasons: 'Su',         crop: 'Hops',           sellPrice: 21,  growTime: 6,  avgYield: 2,   seedCost: 2   },
    { seasons: 'Su',         crop: 'Oat',            sellPrice: 36,  growTime: 5,  avgYield: 1,   seedCost: 4   },
    { seasons: 'Su',         crop: 'Pitcher Plant',  sellPrice: 128, growTime: 4,  avgYield: 1,   seedCost: 2   },
    { seasons: 'Su',         crop: 'Rooibos',        sellPrice: 19,  growTime: 3,  avgYield: 2,   seedCost: 2   },
    { seasons: 'Su',         crop: 'Torchflower',    sellPrice: 128, growTime: 4,  avgYield: 1,   seedCost: 2   },

    // SPRING CROPS
    { seasons: 'Sp',         crop: 'Cauliflower',    sellPrice: 48,  growTime: 7,  avgYield: 2,   seedCost: 6   },
    { seasons: 'Sp',         crop: 'Coffee Beans',   sellPrice: 8,   growTime: 3,  avgYield: 1.5, seedCost: 2   },
    { seasons: 'Sp',         crop: 'Cucumber',       sellPrice: 36,  growTime: 7,  avgYield: 2,   seedCost: 64  },
    { seasons: 'Sp',         crop: 'Flax',           sellPrice: 68,  growTime: 7,  avgYield: 1,   seedCost: 48  },
    { seasons: 'Sp',         crop: 'Garlic',         sellPrice: 27,  growTime: 5,  avgYield: 2,   seedCost: 32  },
    { seasons: 'Sp',         crop: 'Gearo Berries',  sellPrice: 8,   growTime: 4,  avgYield: 2,   seedCost: 2   },
    { seasons: 'Sp',         crop: 'Lettuce',        sellPrice: 24,  growTime: 3,  avgYield: 1,   seedCost: 4   },
    { seasons: 'Sp',         crop: 'Onion',          sellPrice: 12,  growTime: 4,  avgYield: 1.5, seedCost: 4   },
    { seasons: 'Sp',         crop: 'Potato',         sellPrice: 24,  growTime: 7,  avgYield: 1.5, seedCost: 2   },
    { seasons: 'Sp',         crop: 'Strawberry',     sellPrice: 18,  growTime: 5,  avgYield: 2,   seedCost: 3   },

    // AUTUMN CROPS
    { seasons: 'Au',         crop: 'Beetroot',       sellPrice: 24,  growTime: 3,  avgYield: 1,   seedCost: 4   },
    { seasons: 'Au',         crop: 'Eggplant',       sellPrice: 42,  growTime: 6,  avgYield: 1,   seedCost: 8   },
    { seasons: 'Au',         crop: 'Foul Berries',   sellPrice: 4,   growTime: 3,  avgYield: 2,   seedCost: 2   },
    { seasons: 'Au',         crop: 'Peanut',         sellPrice: 24,  growTime: 7,  avgYield: 2,   seedCost: 512 },
    { seasons: 'Au',         crop: 'Sweet Potato',   sellPrice: 20,  growTime: 5,  avgYield: 2,   seedCost: 64  },

    // WINTER CROPS
    { seasons: 'Wi',         crop: 'Ginger',         sellPrice: 24,  growTime: 7,  avgYield: 1,   seedCost: 4   },

    // MULTI-SEASON CROPS
    { seasons: 'Sp, Su, Au', crop: 'Ancient Fruit',  sellPrice: 80,  growTime: 10, avgYield: 1,   seedCost: 2   },
    { seasons: 'Sp, Su, Au', crop: 'Green Tea',      sellPrice: 4,   growTime: 3,  avgYield: 1,   seedCost: 2   },
    { seasons: 'Sp, Su, Au', crop: 'Tomato',         sellPrice: 26,  growTime: 3,  avgYield: 1,   seedCost: 4   },
    { seasons: 'Sp, Su, Au', crop: 'Yerba Mate',     sellPrice: 6,   growTime: 3,  avgYield: 2,   seedCost: 2   },
    { seasons: 'Sp, Au',     crop: 'Carrot',         sellPrice: 23,  growTime: 7,  avgYield: 1.5, seedCost: 2   },
    { seasons: 'Sp, Au',     crop: 'Sweet Berries',  sellPrice: 2,   growTime: 3,  avgYield: 3.5, seedCost: 2   },
    { seasons: 'Sp, Wi',     crop: 'Tubabacco',      sellPrice: 87,  growTime: 9,  avgYield: 1,   seedCost: 512 },
    { seasons: 'Su, Au',     crop: 'Corn',           sellPrice: 28,  growTime: 4,  avgYield: 1,   seedCost: 4   },
    { seasons: 'Su, Au',     crop: 'Rice',           sellPrice: 16,  growTime: 3,  avgYield: 1,   seedCost: 2   },
    { seasons: 'Su, Au',     crop: 'Wheat',          sellPrice: 46,  growTime: 7,  avgYield: 1,   seedCost: 8   },
    { seasons: 'Au, Wi',     crop: 'Barley',         sellPrice: 11,  growTime: 3,  avgYield: 2,   seedCost: 2   },
    { seasons: 'Au, Wi',     crop: 'Cabbage',        sellPrice: 70,  growTime: 7,  avgYield: 1,   seedCost: 2   },
  ],

  // ============================================================================
  // PROCESSORS DATA
  // ============================================================================
  // Fields: crop, days, startPrice, finalPrice
  // Note: profit and profitPerDay are calculated dynamically in the UI
  processors: {
    // Pickling Jar (0.8 days / 19.2 hours)
    pickling: [
      { crop: 'Beetroot',      days: 0.8,  startPrice: 24,  finalPrice: 78   },
      { crop: 'Cucumber',      days: 0.8,  startPrice: 36,  finalPrice: 114  },
      { crop: 'Ghost Pepper',  days: 0.8,  startPrice: 36,  finalPrice: 114  },
      { crop: 'Onion',         days: 0.8,  startPrice: 12,  finalPrice: 42   },
      { crop: 'Pitcher Plant', days: 0.8,  startPrice: 128, finalPrice: 192  },
      { crop: 'Salt',          days: null, startPrice: 4,   finalPrice: null },
      { crop: 'Zucchini',          days: 0.8, startPrice: 72,   finalPrice: 216 },
      { crop: 'Eggplant',          days: 0.8, startPrice: 42,   finalPrice: 126  },
      { crop: 'Broccoli',          days: 0.8, startPrice: 54,   finalPrice: 144 },
      { crop: 'Carrot',          days: 0.8, startPrice: 23,   finalPrice: 69 },
      { crop: 'Golden Carrot',          days: 0.8, startPrice: 150,   finalPrice: 450 },
      { crop: 'Pumpkin Slice',          days: 0.8, startPrice: 20,   finalPrice: 60 },
      { crop: 'Potato',          days: 0.8, startPrice: 24,   finalPrice: 72 },
      { crop: 'Lettuce',          days: 0.8, startPrice: 24,   finalPrice: 72 },
      { crop: 'Spider Eye',          days: 0.8, startPrice: null,   finalPrice: null },
      { crop: 'Brrtroot',          days: 0.8, startPrice: 24,   finalPrice: 78 },
      { crop: 'Eggs',          days: 1.5, startPrice: null,   finalPrice: 48 },
      { crop: 'Bell Pepper',          days: 0.8, startPrice: 32,   finalPrice: 96 },
      { crop: 'Cauliflower',          days: 0.8, startPrice: 48,   finalPrice: 144},
      { crop: 'Garlic',          days: 0.8, startPrice: 27,   finalPrice: 81 },
      { crop: 'Turnip',          days: 0.8, startPrice: 36,   finalPrice: 144 },
      { crop: 'Ginger',          days: 0.8, startPrice: 24,   finalPrice: 72 },
    ],

    // Preserves Jar (3 days)
    preserving: [
      { crop: 'Gearo Berries',  days: 3, startPrice:24 , finalPrice: 424  },
      { crop: 'Peanut',  days: 3, startPrice: 24, finalPrice: 424 },
      { crop: 'Cucumber',  days: 3, startPrice: 72, finalPrice: 1440 },
      { crop: 'Ghost Pepper',  days: 3, startPrice: 36, finalPrice: 604},
      { crop: 'Glow Berries',  days: 3, startPrice: 24, finalPrice: 424  },
      { crop: 'Sweet Berries',  days: 3, startPrice: 4, finalPrice: 124 },
      { crop: 'Apple',  days: 3, startPrice: 8, finalPrice: 184 },
      { crop: 'Ancient Fruit',  days: 3, startPrice: 128, finalPrice: 1984 },
      { crop: 'Dragonfruit',  days: 3, startPrice: 128, finalPrice: 1984 },
      { crop: 'Starfruit',  days: 3, startPrice: 200, finalPrice:  3064},
      { crop: 'Orange',  days: 3, startPrice: 96, finalPrice: 1504 },
      { crop: 'Banana',  days: 3, startPrice: 16, finalPrice: 304 },
      { crop: 'Mango',  days: 3, startPrice: 64, finalPrice: 1024 },
      { crop: 'Lychee',  days: 3, startPrice: 16, finalPrice: 304},
      { crop: 'Peach',  days: 3, startPrice: 64, finalPrice: 1024 },
      { crop: 'Cherry',  days: 3, startPrice: 12, finalPrice: 424 },
      { crop: 'Strawberry',  days: 3, startPrice: 18, finalPrice: 334  },
      { crop: 'Plum',  days: 3, startPrice: 96, finalPrice: 1504},
      { crop: 'Pawpaw',  days: 3, startPrice: 80, finalPrice: 1264 },
      { crop: 'Mellon Slice',  days: 3, startPrice: 9, finalPrice:  199},
      { crop: 'Pumpkin Slice',  days: 3, startPrice: 20, finalPrice: 364 },
      { crop: 'Red Grapes (ALL)',  days: 3, startPrice: 20, finalPrice: 124 },
      { crop: 'White Grapes (ALL)',  days: 3, startPrice: 20, finalPrice: 123 },
      { crop: 'Blueberry',  days: 3, startPrice: 24, finalPrice: 424 },
      { crop: 'Passion Fruit',  days: 3, startPrice: 128, finalPrice: 1984 },
      { crop: 'Currant',  days: 3, startPrice: 8, finalPrice: 184 },
      { crop: 'Yucca Fruit',  days: 3, startPrice: 8, finalPrice: 184 },
      { crop: 'Aloe Leaves',  days: 3, startPrice: 16, finalPrice: 304 },
      { crop: 'Carrot',  days: 3, startPrice: 23, finalPrice: 409 },
      { crop: 'Potato',  days: 3, startPrice: 24, finalPrice: 424 },
      { crop: 'Beetroot',  days: 3, startPrice: 24, finalPrice: 424 },
      { crop: 'Corn',  days: 3, startPrice: 28, finalPrice: 484 },
      { crop: 'Tomato',  days: 3, startPrice: 24, finalPrice: 454 },
      { crop: 'Hazelnut',  days: 3, startPrice: 32, finalPrice: 544 },
      { crop: 'Foul Berries',  days: 3, startPrice: 4, finalPrice:  124},
      { crop: 'Chorus Fruit',  days: 3, startPrice: 16, finalPrice: 304 },
      { crop: 'Lemon',  days: 3, startPrice: 160, finalPrice: 2464 },
      { crop: 'Onion',  days: 3, startPrice: 12, finalPrice:  244},
      { crop: 'Eggplant',  days: 3, startPrice: 42, finalPrice: 694 },
      { crop: 'Cauliflower',  days: 3, startPrice: 48, finalPrice:  784},
      { crop: 'Bell Pepper',  days: 3, startPrice: 32, finalPrice: 544 },
      { crop: 'Sweet Potato',  days: 3, startPrice: 20, finalPrice:  364},
      { crop: 'Garlic',  days: 3, startPrice: 27, finalPrice: 468 },
      { crop: 'Ginger',  days: 3, startPrice: 24, finalPrice: 424 },
      { crop: 'SalmonBerry',  days: 3, startPrice: 20, finalPrice: 364 },
      { crop: 'Boysenberry',  days: 3, startPrice: 16, finalPrice:  304},
      { crop: 'Cranberry',  days: 3, startPrice: 18, finalPrice: 334  },
      { crop: 'Crystal Berries',  days: 3, startPrice: 22, finalPrice: 394 },
      { crop: 'Wild Berries',  days: 3, startPrice: 8, finalPrice: 184 },
      { crop: 'Zucchini',  days: 3, startPrice: 72, finalPrice: 1440 },
      { crop: 'Turnip',  days: 3, startPrice: 36, finalPrice: 784 },
      { crop: 'Broccoli',  days: 3, startPrice: 54, finalPrice: 1080 },
      { crop: 'Atlantic Herring Roe',  days: 3, startPrice: 21, finalPrice: 312 },
      { crop: 'Pufferfish Roe',  days: 3, startPrice: 21, finalPrice:  312},
      { crop: 'Minnow Roe',  days: 3, startPrice: 21, finalPrice: 312 },
      { crop: 'Bluegill Roe',  days: 3, startPrice: 21, finalPrice: 312 },
      { crop: 'Perch Roe',  days: 3, startPrice: 21, finalPrice: 312 },
      { crop: 'Salmon Roe',  days: 3, startPrice: 24, finalPrice: 360 },
      { crop: 'Blackfish Roe',  days: 3, startPrice: 24, finalPrice: 360 },
      { crop: 'Brown Trout Roe',  days: 3, startPrice: 29, finalPrice: 432 },
      { crop: 'Carp Roe',  days: 3, startPrice: 29, finalPrice:  432},
      { crop: 'Piranha Roe',  days: 3, startPrice: 32, finalPrice: 480 },
      { crop: 'Smallmouth Bass Roe',  days: 3, startPrice: 29, finalPrice: 432 },
      { crop: 'Cod Roe',  days: 3, startPrice: 21, finalPrice: 312 },
      { crop: 'Pollock Roe',  days: 3, startPrice: 34, finalPrice: 512 },
      { crop: 'Jellyfish Roe',  days: 3, startPrice: 34, finalPrice: 512 },
      { crop: 'Rainbow Trout roe',  days: 3, startPrice: 37, finalPrice: 560 },
      { crop: 'Pink Salmon Roe',  days: 3, startPrice: 37, finalPrice: 560 },
      { crop: 'Tropical Fish Roe',  days: 3, startPrice: 40, finalPrice: 608 },
      { crop: 'Red Groper Roe',  days: 3, startPrice: 42, finalPrice: 624 },
      { crop: 'Gar Roe',  days: 3, startPrice: 45, finalPrice: 672 },
      { crop: 'Muskellunge Roe',  days: 3, startPrice: 48, finalPrice: 720 },
      { crop: 'Synodomtis Roe',  days: 3, startPrice: 53, finalPrice: 800 },
      { crop: 'Tambaqui Roe',  days: 3, startPrice: 53, finalPrice: 800 },
      { crop: 'Alantic Cod Roe',  days: 3, startPrice: 56, finalPrice: 848 },
      { crop: 'Boulti Roe',  days: 3, startPrice: 58, finalPrice: 864 },
      { crop: 'Leech Roe',  days: 3, startPrice: 61, finalPrice: 912 },
      { crop: 'Catfish Roe',  days: 3, startPrice: 64, finalPrice: 960 },
      { crop: 'Tuna Roe',  days: 3, startPrice: 80, finalPrice: 1216 },
      { crop: 'Bayad Roe',  days: 3, startPrice: 88, finalPrice: 1280 },
      { crop: 'Arapaima Roe',  days: 3, startPrice: 88, finalPrice: 1344 },
      { crop: 'Atlantic Halibut Roe',  days: 3, startPrice: 96, finalPrice: 1408 },
      { crop: 'Starfish Turtle Roe',  days: 3, startPrice: 96, finalPrice: 1472 },
      { crop: 'Brown Shrooma Row',  days: 3, startPrice: 104, finalPrice: 1536 },
      { crop: 'Red Shrooma Roe',  days: 3, startPrice: 104, finalPrice: 1536 },
      { crop: 'Arrau Turtle Roe',  days: 3, startPrice: 112, finalPrice: 1664 },
      { crop: 'Capitanue Roe',  days: 3, startPrice: 112, finalPrice: 1664 },
      { crop: 'Box Turtle Roe',  days: 3, startPrice: 120, finalPrice: 1856 },
      { crop: 'Pacific Halibut Roe',  days: 3, startPrice: 152, finalPrice: 2240 },
      { crop: 'Goldfish Roe',  days: 3, startPrice: 184, finalPrice: 2816 },
      { crop: 'Shrimp Roe',  days: 3, startPrice: 17, finalPrice: 256 },
      { crop: 'Clawster Roe',  days: 3, startPrice: 21, finalPrice: 312 },
      { crop: 'Crab Roe',  days: 3, startPrice: 18, finalPrice: 272 },
      { crop: 'Clam Roe',  days: 3, startPrice: 17, finalPrice: 256 },
      { crop: 'Searing Cod Roe',  days: 3, startPrice: 104, finalPrice: 1536 },
      { crop: 'Blazefish',  days: 3, startPrice: 152, finalPrice: 2304 },
      { crop: 'Lava Pufferfish Roe',  days: 3, startPrice: 104, finalPrice: 1536 },
      { crop: 'Obsidianfish Roe',  days: 3, startPrice: 184, finalPrice: 2816 },
      { crop: 'BoneFish Roe',  days: 3, startPrice:136,  finalPrice:2048 },
      { crop: 'Wither Bonefish Roe',  days: 3, startPrice: 152, finalPrice: 2304 },
      { crop: 'Magmacubefish Roe',  days: 3, startPrice: 224, finalPrice: 3328 },
      { crop: 'Glowdine Roe',  days: 3, startPrice: 168, finalPrice: 2496 },
      { crop: 'Soulsucker Roe',  days: 3, startPrice: 120, finalPrice: 1792 },
      { crop: 'Fortress Grouper Roe',  days: 3, startPrice: 240, finalPrice: 3584 },
      { crop: 'Eyeball Fish Roe',  days: 3, startPrice: 152, finalPrice: 2304 },
      { crop: 'Neptuna Roe',  days: 3, startPrice: 144, finalPrice: 2176 },
      { crop: 'Sneep Snorp Roe',  days: 3, startPrice: 21, finalPrice: 312 },
      { crop: 'Picklefish Roe',  days: 3, startPrice: 32, finalPrice: 480 },
      { crop: 'Forkfish Roe',  days: 3, startPrice: 48, finalPrice: 720 },
      { crop: 'Beaked Herring Roe',  days: 3, startPrice: 26, finalPrice: 392 },
      { crop: 'Sailor Barb Roe',  days: 3, startPrice: 53, finalPrice: 800 },
      { crop: 'Dramon Herring Roe',  days: 3, startPrice: 80, finalPrice: 1216 },
      { crop: 'Triple Twirl Pleco Roe',  days: 3, startPrice: 88, finalPrice: 1280 },
      { crop: 'CopperFlame Anthias Roe',  days: 3, startPrice: 120, finalPrice: 1856 },
      { crop: 'Drooping Gourami Roe',  days: 3, startPrice: 72, finalPrice: 1088 },
      { crop: 'Duality Damselfish Roe',  days: 3, startPrice: 168, finalPrice: 2496 },
      { crop: 'Blind Sailfin Roe',  days: 3, startPrice: 88, finalPrice: 1344 },
      { crop: 'Circus Fish Roe',  days: 3, startPrice: 120, finalPrice: 1856 },
      { crop: 'Frosty Fin Roe',  days: 3, startPrice: 48, finalPrice: 720 },
      { crop: 'Aero Mono Roe ',  days: 3, startPrice: 58, finalPrice: 864 },
      { crop: 'Hatchetfish Roe',  days: 3, startPrice: 136, finalPrice: 1984 },
      { crop: 'Spindlefish Roe',  days: 3, startPrice: 136, finalPrice: 2048 },
      { crop: 'Bark Anglefish Roe',  days: 3, startPrice: 64, finalPrice: 960 },
      { crop: 'Amber Goby Roe',  days: 3, startPrice: 112, finalPrice: 1664 },
      { crop: 'Eyelash Roe',  days: 3, startPrice: 176, finalPrice: 2624 },
      { crop: 'Koi Fish Roe',  days: 3, startPrice: 128, finalPrice: 1920 },
    ],

    // Dehydrator (1 day)
    dehydrator: [
      { crop: 'Ancient Fruit', days: 1, startPrice: 128, finalPrice: 1856 },// Updated value
      { crop: 'Blueberry',     days: 1, startPrice: 24, finalPrice: 400  },// Updated value 
      { crop: 'Foul Berries',  days: 1, startPrice: 4,  finalPrice: 120   },// Updated value 
      { crop: 'Gearo Berries', days: 1, startPrice: 24,  finalPrice: 400  },  // Updated value
      { crop: 'Strawberry',    days: 1, startPrice: 18, finalPrice: 316  },// Updated value
      { crop: 'Sweet Berries', days: 1, startPrice: 4,  finalPrice: 120   },// Updated value
      { crop: 'Wild Berries',  days: 1, startPrice: 8,  finalPrice: 176   },// updated value
      { crop: 'Crystal Berries', days: 1, startPrice: 22,  finalPrice: 372   },// New entry
      { crop: 'Dragonfruit',   days: 1, startPrice: 128, finalPrice: 1856 },// New entry
      { crop: 'Cranberries',  days: 1, startPrice: 18,  finalPrice: 316  },// New entry
      { crop: 'Boysen Berries', days: 1, startPrice: 16,  finalPrice: 288   },// New entry
      { crop: 'Salmon Berries', days: 1, startPrice: 20,  finalPrice: 344   },// New entry
      { crop: 'Lemon', days: 1, startPrice: 160,  finalPrice: 2304   },// New entry
      { crop: 'Starfruit', days: 1, startPrice: 200,  finalPrice: 2864   },// New entry
      { crop: 'Passion Fruit', days: 1, startPrice: 128,  finalPrice: 1856   },// New entry
      { crop: 'Orange', days: 1, startPrice: 96,  finalPrice: 1408   }, // New entry
      { crop: 'Plum', days: 1, startPrice: 96,  finalPrice: 1408   }, // New entry
      { crop: 'Pawpaw', days: 1, startPrice: 80,  finalPrice: 1184   }, // New entry
      { crop: 'Peach', days: 1, startPrice: 64,  finalPrice: 960   }, // New entry
      { crop: 'Mango', days: 1, startPrice: 64,  finalPrice: 960   }, // New entry
      { crop: 'Cherry', days: 1, startPrice: 12,  finalPrice: 400   }, // New entry},
      { crop: 'Glow Berries', days: 1, startPrice: 24,  finalPrice: 400   }, // New entry
      { crop: 'Banana', days: 1, startPrice: 16,  finalPrice: 288   }, // New entry
      { crop: 'Lychee', days: 1, startPrice: 16,  finalPrice: 288   }, // New entry
      { crop: 'Chorus Fruit', days: 1, startPrice: 16,  finalPrice: 288   },
      { crop: 'Mellon Slice', days: 1, startPrice: 9,  finalPrice: 190  },
      { crop: 'Apple', days: 1, startPrice: 8,  finalPrice: 176    },
      { crop: 'Yucca Fruit', days: 1, startPrice: 8,  finalPrice: 176    },
      { crop: 'Currant', days: 1, startPrice: 8,  finalPrice: 176    },
      { crop: 'Braket Mushroom', days: 1, startPrice: 32,  finalPrice: 416  },
      { crop: 'Alphacene', days: 1, startPrice: 32,  finalPrice: 416 },
      { crop: 'Toadstool', days: 1, startPrice: 20,  finalPrice: 272   },
      { crop: 'Glow Shroom', days: 1, startPrice: 24,  finalPrice: 320   },
      { crop: 'Warped Fungus', days: 1, startPrice: 16,  finalPrice: 224   },
      { crop: 'Crimson Fungus', days: 1, startPrice: 16,  finalPrice: 224   },
      { crop: 'Red Mushroom', days: 1, startPrice: 8,  finalPrice: 128   },
      { crop: 'Brown Mushroom', days: 1, startPrice: 8,  finalPrice: 128   },
      { crop: 'White Grapes (ALL)', days: 1, startPrice: 20,  finalPrice: 360    },
      { crop: 'Red Grapes (ALL)', days: 1, startPrice: 20,  finalPrice: 360   },
      { crop: 'Warped Grape', days: 1, startPrice: 24,  finalPrice: 400  },
      { crop: 'Crimson Grape', days: 1, startPrice: 24,  finalPrice: 400   },
      { crop: '(ALL) Shimmering Mushroom', days: 1, startPrice: 12,  finalPrice: 224   },
    ],
  },
};

// ============================================================================
// NAVIGATION & PROCESSORS LIST
// ============================================================================
window.sunlitData.processorsList = [
  { id: 'planner',    label: 'Seasonal planner',   href: 'index.html',              rows: null                                      },
  { id: 'pickling',   label: 'Pickling ', href: 'process-pickling.html',   rows: window.sunlitData.processors.pickling    },
  { id: 'preserving', label: 'Preserving',         href: 'process-preserving.html', rows: window.sunlitData.processors.preserving  },
  { id: 'dehydrator', label: 'Dehydrator ', href: 'process-dehydrator.html', rows: window.sunlitData.processors.dehydrator  },
  { id: 'about',      label: 'About & FAQ',        href: 'about.html',              rows: null                                      },
];
