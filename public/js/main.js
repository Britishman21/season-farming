function runApp(cropsData, processorsList, seasons) {
  const seasonsAll = Object.keys(seasons);
  const renderNav = window.siteUtils && window.siteUtils.renderNav;
  const fertilizerProfiles = {
    none: { label: 'None', valueMultiplier: 1, yieldMultiplier: 1, growMultiplier: 1 },
    basic: { label: 'Basic', valueMultiplier: 1, yieldMultiplier: 1.1, growMultiplier: 0.95 },
    quality: { label: 'Quality', valueMultiplier: 1.15, yieldMultiplier: 1.15, growMultiplier: 0.9 },
    deluxe: { label: 'Deluxe', valueMultiplier: 1.3, yieldMultiplier: 1.25, growMultiplier: 0.85 },
    pristine: { label: 'Pristine', valueMultiplier: 1.5, yieldMultiplier: 1.35, growMultiplier: 0.8 }
  };

  const state = {
    search: '',
    maxGrow: 0,
    seasonDays: 28,
    plots: 100,
    fertilizer: 'none',
    sortBy: '',
    sortDir: 'asc',
    favorites: new Set(),
    seasons: new Set(seasonsAll), // all seasons active by default
  };

  const twoDpFormatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // --- Safe number formatting ---
  function fmt(val) {
    const num = Number(val);
    if (!Number.isFinite(num)) return '—';
    return twoDpFormatter.format(num);
  }

  // --- Prepare rows ---
  const rows = cropsData.map(item => {
    const seasonList = (item.seasons || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean); // keep all non-empty season codes
    return { ...item, seasonList };
  });

  // --- Render Season Chips ---
  function renderSeasonChips() {
    const wrap = document.getElementById('seasonChips');
    if (!wrap) return;

    wrap.innerHTML = seasonsAll
      .map(code => {
        const active = state.seasons.has(code) ? 'active' : '';
        const label = seasons[code] || code; // fallback to code if label missing
        return `<div class="chip ${active}" data-season="${code}" role="checkbox" aria-checked="${state.seasons.has(code)}">${label}</div>`;
      })
      .join('');

    attachSeasonChipEvents();
  }

  function toggleSeason(code) {
    if (state.seasons.has(code)) state.seasons.delete(code);
    else state.seasons.add(code);
    renderSeasonChips();
    renderTable();
  }

  function attachSeasonChipEvents() {
    document.querySelectorAll('.chip').forEach(chip => {
      chip.onclick = () => toggleSeason(chip.dataset.season);
    });
  }

  // --- Table Rendering ---
  const tableBody = document.querySelector('#cropTable tbody');

  function getSortValue(row, key) {
    if (key === 'seasons') {
      return row.seasonList
        .map(s => seasons[s] || s)
        .join(',');
    }
    return row[key];
  }

  function renderTable() {
    if (!tableBody) return;

    const fertilizer = fertilizerProfiles[state.fertilizer] || fertilizerProfiles.none;
    const augment = row => {
      const adjustedValue = row.value * fertilizer.valueMultiplier;
      const adjustedYield = row.avgYield * fertilizer.yieldMultiplier;
      const adjustedGrowTime = Math.max(1, row.growTime * fertilizer.growMultiplier);
      const adjustedProfitPerDay = (adjustedValue * adjustedYield) / adjustedGrowTime;
      const seasonProfit = adjustedProfitPerDay * state.seasonDays;

      return {
        ...row,
        value: adjustedValue,
        avgYield: adjustedYield,
        growTime: adjustedGrowTime,
        profitPerDay: adjustedProfitPerDay,
        seasonProfit,
        seasonProfitTotal: seasonProfit * state.plots,
      };
    };

    const filtered = rows
      .map(augment)
      .filter(row => {
        const matchesSearch = row.crop.toLowerCase().includes(state.search.toLowerCase());
        const matchesGrow = state.maxGrow ? row.growTime <= state.maxGrow : true;
        // allow crops with empty/unknown seasons to show
        const matchesSeason = row.seasonList.length
          ? row.seasonList.some(s => state.seasons.has(s))
          : true;
        return matchesSearch && matchesGrow && matchesSeason;
      });

    if (state.sortBy) {
      filtered.sort((a, b) => {
        const dir = state.sortDir === 'asc' ? 1 : -1;
        const aVal = getSortValue(a, state.sortBy);
        const bVal = getSortValue(b, state.sortBy);

        if (typeof aVal === 'number' && Number.isFinite(aVal) && typeof bVal === 'number' && Number.isFinite(bVal)) {
          return (aVal - bVal) * dir;
        }

        return String(aVal ?? '').localeCompare(String(bVal ?? '')) * dir;
      });
    }

    const rowsHtml = filtered
      .map(row => {
        const profitClass = row.profitPerDay >= 15 ? 'tag-gold' : row.profitPerDay >= 10 ? 'tag-green' : '';
        const growClass = row.growTime <= 4 ? 'tag-green' : row.growTime >= 8 ? 'tag-red' : '';
        const isFav = state.favorites.has(row.crop) ? '★' : '☆';
        const favStyle = state.favorites.has(row.crop)
          ? 'color: var(--accent); cursor:pointer;'
          : 'opacity:0.5; cursor:pointer;';

        return `
        <tr>
          <td><span style="${favStyle}" class="fav-toggle" data-crop="${row.crop}">${isFav}</span> ${row.crop}</td>
          <td>${row.seasonList.map(s => seasons[s] ? `<span class="pill">${seasons[s]}</span>` : s).join(' ')}</td>
          <td>${fmt(row.seedCost)}</td>
          <td>${fmt(row.value)}</td>
          <td><span class="${growClass}">${fmt(row.growTime)}d</span></td>
          <td>${fmt(row.avgYield)}</td>
          <td><span class="${profitClass}">${fmt(row.profitPerDay)}</span></td>
          <td>${fmt(row.seasonProfit)}</td>
          <td>${fmt(row.seasonProfitTotal)}</td>
        </tr>`;
      })
      .join('');

    tableBody.innerHTML =
      rowsHtml || '<tr><td colspan="9" class="fade">No crops match the filters.</td></tr>';

    attachFavHandlers();
    updateSortIndicators();
  }

  // --- Favorites & Controls ---
  function loadFavorites() {
    const saved = localStorage.getItem('sunlit-favorites');
    if (saved) state.favorites = new Set(JSON.parse(saved));
  }

  function saveFavorites() {
    localStorage.setItem('sunlit-favorites', JSON.stringify(Array.from(state.favorites)));
  }

  function toggleFavorite(crop) {
    state.favorites.has(crop) ? state.favorites.delete(crop) : state.favorites.add(crop);
    saveFavorites();
    renderTable();
  }

  function attachFavHandlers() {
    document.querySelectorAll('.fav-toggle').forEach(el => {
      el.onclick = e => {
        e.stopPropagation();
        toggleFavorite(el.dataset.crop);
      };
    });
  }

  function updateSortIndicators() {
    document.querySelectorAll('th[data-key]').forEach(th => {
      const indicator = th.querySelector('.sort-indicator');
      const isActive = th.dataset.key === state.sortBy;
      th.classList.toggle('sort-active', isActive);
      if (indicator) indicator.textContent = isActive ? (state.sortDir === 'asc' ? '▲' : '▼') : '⇅';
    });
  }

  function attachSortHandlers() {
    document.querySelectorAll('th[data-key]').forEach(th => {
      th.onclick = () => {
        const key = th.dataset.key;
        if (state.sortBy === key) {
          state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
        } else {
          state.sortBy = key;
          state.sortDir = key === 'crop' || key === 'seasons' ? 'asc' : 'desc';
        }
        renderTable();
      };
    });
  }

  // --- Input Controls ---
  function initControls() {
    document.getElementById('search').oninput = e => {
      state.search = e.target.value;
      renderTable();
    };
    document.getElementById('maxGrow').oninput = e => {
      state.maxGrow = Number(e.target.value) || 0;
      renderTable();
    };
    document.getElementById('seasonDays').oninput = e => {
      state.seasonDays = Math.max(1, Number(e.target.value) || 28);
      renderTable();
    };
    document.getElementById('plots').oninput = e => {
      state.plots = Math.max(1, Number(e.target.value) || 1);
      renderTable();
    };
    const fertilizerEl = document.getElementById('fertilizer');
    if (fertilizerEl) {
      fertilizerEl.onchange = e => {
        state.fertilizer = e.target.value;
        renderTable();
      };
    }
  }

  // --- Init ---
  loadFavorites();
  if (typeof renderNav === 'function') renderNav(processorsList, 'planner');
  renderSeasonChips();
  attachSortHandlers();
  initControls();
  renderTable();
}

