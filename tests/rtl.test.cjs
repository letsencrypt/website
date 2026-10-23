const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { test } = require('node:test');
const vm = require('node:vm');

// Exercise every chart builder without downloading data or starting a browser.
for (const hostname of ['localhost', 'preview.example.test']) {
test(`statistics charts resize and use the expected data path on ${hostname}`, async () => {
  const plots = [];
  const requests = [];
  const resizeHandlers = [];
  const relayouts = [];
  const elements = Object.fromEntries(['activeUsage', 'issuancePerDay', 'combinedTimeline', 'pageloadPercent'].map(id => [id, { id, clientWidth: 320 }]));
  elements['plot-translations'] = { dataset: {} };
  const context = {
    Plotly: { setPlotConfig() {}, newPlot(...args) { plots.push(args); }, relayout(...args) { relayouts.push(args); } },
    document: { readyState: 'complete', documentElement: { lang: 'he' }, getElementById: id => elements[id] },
    location: { hostname },
    fetch: async url => {
      requests.push(url);
      return { text: async () => url.endsWith('.tsv') ? '2026-10-01\t10\t20\t30\t40\n' : '' };
    },
    window: { addEventListener(event, handler) { assert.equal(event, "resize"); resizeHandlers.push(handler); } },
  };
  vm.runInNewContext(readFileSync('static/js/stats.js', 'utf8'), context);
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(plots.length, 4);
  const prefix = hostname === 'localhost' ? '/js/' : '/stats-data/';
  assert.deepEqual(requests, ['cert-daily-stats.tsv', 'current-https-adoption.csv', 'historical-https-adoption.csv'].map(file => prefix + file));
  for (const [element, , layout, config] of plots) {
    assert.equal(layout.legend.y, -0.15);
    assert.equal(layout.margin.b, 120);
    assert.equal(config?.responsive, true, `${element.id} must respond to viewport changes`);
  }
  for (const element of Object.values(elements)) element.clientWidth = 900;
  resizeHandlers.forEach(handler => handler());
  assert.equal(relayouts.length, 4);
  for (const [, layout] of relayouts) {
    assert.equal(layout.legend.y, 1);
    assert.equal(layout.margin.b, 80);
  }
});
}

test('built Hebrew and English pages use matching direction and arrows', () => {
  for (const [path, direction, arrow] of [
    ['public/he/index.html', 'rtl', '←'],
    ['public/index.html', 'ltr', '→'],
  ]) {
    const html = readFileSync(path, 'utf8');
    assert.match(html, new RegExp(`<html[^>]*dir="${direction}"`));
    assert.match(html, new RegExp(`annual-reports[^>]*>[\\s\\S]*?${arrow}[\\s\\S]*?</a>`));
  }
});

test('RTL configuration uses the current Hugo direction API', () => {
  assert.match(readFileSync('config/_default/languages.he.toml', 'utf8'), /^direction = "rtl"$/m);
  for (const file of ['sections/home-hero.html', 'components/accordion-item.html', 'components/hero-grid-item.html']) {
    assert.ok(!readFileSync(`themes/le-2025/layouts/partials/${file}`, 'utf8').includes('LanguageDirection'));
  }
});


test('English fallback content keeps its language and direction inside the Hebrew shell', () => {
  for (const path of ['repository', 'docs/cert-lifetimes', 'docs/profiles', 'docs/rate-limits', 'docs/why-all-https']) {
    const html = readFileSync(`public/he/${path}/index.html`, 'utf8');
    assert.match(html, /<html[^>]*dir="rtl"/);
    assert.match(html, /<div[^>]*class="[^"]*prose-content[^"]*"[^>]*dir="ltr"[^>]*lang="en-US"/);
    assert.match(html, /<h1[^>]*dir="ltr"[^>]*lang="en-US"/);
  }
  const translated = readFileSync('public/he/docs/account-id/index.html', 'utf8');
  assert.match(translated, /<div[^>]*class="[^"]*prose-content[^"]*"[^>]*dir="rtl"[^>]*lang="he"/);
});

test('the counter preserves translated text without changing translation formats', () => {
  const source = readFileSync('themes/le-2025/assets/js/number-animation.js', 'utf8');
  for (const text of ['700M', '700 מיליון', 'දශලක්‍ෂ 700', '7.0 亿', '800M']) {
    const element = { textContent: text };
    const frames = [];
    vm.runInNewContext(source, {
      document: { addEventListener: (_, fn) => fn(), getElementById: () => element },
      setTimeout: fn => fn(),
      performance: { now: () => 0 },
      requestAnimationFrame: fn => frames.push(fn),
    });
    if (text === '700M') {
      assert.equal(element.textContent, '0M');
      frames.shift()(1000);
    } else {
      assert.equal(frames.length, 0);
    }
    assert.equal(element.textContent, text);
  }
});
