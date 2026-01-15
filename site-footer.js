(function() {
  try {
    var style = document.createElement('style');
    style.textContent = `
      .site-footer {
        max-width: 1100px;
        margin: 0 auto 32px;
        padding: 16px 20px;
        color: var(--muted, #a4b3a7);
        border-top: 1px solid var(--border, #263a2f);
        background: transparent;
        font-family: 'Manrope', system-ui, -apple-system, sans-serif;
        font-size: 13px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 12px;
      }
      .site-footer strong { color: var(--text, #e8f1ea); }
      .site-footer-versions { font-size: 12px; opacity: 0.9; }
      .site-footer-links { display: flex; gap: 12px; font-size: 12px; flex-wrap: wrap; }
      .site-footer-links a { color: inherit; text-decoration: none; border-bottom: 1px dotted var(--muted, #a4b3a7); }
      .site-footer-links a:hover { color: var(--accent-2, #5bd68d); border-bottom-color: var(--accent-2, #5bd68d); }
    `;
    document.head.appendChild(style);

    var versions = '';
    if (window.sunlitData && window.sunlitData.siteVersion && window.sunlitData.modpackVersion) {
      var modpackLink = window.sunlitData.modpackUrl 
        ? '<a href="' + window.sunlitData.modpackUrl + '" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none; border-bottom: 1px dotted; cursor: pointer;">Modpack v.' + window.sunlitData.modpackVersion + '</a>'
        : 'Modpack v.' + window.sunlitData.modpackVersion;
      versions = 'Site v.' + window.sunlitData.siteVersion + ' | ' + modpackLink;
    }
    
    var links = '';
    if (window.sunlitData) {
      var linkParts = [];
      if (window.sunlitData.dataLastUpdated) linkParts.push('Updated: ' + window.sunlitData.dataLastUpdated);
    
      if (linkParts.length > 0) links = '<div class="site-footer-links">' + linkParts.join(' | ') + '</div>';
    }
    
    var footer = document.createElement('div');
    footer.className = 'site-footer';
    footer.innerHTML = '<div>Made with care by <strong>British_man21</strong></div>' + links +
                       (versions ? '<div class="site-footer-versions">' + versions + '</div>' : '');
    document.body.appendChild(footer);
  } catch (e) {
    // no-op
  }
})();
