(function() {
  try {
    var style = document.createElement('style');
    style.textContent = [
      '.visit-banner {',
      '  margin: 0;',
      '  padding: 10px 14px;',
      '  border: 1px solid var(--border, #263a2f);',
      '  background: var(--card, #16241d);',
      '  border-radius: 10px;',
      '  color: var(--text, #e8f1ea);',
      '  font-family: \"Manrope\", system-ui, -apple-system, sans-serif;',
      '  font-size: 13px;',
      '  display: inline-flex;',
      '  gap: 14px;',
      '  align-items: center;',
      '}',
      '.visit-stat {',
      '  display: inline-flex;',
      '  gap: 6px;',
      '  align-items: baseline;',
      '}',
      '.visit-banner .label {',
      '  color: var(--muted, #a4b3a7);',
      '}',
      '.visit-banner .value {',
      '  font-weight: 700;',
      '}',
      '.visit-stat.primary {',
      '  padding: 4px 10px;',
      '  border-radius: 999px;',
      '  border: 1px solid var(--accent-2, #5bd68d);',
      '  background: rgba(91, 214, 141, 0.14);',
      '}',
      '.visit-stat.primary .label {',
      '  color: var(--text, #e8f1ea);',
      '  font-weight: 600;',
      '}',
      '.visit-stat.primary .value {',
      '  font-size: 17px;',
      '  line-height: 1;',
      '  color: var(--accent-2, #5bd68d);',
      '}',
      '.visit-banner-wrap {',
      '  margin: 0;',
      '}',
      '.visit-header-row {',
      '  display: flex;',
      '  align-items: flex-start;',
      '  justify-content: space-between;',
      '  gap: 14px;',
      '}',
      '.visit-header-row h1 {',
      '  margin: 0;',
      '}',
      '@media (max-width: 860px) {',
      '  .visit-header-row {',
      '    flex-direction: column;',
      '    align-items: flex-start;',
      '  }',
      '}',
    ].join('\n');
    document.head.appendChild(style);

    var shell = document.querySelector('.shell');
    if (!shell) return;

    var wrap = document.createElement('div');
    wrap.className = 'visit-banner-wrap';
    wrap.innerHTML = [
      '<div class="visit-banner" aria-live="polite">',
      '  <span class="visit-stat primary">',
      '    <span class="label">All-time:</span>',
      '    <span class="value" data-visits-all>--</span>',
      '  </span>',
      '  <span class="visit-stat">',
      '    <span class="label">Today:</span>',
      '    <span class="value" data-visits-daily>--</span>',
      '  </span>',
      '</div>'
    ].join('');

    var title = shell.querySelector('h1');
    if (title && title.parentElement === shell) {
      var row = document.createElement('div');
      row.className = 'visit-header-row';
      shell.insertBefore(row, title);
      row.appendChild(title);
      row.appendChild(wrap);
    } else {
      shell.insertBefore(wrap, shell.firstChild);
    }

    fetch('/api/visits')
      .then(function(res) { return res.ok ? res.json() : Promise.reject(new Error('HTTP ' + res.status)); })
      .then(function(json) {
        if (!json || !json.success || !json.data) return;
        var dailyEl = document.querySelector('[data-visits-daily]');
        var allEl = document.querySelector('[data-visits-all]');
        var dailyUnique = Number(json.data.dailyUnique ?? 0);
        var allTimeUnique = Number(json.data.allTimeUnique ?? 0);
        if (dailyEl) dailyEl.textContent = dailyUnique.toLocaleString();
        if (allEl) allEl.textContent = allTimeUnique.toLocaleString();
      })
      .catch(function() {
        var dailyEl = document.querySelector('[data-visits-daily]');
        var allEl = document.querySelector('[data-visits-all]');
        if (dailyEl) dailyEl.textContent = 'n/a';
        if (allEl) allEl.textContent = 'n/a';
      });
  } catch (e) {
    // no-op
  }
})();
