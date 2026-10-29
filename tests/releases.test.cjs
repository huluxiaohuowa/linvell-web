const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const {parseLinvellRelease} = require('../release.js');
const latest = {tag_name:'v0.1.6', assets:[{name:'Linvell-0.1.6-universal.dmg',browser_download_url:'https://github.com/huluxiaohuowa/Linvell/releases/download/v0.1.6/Linvell-0.1.6-universal.dmg'}]};
test('only stable releases with the expected GitHub DMG are accepted', () => {
  assert.equal(parseLinvellRelease(latest).version,'0.1.6');
  for (const bad of [{...latest,prerelease:true},{...latest,draft:true},{...latest,tag_name:'v0.1.7-preview.1'},{...latest,assets:[]},{...latest,assets:[{...latest.assets[0],browser_download_url:'https://example.invalid/app.dmg'}]}]) assert.equal(parseLinvellRelease(bad),null);
});
function page(fetch) {
  const nodes = Object.fromEntries(['availability','announcement','download','notes'].map(k=>[k,{}]));
  const context = vm.createContext({fetch,AbortSignal,Date,setInterval:()=>0,document:{hidden:false,addEventListener(){},querySelectorAll(selector){return [nodes[selector.match(/"(.*?)"/)[1]]];}}});
  vm.runInContext(fs.readFileSync(require.resolve('../release.js'),'utf8'),context);
  return {nodes,start:context.startLinvellReleaseSync};
}
test('runtime metadata and links survive language switching', async () => {
  const {nodes,start}=page(async()=>({ok:true,json:async()=>latest}));
  let language='zh'; const sync=start(()=>language);
  await new Promise(setImmediate);
  assert.match(nodes.availability.textContent,/0\.1\.6.*及以上/);
  assert.equal(nodes.download.href,latest.assets[0].browser_download_url);
  language='en';sync.render();
  assert.equal(nodes.availability.textContent,'0.1.6 · macOS 15.6+');
  assert.match(nodes.notes.href,/releases\/tag\/v0\.1\.6$/);
});
test('API errors keep the latest-release fallback, never a fixed old version', async () => {
  const {nodes,start}=page(async()=>{throw new Error('offline');});
  start(()=>'en'); await new Promise(setImmediate);
  assert.equal(nodes.download.href,'https://github.com/huluxiaohuowa/Linvell/releases/latest');
  assert.equal(nodes.notes.href,nodes.download.href);
  assert.match(nodes.availability.textContent,/Latest release/);
});
