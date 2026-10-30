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
    const backdrop = document.querySelector('.workspace-backdrop svg');
    if (paused || reduced.matches || document.hidden) backdrop?.pauseAnimations?.();
    else backdrop?.unpauseAnimations?.();
    control?.setAttribute('aria-pressed', String(paused));
    document.dispatchEvent(new CustomEvent('linvell-motionchange', { detail: { paused } }));
    if (label) label.textContent = document.documentElement.lang === 'zh-CN' ? (paused ? '播放演示' : '暂停演示') : (paused ? 'Play tour' : 'Pause tour');
  };
  if (!paused && !reduced.matches) document.body.classList.add('motion-running');
  control?.addEventListener('click', () => {
    paused = !paused;
    document.body.classList.remove('motion-running');
    try { localStorage.setItem('linvell-motion-paused', String(paused)); } catch {}
    render();
  });
  document.addEventListener('linvell-tourpause', () => { paused = true; render(); });
  document.getElementById('language')?.addEventListener('click', render);
  document.addEventListener('visibilitychange', () => { document.body.classList.toggle('tab-hidden', document.hidden); render(); });
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

(() => {
  const tour = document.querySelector('.workspace-tour');
  const panel = document.getElementById('workspace-scene');
  if (!tour || !panel) return;
  const tabs = [...tour.querySelectorAll('[data-scene]')];
  const image = panel.querySelector('img'), link = panel.querySelector('a');
  const caption = panel.querySelector('.scene-caption'), rail = tour.querySelector('.scene-rail span');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let active = 0, request = 0, visible = false;
  function renderCaption() {
    if (caption) caption.textContent = document.documentElement.lang === 'zh-CN' ? caption.dataset.zh : caption.dataset.en;
  }
  async function show(index, animate = true) {
    const tab = tabs[index], token = ++request;
    tab.setAttribute('aria-busy', 'true');
    const next = new Image(); next.src = tab.dataset.image;
    try { await next.decode(); } catch { tab.removeAttribute('aria-busy'); return; }
    tab.removeAttribute('aria-busy');
    if (token !== request) return;
    active = index;
    tabs.forEach((item, i) => { item.setAttribute('aria-selected', String(i === index)); item.tabIndex = i === index ? 0 : -1; });
    panel.setAttribute('aria-labelledby', tab.id);
    rail.style.transform = `translateX(${index * 100}%)`;
    image.getAnimations().forEach(a => a.cancel());
    image.src = tab.dataset.image; image.alt = tab.dataset.alt; link.href = tab.dataset.image;
    caption.dataset.en = tab.dataset.captionEn; caption.dataset.zh = tab.dataset.captionZh;
    renderCaption();
    if (animate && !reduced.matches) image.animate([
      { opacity: .35, transform: 'translateX(12px)' },
      { opacity: 1, transform: 'translateX(0)' }
    ], { duration: 500, easing: 'cubic-bezier(.22,1,.36,1)' });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => { document.dispatchEvent(new Event('linvell-tourpause')); show(index); });
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault(); document.dispatchEvent(new Event('linvell-tourpause'));
      tabs[next].focus(); show(next, false);
    });
  });
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
  }, { threshold: .25 }).observe(panel);
  else visible = true;
  setInterval(() => {
    if (!visible || document.hidden || reduced.matches || document.body.classList.contains('motion-paused')) return;
    if (tour.matches(':hover') || panel.matches(':hover') || tour.contains(document.activeElement) || panel.contains(document.activeElement) || document.querySelector('dialog[open]')) return;
    show((active + 1) % tabs.length);
  }, 5500);
  document.getElementById('language')?.addEventListener('click', renderCaption);
})();