async function initializeApp() {
  const statusEl = document.getElementById('dataStatus');
  const seasons = (window.sunlitData && window.sunlitData.seasons) || {
    Sp: 'Spring',
    Su: 'Summer',
    Au: 'Autumn',
    Wi: 'Winter'
  };
  const processorsList = (window.sunlitData && window.sunlitData.processorsList) || [];

  let cropsData = [];
  let sourceLabel = 'static';

  try {
    const apiEnabled = !window.sunlitData || window.sunlitData.apiEnabled !== false;
    if (apiEnabled && window.sunlitAPI && typeof window.sunlitAPI.getAllCrops === 'function') {
      const apiRows = await window.sunlitAPI.getAllCrops();
      if (Array.isArray(apiRows) && apiRows.length > 0) {
        cropsData = apiRows.map(crop => {
          const value = Number(crop.base_value) || 0;
          const growTime = Number(crop.grow_time) || 1;
          const avgYield = Number(crop.avg_yield) || 0;
          return {
            crop: crop.crop_name,
            seasons: crop.seasons,
            seedCost: Number(crop.seed_cost) || 0,
            value,
            growTime,
            avgYield,
            profitPerDay: growTime > 0 ? (value * avgYield) / growTime : 0,
          };
        });
        sourceLabel = 'API';
      }
    }
  } catch (err) {
    console.error('Failed to load API data:', err);
  }

  if (cropsData.length === 0) {
    const staticRows = (window.sunlitData && window.sunlitData.crops) || [];
    cropsData = Array.isArray(staticRows) ? staticRows : [];
    sourceLabel = cropsData.length ? 'Static Fallback' : 'No data available';
  }

  if (statusEl) {
    statusEl.textContent = `Data source: ${sourceLabel}`;
  }

  runApp(cropsData, processorsList, seasons);
}

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});