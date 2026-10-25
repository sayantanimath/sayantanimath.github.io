// Light / dark / match-device switch for the moon button in the header.
(function () {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;
  var root = document.documentElement;
  var order = ['auto', 'light', 'dark'];
  var labels = {
    auto: 'Theme: match device (click to change)',
    light: 'Theme: light (click to change)',
    dark: 'Theme: dark (click to change)'
  };
  var icons = {
    auto: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/></svg>',
    light: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.5" fill="currentColor"/><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/></g></svg>',
    dark: '<svg viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" fill="currentColor"/></svg>'
  };

  function current() {
    var t = null;
    try { t = localStorage.getItem('theme'); } catch (e) {}
    return (t === 'light' || t === 'dark') ? t : 'auto';
  }
  function apply(mode) {
    if (mode === 'auto') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', mode);
    btn.innerHTML = icons[mode];
    btn.title = labels[mode];
    btn.setAttribute('aria-label', labels[mode]);
  }
  btn.addEventListener('click', function () {
    var next = order[(order.indexOf(current()) + 1) % order.length];
    try {
      if (next === 'auto') localStorage.removeItem('theme');
      else localStorage.setItem('theme', next);
    } catch (e) {}
    apply(next);
  });
  apply(current());
})();
