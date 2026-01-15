window.siteUtils = (function() {
  function isNumber(v) {
    return typeof v === 'number' && !Number.isNaN(v);
  }
  function fmt(v) {
    if (!isNumber(v)) return '—';
    const n = Number(v).toFixed(2).replace(/\.00$/, '');
    return n.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  function renderNav(processorsList, activeId) {
    const nav = document.getElementById('nav');
    if (!nav) return;
    nav.innerHTML = processorsList.map(item => {
      const active = item.id === activeId ? 'active' : '';
      return `<a class="${active}" href="${item.href}">${item.label}</a>`;
    }).join('');
  }
  return { isNumber, fmt, renderNav };
})();
