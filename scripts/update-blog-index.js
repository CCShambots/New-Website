const fs = require('fs');
const path = require('path');

const MD_DIR = 'src/blog';           // folder with your markdown files
const HTML_FILE = 'src/blog.html';
const START = '<!-- BEGIN POST GENERATED CONTENT -->';
const END = '<!-- END POST GENERATED CONTENT -->';

const files = fs.readdirSync(MD_DIR)
  .filter(f => f.endsWith('.md'))
  .sort();

const items = files.map(f => {
  const title = f.replace(/\.md$/, '').replace(/[-_]/g, ' ');
  const href = path.join(MD_DIR, f);
  return `  <li><a href="${href}">${title}</a></li>`;
}).join('\n');

const html = fs.readFileSync(HTML_FILE, 'utf8');
const startIdx = html.indexOf(START) + START.length;
const endIdx = html.indexOf(END);

const newHtml =
  html.slice(0, startIdx) + '\n' + items + '\n' + html.slice(endIdx);

fs.writeFileSync(HTML_FILE, newHtml);
console.log(`Updated ${HTML_FILE} with ${files.length} entries.`);