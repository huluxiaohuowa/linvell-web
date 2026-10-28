(() => {
  const toggle = document.getElementById('language');
  const motionToggle = document.getElementById('motion-toggle');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let effectsPaused = reducedMotion.matches;
  function applyEffects() {
    document.body.classList.toggle('effects-paused', effectsPaused);
    document.body.classList.toggle('effects-enabled', !effectsPaused);
    if (motionToggle) {
      motionToggle.textContent = language === 'zh' ? (effectsPaused ? '开启光效' : '暂停光效') : (effectsPaused ? 'Play light effects' : 'Pause light effects');
      motionToggle.setAttribute('aria-pressed', String(!effectsPaused));
    }
  }
  motionToggle?.addEventListener('click', () => { effectsPaused = !effectsPaused; applyEffects(); });
  reducedMotion.addEventListener('change', () => { effectsPaused = reducedMotion.matches; applyEffects(); });
  let language = new URLSearchParams(location.search).get('lang') === 'zh' ? 'zh' : 'en';
  try { if (!location.search) language = localStorage.getItem('linvell-language') || 'en'; } catch {}
  let observer;
  function prepareMotion() {
    observer?.disconnect();
    if (!document.body.classList.contains('home')) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const tagline = document.querySelector('.tagline');
    const text = tagline?.querySelector('p');
    if (text) {
      // Keep translated line breaks and native text, with no raster text layers.
      [...text.childNodes].forEach(node => {
        if (node.nodeType !== Node.TEXT_NODE) return;
        const fragment = document.createDocumentFragment();
        const words = language === 'zh' ? [...node.textContent] : node.textContent.split(/(\s+)/);
        words.forEach(word => {
          if (!word.trim()) { fragment.append(document.createTextNode(word)); return; }
          const span = document.createElement('span');
          span.className = 'word'; span.textContent = word;
          fragment.append(span);
        });
        node.replaceWith(fragment);
      });
      tagline.classList.add('is-observed');
    }
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const target = entry.target;
        if (target.classList.contains('word')) {
          const index = [...tagline.querySelectorAll('.word')].indexOf(target);
          target.style.transitionDelay = `${index * 60}ms`;
        }
        target.classList.add('is-visible'); observer.unobserve(target);
      });
    }, { threshold: .3, rootMargin: '0px 0px -8% 0px' });
    tagline?.querySelectorAll('.word').forEach(word => observer.observe(word));
  }
  function apply() {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-en][data-zh]').forEach(node => { node.innerHTML = node.dataset[language]; });
    if (toggle) { toggle.textContent = language === 'zh' ? 'EN' : '中文'; toggle.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换至中文'); }
    prepareMotion();
    applyEffects();
  }
  toggle?.addEventListener('click', () => { language = language === 'en' ? 'zh' : 'en'; try { localStorage.setItem('linvell-language', language); } catch {} apply(); });
  if (document.body.classList.contains('home')) document.body.classList.add('motion-ready');
  apply();
})();
