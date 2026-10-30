const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const zlib = require('node:zlib');
const root = path.join(__dirname, '..');
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'plugins/catalog.json')));

test('official source entries identify HTTPS packages with matching SHA-256', () => {
  assert.equal(catalog.schemaVersion, 1);
  assert.equal(new Set(catalog.plugins.map(p => p.id)).size, catalog.plugins.length);
  for (const entry of catalog.plugins) {
    const url = new URL(entry.url);
    assert.equal(url.origin, 'https://linvell.fuluwa.top');
    const archive = fs.readFileSync(path.join(root, url.pathname));
    assert.equal(crypto.createHash('sha256').update(archive).digest('hex'), entry.sha256);
  }
});

test('example resource package matches the catalog and contains no executable', () => {
  for (const entry of catalog.plugins) {
    const zip = fs.readFileSync(path.join(root, new URL(entry.url).pathname));
    const end = zip.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
    let at = zip.readUInt32LE(end + 16);
    const manifests = [];
    for (let n = 0; n < zip.readUInt16LE(end + 10); n++) {
      assert.equal(zip.readUInt32LE(at), 0x02014b50);
      const size = zip.readUInt32LE(at + 20);
      const len = zip.readUInt16LE(at + 28);
      const name = zip.subarray(at + 46, at + 46 + len).toString();
      const local = zip.readUInt32LE(at + 42);
      const start = local + 30 + zip.readUInt16LE(local + 26) + zip.readUInt16LE(local + 28);
      if (name.endsWith('/plugin.json')) {
        const bytes = zip.subarray(start, start + size);
        const data = zip.readUInt16LE(at + 10) === 8 ? zlib.inflateRawSync(bytes) : bytes;
        manifests.push(JSON.parse(data));
      }
      at += 46 + len + zip.readUInt16LE(at + 30) + zip.readUInt16LE(at + 32);
    }
    assert.equal(manifests.length, 1);
    const manifest = manifests[0];
    assert.equal(manifest.id, entry.id);
    assert.equal(manifest.version, entry.version);
    assert.equal(manifest.executable, undefined);
    assert.deepEqual(manifest.commands, []);
    assert.ok(manifest.themes.length && manifest.icons.length && manifest.snippets.length);
  }
});
