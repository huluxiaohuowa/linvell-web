(() => {
  document.documentElement.classList.add('js');
  const button = document.querySelector('.menu-toggle');
  const close = () => {
    document.body.classList.remove('menu-open');
    button?.setAttribute('aria-expanded', 'false');
    button?.setAttribute('aria-label', document.documentElement.lang === 'zh-CN' ? '打开导航' : 'Open navigation');
  };
  button?.addEventListener('click', () => {
    const open = !document.body.classList.contains('menu-open');
    document.body.classList.toggle('menu-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', document.documentElement.lang === 'zh-CN' ? (open ? '关闭导航' : '打开导航') : (open ? 'Close navigation' : 'Open navigation'));
  });
  document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', close));
  document.addEventListener('keydown', event => {
    if (event.key === 'Tab' && document.body.classList.contains('menu-open')) {
      const controls = [button, ...document.querySelectorAll('nav a, nav button')];
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
 if (event.key === 'Escape' && document.body.classList.contains('menu-open')) { close(); button?.focus(); } });
  matchMedia('(min-width: 641px)').addEventListener('change', close);
})();
