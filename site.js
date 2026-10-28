(() => {
  const toggle = document.getElementById('language');
  let language = new URLSearchParams(location.search).get('lang') === 'zh' ? 'zh' : 'en';
  try { if (!location.search) language = localStorage.getItem('linvell-language') || 'en'; } catch {}
  function apply() {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-en][data-zh]').forEach(node => { node.innerHTML = node.dataset[language]; });
    if (toggle) { toggle.textContent = language === 'zh' ? 'EN' : '中文'; toggle.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换至中文'); }
  }
  toggle?.addEventListener('click', () => { language = language === 'en' ? 'zh' : 'en'; try { localStorage.setItem('linvell-language', language); } catch {} apply(); });
  apply();
})();
