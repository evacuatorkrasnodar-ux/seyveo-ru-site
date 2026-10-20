(() => {
  const root = document.documentElement;
  try {
    const saved = localStorage.getItem('seyveo-site-theme');
    if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;
  } catch {}
  const sync = () => document.querySelectorAll('[data-theme-toggle]').forEach(b => {
    const light = root.dataset.theme === 'light';
    b.setAttribute('aria-label',light ? (b.dataset.darkLabel || 'Тёмная тема') : (b.dataset.lightLabel || 'Светлая тема'));
    b.setAttribute('title', b.getAttribute('aria-label'));
  });
  sync();
  document.querySelectorAll('[data-theme-toggle]').forEach(b => b.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try {localStorage.setItem('seyveo-site-theme', root.dataset.theme)} catch {}
    sync();
  }));
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  if (toggle && menu) {
    const close = () => {toggle.setAttribute('aria-expanded','false');menu.setAttribute('aria-hidden','true');};
    toggle.addEventListener('click',() => {
      const open=toggle.getAttribute('aria-expanded')!=='true';
      toggle.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-hidden',String(!open));
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click',close));
    document.addEventListener('keydown',e => {if(e.key==='Escape')close();});
  }
})();