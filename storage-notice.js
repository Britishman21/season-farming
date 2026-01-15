(function() {
  try {
    // Check if user has already dismissed the notice
    const dismissed = sessionStorage.getItem('sunlit-storage-notice-dismissed');
    if (dismissed) return;

    var style = document.createElement('style');
    style.textContent = `
      .storage-notice {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: var(--panel, #16241d);
        border-top: 1px solid var(--border, #263a2f);
        padding: 12px 20px;
        font-family: 'Manrope', system-ui, -apple-system, sans-serif;
        font-size: 13px;
        color: var(--muted, #a4b3a7);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        z-index: 9999;
        box-shadow: 0 -2px 10px rgba(0,0,0,0.2);
      }
      .storage-notice-text { flex: 1; }
      .storage-notice-text strong { color: var(--text, #e8f1ea); }
      .storage-notice-dismiss {
        padding: 6px 12px;
        background: var(--accent-2, #5bd68d);
        color: #0d1a15;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        font-size: 12px;
        white-space: nowrap;
        transition: opacity 0.2s ease;
      }
      .storage-notice-dismiss:hover { opacity: 0.85; }
      @media (max-width: 720px) {
        .storage-notice {
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
        }
        .storage-notice-dismiss { align-self: flex-end; }
      }
    `;
    document.head.appendChild(style);

    var notice = document.createElement('div');
    notice.className = 'storage-notice';
    notice.innerHTML = `
      <div class="storage-notice-text">
        <strong>Local Storage Notice:</strong> This site uses browser storage to save your favorite crops. No tracking or analytics.
      </div>
      <button class="storage-notice-dismiss">Got it</button>
    `;

    document.body.appendChild(notice);

    var button = notice.querySelector('.storage-notice-dismiss');
    function dismiss() {
      sessionStorage.setItem('sunlit-storage-notice-dismissed', 'true');
      notice.remove();
    }

    button.addEventListener('click', dismiss);

    // Auto-dismiss after 8 seconds
    setTimeout(dismiss, 8000);
  } catch (e) {
    // no-op
  }
})();
