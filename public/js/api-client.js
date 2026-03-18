// API Client for Sunlit Valley Backend
// Fetches data from the Node.js/Express API

window.sunlitAPI = (function() {
  const API_BASE_URL = window.API_BASE_URL || '/api';
  const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes
  const cache = {};

  // Utility function to check cache
  const isCached = (key) => {
    if (!cache[key]) return false;
    const age = Date.now() - cache[key].timestamp;
    if (age > CACHE_DURATION) {
      delete cache[key];
      return false;
    }
    return true;
  };

  // Fetch with error handling
  const fetchData = async (endpoint) => {
    if (isCached(endpoint)) {
      return cache[endpoint].data;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const json = await response.json();
      
      if (!json.success) throw new Error(json.error || 'Unknown error');
      
      // Cache the result
      cache[endpoint] = {
        data: json.data,
        timestamp: Date.now()
      };
      
      return json.data;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  };

  return {
    // Crops endpoints
    getAllCrops: () => fetchData('/crops'),
    getCrop: (id) => fetchData(`/crops/${id}`),
    getCropsBySeason: (season) => fetchData(`/crops/season/${season}`),

    // Processors endpoints
    getAllProcessors: () => fetchData('/processors'),
    getProcessorRecipes: (type) => fetchData(`/processors/type/${type}`),
    getRecipe: (id) => fetchData(`/processors/${id}`),

    // Data endpoints
    getConfig: () => fetchData('/data/config'),
    getSeasons: () => fetchData('/data/seasons'),
    getFullExport: () => fetchData('/data/export'),

    // Health check
    health: () => fetchData('/health'),

    // Utility: Get all data needed for the site
    getAllData: async () => {
      try {
        const [config, crops, processors] = await Promise.all([
          fetchData('/data/config'),
          fetchData('/crops'),
          fetchData('/processors')
        ]);
        return { config, crops, processors };
      } catch (error) {
        console.error('Failed to fetch all data:', error);
        throw error;
      }
    },

    // Clear cache
    clearCache: () => Object.keys(cache).forEach(key => delete cache[key])
  };
})();
