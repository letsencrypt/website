#!/usr/bin/env node

/**
 * Convert inline style attributes to Tailwind CSS utility classes.
 *
 * Usage:
 *   node scripts/convert-inline-styles.js [file...]
 *
 * If no files are given, scans content/en/documents/*.html for inline styles.
 *
 * Examples:
 *   node scripts/convert-inline-styles.js content/en/documents/ISRG-CPS-v2.9.html
 *   node scripts/convert-inline-styles.js content/en/documents/*.html
 */

const fs = require('fs');
const path = require('path');
const glob = require('path');

// Map of CSS property-value patterns to Tailwind classes.
// Each entry: [regex matching the style value, tailwind class]
const STYLE_MAP = [
  // font-family
  [/font-family:\s*(?:Menlo|Consolas|Monaco|"?Courier New"?|"?DejaVu Sans Mono"?|monospace)[^;]*/i, 'font-mono'],
  [/font-family:\s*(?:Arial|Helvetica|"?Helvetica Neue"?|sans-serif)[^;]*/i, 'font-sans'],
  [/font-family:\s*(?:Georgia|"?Times New Roman"?|Times|serif)[^;]*/i, 'font-serif'],

  // text-align
  [/text-align:\s*center/i, 'text-center'],
  [/text-align:\s*right/i, 'text-right'],
  [/text-align:\s*left/i, 'text-left'],

  // font-weight
  [/font-weight:\s*bold/i, 'font-bold'],
  [/font-weight:\s*normal/i, 'font-normal'],

  // font-style
  [/font-style:\s*italic/i, 'italic'],

  // text-decoration
  [/text-decoration:\s*none/i, 'no-underline'],
  [/text-decoration:\s*underline/i, 'underline'],
  [/text-decoration:\s*line-through/i, 'line-through'],

  // display
  [/display:\s*none/i, 'hidden'],
  [/display:\s*block/i, 'block'],
  [/display:\s*inline-block/i, 'inline-block'],
  [/display:\s*inline/i, 'inline'],
  [/display:\s*flex/i, 'flex'],

  // vertical-align
  [/vertical-align:\s*top/i, 'align-top'],
  [/vertical-align:\s*middle/i, 'align-middle'],
  [/vertical-align:\s*bottom/i, 'align-bottom'],

  // overflow
  [/overflow:\s*hidden/i, 'overflow-hidden'],
  [/overflow:\s*auto/i, 'overflow-auto'],
  [/overflow:\s*scroll/i, 'overflow-scroll'],

  // border
  [/border:\s*0\b/i, 'border-0'],
  [/border:\s*none/i, 'border-0'],

  // width/height 100%
  [/width:\s*100%/i, 'w-full'],
  [/height:\s*100%/i, 'h-full'],
];

// For values that need arbitrary Tailwind classes (e.g., color: red -> text-[red])
const ARBITRARY_MAP = [
  [/color:\s*([^;]+)/i, (match, value) => `text-[${value.trim()}]`],
  [/background-color:\s*([^;]+)/i, (match, value) => `bg-[${value.trim()}]`],
  [/margin:\s*([^;]+)/i, (match, value) => `m-[${value.trim()}]`],
  [/margin-top:\s*([^;]+)/i, (match, value) => `mt-[${value.trim()}]`],
  [/margin-bottom:\s*([^;]+)/i, (match, value) => `mb-[${value.trim()}]`],
  [/margin-left:\s*([^;]+)/i, (match, value) => `ml-[${value.trim()}]`],
  [/margin-right:\s*([^;]+)/i, (match, value) => `mr-[${value.trim()}]`],
  [/padding:\s*([^;]+)/i, (match, value) => `p-[${value.trim()}]`],
  [/padding-top:\s*([^;]+)/i, (match, value) => `pt-[${value.trim()}]`],
  [/padding-bottom:\s*([^;]+)/i, (match, value) => `pb-[${value.trim()}]`],
  [/padding-left:\s*([^;]+)/i, (match, value) => `pl-[${value.trim()}]`],
  [/padding-right:\s*([^;]+)/i, (match, value) => `pr-[${value.trim()}]`],
  [/font-size:\s*([^;]+)/i, (match, value) => `text-[${value.trim()}]`],
  [/min-width:\s*([^;]+)/i, (match, value) => `min-w-[${value.trim()}]`],
  [/max-width:\s*([^;]+)/i, (match, value) => `max-w-[${value.trim()}]`],
  [/min-height:\s*([^;]+)/i, (match, value) => `min-h-[${value.trim()}]`],
  [/max-height:\s*([^;]+)/i, (match, value) => `max-h-[${value.trim()}]`],
];

