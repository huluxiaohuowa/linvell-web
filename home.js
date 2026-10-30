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

(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const control = document.querySelector('.motion-toggle');
  const label = control?.querySelector('[data-motion-label]');
  let paused = false;
  try { paused = localStorage.getItem('linvell-motion-paused') === 'true'; } catch {}
  const render = () => {
    document.body.classList.toggle('motion-paused', paused);
    control?.setAttribute('aria-pressed', String(paused));
    if (label) label.textContent = document.documentElement.lang === 'zh-CN' ? (paused ? '播放动效' : '暂停动效') : (paused ? 'Play motion' : 'Pause motion');
  };
  if (!paused && !reduced.matches) document.body.classList.add('motion-running');
  control?.addEventListener('click', () => {
    paused = !paused;
    document.body.classList.remove('motion-running');
    try { localStorage.setItem('linvell-motion-paused', String(paused)); } catch {}
    render();
  });
  document.getElementById('language')?.addEventListener('click', render);
  document.addEventListener('visibilitychange', () => document.body.classList.toggle('tab-hidden', document.hidden));
  reduced.addEventListener('change', () => {
    if (reduced.matches) document.body.classList.remove('motion-running');
    render();
  });
  render();
  if ('IntersectionObserver' in window) {
    const reveals = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        reveals.unobserve(entry.target);
      }
    }, { threshold: .12, rootMargin: '0px 0px -24px 0px' });
    document.querySelectorAll('.section-head, .benefits article, .feature-list article, .detail, .terminal, .feature-shot, .plugin-layout, .faq > div, .download').forEach((element, index) => {
      element.setAttribute('data-reveal', '');
      if (element.matches('.benefits article, .feature-list article')) element.style.transitionDelay = `${index % 3 * 70}ms`;
      reveals.observe(element);
    });
  }

  // Native dialog keeps the actual screenshots large, with Escape and focus restoration.
  const dialog = document.createElement('dialog');
  dialog.className = 'image-viewer';
  dialog.setAttribute('aria-label', 'Linvell screenshot');
  const close = document.createElement('button');
  close.className = 'viewer-close'; close.type = 'button';
  const picture = document.createElement('img');
  dialog.append(close, picture); document.body.append(dialog);
  let opener;
  const restore = () => { opener?.focus({ preventScroll: true }); };
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', restore);
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  document.querySelectorAll('figure a[href$=".webp"]').forEach(link => link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || typeof dialog.showModal !== 'function') return;
    event.preventDefault(); opener = link;
    picture.src = link.href; picture.alt = link.querySelector('img')?.alt || 'Linvell screenshot';
    close.textContent = document.documentElement.lang === 'zh-CN' ? '关闭' : 'Close';
    dialog.showModal();
  }));
})();
