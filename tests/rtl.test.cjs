const assert = require('node:assert/strict');
const { readFileSync, readdirSync, existsSync } = require('node:fs');
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

function animateCounter(element) {
  const frames = [];
  vm.runInNewContext(readFileSync('themes/le-2025/assets/js/number-animation.js', 'utf8'), {
    document: { addEventListener: (_, fn) => fn(), getElementById: () => element },
    setTimeout: fn => fn(),
    performance: { now: () => 0 },
    requestAnimationFrame: fn => frames.push(fn),
  });
  return frames;
}

test('all translations and built locales preserve certificate counts through animation', () => {
  const translated = { cs: '700m', he: '700 מיליון', si: 'දශලක්‍ෂ 700', 'zh-cn': '7.0 亿' };
  for (const file of readdirSync('i18n').filter(file => file.endsWith('.toml'))) {
    const locale = file.slice(0, -5);
    const translation = readFileSync(`i18n/${file}`, 'utf8');
    const value = key => {
      const section = translation.split(`[${key}]`)[1];
      return section ? JSON.parse(section.match(/\nother = ("[^\n]*")/)[1]) : undefined;
    };
    const expected = translated[locale] || '700M';
    const dataset = {
      count: value('home_hero_certificate_count'),
      abbr: value('abbreviation_million'),
      format: value('certificate_count_format') || '[Number][Abbreviation]',
    };
    const display = dataset.format.replace('[Number]', dataset.count).replace('[Abbreviation]', dataset.abbr);
    assert.equal(display, expected, `${locale}: translation changed`);
    // Some translation catalogs do not yet have an enabled site language.
    if (existsSync(`config/_default/languages.${locale}.toml`)) {
      const html = readFileSync(`public/${locale === 'en' ? '' : locale + '/'}index.html`, 'utf8');
      const match = html.match(/<span id="certificate-count"([^>]*)>([^<]*)<\/span>/);
      assert.ok(match, `${locale}: missing counter`);
      assert.equal(match[2], expected, `${locale}: no-JavaScript text`);
      const builtData = Object.fromEntries([...match[1].matchAll(/data-(count|abbr|format)="([^"]*)"/g)].map(m => [m[1], m[2]]));
      assert.deepEqual(builtData, dataset, `${locale}: rendered animation data`);
    }
    const element = { textContent: display, dataset };
    const frames = animateCounter(element);
    assert.equal(frames.length, 1, `${locale}: animation did not start`);
    assert.notEqual(element.textContent, expected);
    frames.shift()(500);
    assert.ok(!element.textContent.includes('NaN'));
    assert.notEqual(element.textContent, expected);
    frames.shift()(1000);
    assert.equal(element.textContent, expected, `${locale}: final animated text`);
    assert.equal(frames.length, 0, `${locale}: animation did not stop`);
  }
});

test('counter animation preserves decimal precision, unit order and changed totals', () => {
  for (const [dataset, halfway, final] of [
    [{ count: '7.0', abbr: '亿', format: '[Number] [Abbreviation]' }, '1.8 亿', '7.0 亿'],
    [{ count: '700', abbr: 'දශලක්‍ෂ', format: '[Abbreviation] [Number]' }, 'දශලක්‍ෂ 175', 'දශලක්‍ෂ 700'],
    [{ count: '800', abbr: 'מיליון', format: '[Number] [Abbreviation]' }, '200 מיליון', '800 מיליון'],
    [{ count: '1.25', abbr: 'B', format: '[Number][Abbreviation]' }, '0.31B', '1.25B'],
  ]) {
    const element = { dataset, textContent: final };
    const frames = animateCounter(element);
    frames.shift()(500);
    assert.equal(element.textContent, halfway);
    frames.shift()(1500);
    assert.equal(element.textContent, final);
    assert.equal(frames.length, 0);
  }
});

test('invalid or absent counter data leaves the rendered text intact', () => {
  assert.equal(animateCounter(null).length, 0);
  for (const count of [undefined, '', '.', '7..0', '7.0.1', '700M', '-1', 'Infinity', '9'.repeat(400)]) {
    const element = { dataset: { count }, textContent: 'original translation' };
    assert.equal(animateCounter(element).length, 0);
    assert.equal(element.textContent, 'original translation');
  }
});
