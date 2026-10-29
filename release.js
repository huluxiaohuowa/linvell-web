// Release metadata is resolved at runtime; publishing an app needs no website deployment.
const LINVELL_LATEST = 'https://github.com/huluxiaohuowa/Linvell/releases/latest';
function parseLinvellRelease(value) {
  if (!value || value.draft || value.prerelease || !/^v\d+\.\d+\.\d+$/.test(value.tag_name)) return null;
  const version = value.tag_name.slice(1);
  const name = `Linvell-${version}-universal.dmg`;
  const expected = `https://github.com/huluxiaohuowa/Linvell/releases/download/${value.tag_name}/${name}`;
  const asset = value.assets?.find(item => item.name === name && item.browser_download_url === expected);
  return asset ? { version, download: expected, notes: `https://github.com/huluxiaohuowa/Linvell/releases/tag/${value.tag_name}` } : null;
}
function startLinvellReleaseSync(getLanguage) {
  let release = null, pending = false, lastAttempt = 0;
  function render() {
    const zh = getLanguage() === 'zh';
    document.querySelectorAll('[data-release="availability"]').forEach(node => {
      node.textContent = `${release?.version || (zh ? '最新正式版' : 'Latest release')} · ${zh ? 'macOS 15.6 及以上' : 'macOS 15.6+'}`;
    });
    document.querySelectorAll('[data-release="announcement"]').forEach(node => {
      node.textContent = release ? (zh ? `签名版本 ${release.version} 已在 GitHub Releases 提供下载。` : `Signed version ${release.version} is available from GitHub Releases.`) : (zh ? '从 GitHub Releases 获取最新正式版。' : 'Get the latest stable version from GitHub Releases.');
    });
    document.querySelectorAll('[data-release="download"]').forEach(node => { node.href = release?.download || LINVELL_LATEST; });
    document.querySelectorAll('[data-release="notes"]').forEach(node => { node.href = release?.notes || LINVELL_LATEST; });
  }
  async function refresh() {
    if (pending || Date.now() - lastAttempt < 60000) return;
    pending = true; lastAttempt = Date.now();
    try {
      const response = await fetch('https://api.github.com/repos/huluxiaohuowa/Linvell/releases/latest', { headers: { Accept: 'application/vnd.github+json' }, cache: 'no-cache', signal: AbortSignal.timeout(8000) });
      if (!response.ok) return;
      const latest = parseLinvellRelease(await response.json());
      if (latest) { release = latest; render(); }
    } catch { /* The stable latest-release link remains usable offline or when rate limited. */ }
    finally { pending = false; }
  }
  render(); refresh();
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
  setInterval(() => { if (!document.hidden) refresh(); }, 300000);
  return { render };
}
if (typeof module !== 'undefined') module.exports = { parseLinvellRelease, startLinvellReleaseSync };
