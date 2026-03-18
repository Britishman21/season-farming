window.siteUtils = (function() {
  const twoDpFormatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  function isNumber(v) {
    return typeof v === 'number' && !Number.isNaN(v);
  }
  function fmt(v) {
    if (!isNumber(v)) return '—';
    return twoDpFormatter.format(v);
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