function styleToClasses(styleValue) {
  // Decode HTML entities
  const decoded = styleValue
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

  const classes = [];
  const unmatched = [];
  let remaining = decoded;

  // Try exact matches first
  for (const [regex, className] of STYLE_MAP) {
    if (regex.test(remaining)) {
      classes.push(className);
      remaining = remaining.replace(regex, '');
    }
  }

  // Try arbitrary value matches on what's left
  for (const [regex, fn] of ARBITRARY_MAP) {
    const match = remaining.match(regex);
    if (match) {
      classes.push(fn(match[0], match[1]));
      remaining = remaining.replace(regex, '');
    }
  }

  // Check for any unmatched properties
  const leftover = remaining.replace(/[;\s]/g, '').trim();
  if (leftover) {
    unmatched.push(leftover);
  }

  return { classes, unmatched };
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const replacements = [];
  const warnings = [];

  // Match style="..." attributes, handling HTML-encoded quotes
  const styleRegex = /(<[^>]*?)(\s+)style="([^"]*)"([^>]*>)/g;

  const newContent = content.replace(styleRegex, (fullMatch, before, space, styleValue, after, offset) => {
    const lineNum = content.substring(0, offset).split('\n').length;
    const { classes, unmatched } = styleToClasses(styleValue);

    if (classes.length === 0) {
      warnings.push({ lineNum, style: styleValue, reason: 'No matching Tailwind classes found' });
      return fullMatch;
    }

    if (unmatched.length > 0) {
      warnings.push({ lineNum, style: styleValue, unmatched, reason: 'Some properties could not be converted' });
    }

    const classStr = classes.join(' ');

    // Check if element already has a class attribute
    const existingClassMatch = (before + after).match(/class="([^"]*)"/);
    if (existingClassMatch) {
      // Merge into existing class attribute
      const merged = `${existingClassMatch[1]} ${classStr}`;
      const withMerged = (before + after).replace(/class="[^"]*"/, `class="${merged}"`);
      // Remove the style attribute (it's already excluded since we captured before/after without it)
      replacements.push({ lineNum, before: `style="${styleValue}"`, after: `class="${merged}"` });
      return before + space + after.replace(/class="[^"]*"/, `class="${merged}"`);
    }

    replacements.push({ lineNum, before: `style="${styleValue}"`, after: `class="${classStr}"` });
    return `${before}${space}class="${classStr}"${after}`;
  });

  return { newContent, replacements, warnings, changed: content !== newContent };
}

// --- Main ---

let files = process.argv.slice(2);

if (files.length === 0) {
  // Default: scan CPS documents
  const docsDir = path.join(process.cwd(), 'content', 'en', 'documents');
  if (fs.existsSync(docsDir)) {
    files = fs.readdirSync(docsDir)
      .filter(f => f.endsWith('.html'))
      .map(f => path.join(docsDir, f));
  }

  if (files.length === 0) {
    console.log('No HTML files found in content/en/documents/');
    console.log('Usage: node scripts/convert-inline-styles.js [file...]');
    process.exit(1);
  }
}

let totalReplacements = 0;
let totalWarnings = 0;

for (const file of files) {
  if (!fs.existsSync(file)) {
    console.error(`File not found: ${file}`);
    continue;
  }

  console.log(`\nProcessing: ${file}`);
  const { newContent, replacements, warnings, changed } = processFile(file);

  if (replacements.length === 0 && warnings.length === 0) {
    console.log('  No inline styles found.');
    continue;
  }

  for (const r of replacements) {
    console.log(`  Line ${r.lineNum}:`);
    console.log(`    - ${r.before}`);
    console.log(`    + ${r.after}`);
  }

  for (const w of warnings) {
    console.log(`  WARNING Line ${w.lineNum}: ${w.reason}`);
    console.log(`    style="${w.style}"`);
    if (w.unmatched) {
      console.log(`    Unmatched: ${w.unmatched.join(', ')}`);
    }
  }

  if (changed) {
    fs.writeFileSync(file, newContent, 'utf-8');
    console.log(`  File updated.`);
  }

  totalReplacements += replacements.length;
  totalWarnings += warnings.length;
}

console.log(`\nDone. ${totalReplacements} replacement(s), ${totalWarnings} warning(s).`);

// Verify no inline styles remain
let remaining = 0;
for (const file of files) {
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf-8');
  const matches = content.match(/style="/g);
  if (matches) {
    remaining += matches.length;
    console.log(`  ${file}: ${matches.length} inline style(s) remaining`);
  }
}

if (remaining === 0) {
  console.log('All inline styles converted successfully.');
} else {
  console.log(`${remaining} inline style(s) still need manual attention.`);
  process.exit(1);
}
