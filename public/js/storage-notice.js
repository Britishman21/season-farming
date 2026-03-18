(function() {
  try {
    var style = document.createElement('style');
    style.textContent = `
      .storage-notice-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.55);
        z-index: 9998;
      }
      .storage-notice {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: min(860px, calc(100vw - 28px));
        background: var(--panel, #16241d);
        border: 1px solid var(--border, #263a2f);
        border-radius: 16px;
        padding: 24px 26px;
        font-family: 'Manrope', system-ui, -apple-system, sans-serif;
        font-size: 16px;
        color: var(--muted, #a4b3a7);
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 18px;
        z-index: 9999;
        box-shadow: 0 18px 44px rgba(0, 0, 0, 0.45);
      }
      .storage-notice-welcome {
        margin: 0;
        color: var(--accent-2, #5bd68d);
        font-size: 28px;
        line-height: 1.15;
        letter-spacing: 0.2px;
      }
      .storage-notice-text { line-height: 1.5; }
      .storage-notice-text strong { color: var(--text, #e8f1ea); }
      .storage-notice a,
      .storage-notice a:visited {
        color: #79f0b1;
        text-decoration: underline;
      }
      .storage-notice a:hover {
        color: #a9f8cd;
      }
      .storage-notice-body {
        display: grid;
        gap: 14px;
      }
      .storage-notice-meta {
        margin: 0;
        display: grid;
        gap: 8px;
        font-size: 14px;
        color: var(--text, #e8f1ea);
        padding: 10px 12px;
        border-radius: 10px;
        border: 1px solid var(--border, #263a2f);
        background: rgba(22, 36, 29, 0.65);
      }
      .storage-notice-support {
        font-size: 14px;
        color: var(--text, #e8f1ea);
        padding: 10px 12px;
        border-radius: 10px;
        border: 1px solid var(--border, #263a2f);
        background: rgba(22, 36, 29, 0.65);
      }
      .storage-notice-actions {
        display: flex;
        gap: 10px;
        justify-content: flex-end;
      }
      .storage-notice-dismiss {
        padding: 10px 16px;
        background: var(--accent-2, #5bd68d);
        color: #0d1a15;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        font-size: 15px;
        white-space: nowrap;
        transition: opacity 0.2s ease;
      }
      .storage-notice-dismiss:hover { opacity: 0.85; }
      .storage-notice-optout {
        padding: 10px 16px;
        background: transparent;
        color: var(--text, #e8f1ea);
        border: 1px solid var(--border, #263a2f);
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        font-size: 14px;
        white-space: nowrap;
      }
      .storage-notice-optout:hover {
        border-color: var(--accent-2, #5bd68d);
        color: var(--accent-2, #5bd68d);
      }
      @media (max-width: 720px) {
        .storage-notice {
          width: calc(100vw - 20px);
          padding: 16px;
          font-size: 14px;
        }
        .storage-notice-welcome {
          font-size: 22px;
        }
      }
    `;
    document.head.appendChild(style);

    var overlay = document.createElement('div');
    overlay.className = 'storage-notice-overlay';
    document.body.appendChild(overlay);

    var notice = document.createElement('div');
    var data = window.sunlitData || {};
    var creator = 'British_man21';
    var siteVersion = data.siteVersion ? ('v.' + data.siteVersion) : 'n/a';
    var modpackVersion = data.modpackVersion ? ('v.' + data.modpackVersion) : 'n/a';
    var modpackUrl = data.modpackUrl || '#';
    var githubUrl = data.githubUrl || '#';

    notice.className = 'storage-notice';
    notice.setAttribute('role', 'dialog');
    notice.setAttribute('aria-modal', 'true');
    notice.setAttribute('aria-label', 'Privacy notice');
    notice.innerHTML = `
      <h2 class="storage-notice-welcome">Welcome to Sunlit Valley</h2>
      <div class="storage-notice-body">
        <div class="storage-notice-text">
          <strong>Before you start:</strong> We save your favorite crops on this device and use an anonymous cookie ID to count unique daily and all-time visits for the community counter. We do not collect personal data, names, emails, or precise location. <a href="about.html#privacy-visits">Privacy details</a>
        </div>
        <div class="storage-notice-meta">
          <div><strong>Made by:</strong> ${creator}</div>
          <div><strong>Site build:</strong> ${siteVersion}</div>
          <div><strong>Based on modpack:</strong> <a href="${modpackUrl}" target="_blank" rel="noopener noreferrer">Society: Sunlit Valley ${modpackVersion}</a></div>
        </div>
        <div class="storage-notice-support">
          <strong>Support:</strong> Found a bug or data issue? Open an issue on <a href="${githubUrl}" target="_blank" rel="noopener noreferrer">GitHub</a> and include a screenshot so we can fix it faster.
        </div>
      </div>
      <div class="storage-notice-actions">
        <button class="storage-notice-optout" type="button">Opt out of visit counting</button>
        <button class="storage-notice-dismiss">Start planning</button>
      </div>
    `;

    document.body.appendChild(notice);

    var button = notice.querySelector('.storage-notice-dismiss');
    var optOutButton = notice.querySelector('.storage-notice-optout');

    function setCookie(name, value, maxAgeSeconds) {
      document.cookie = name + '=' + encodeURIComponent(value) + '; Path=/; Max-Age=' + maxAgeSeconds + '; SameSite=Lax';
    }

    function dismiss() {
      overlay.remove();
      notice.remove();
    }

    function optOutTracking() {
      // Persist opt-out and clear existing anonymous visitor id.
      setCookie('sv_optout', '1', 31536000);
      setCookie('sv_track', '0', 31536000);
      setCookie('sv_uid', '', 0);
      try {
        localStorage.setItem('sunlit-visit-optout', 'true');
      } catch (_) {
        // no-op
      }
      dismiss();
    }

    function enableTracking() {
      // Explicit consent to anonymous visit counting.
      setCookie('sv_optout', '0', 31536000);
      setCookie('sv_track', '1', 31536000);
      try {
        localStorage.setItem('sunlit-visit-optout', 'false');
      } catch (_) {
        // no-op
      }
      dismiss();
    }

    button.addEventListener('click', enableTracking);
    if (optOutButton) optOutButton.addEventListener('click', optOutTracking);
    overlay.addEventListener('click', dismiss);
  } catch (e) {
    // no-op
  }
})();
