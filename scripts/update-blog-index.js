// Build script to update the blog index in blog.html based on the markdown files in src/blog
const fs = require('fs');
const path = require('path');

const MD_DIR = 'src/blog';
const BLOG_DIR = 'blog';
const HTML_FILE = 'src/blog.html';
const START = '<!-- BEGIN POST GENERATED CONTENT -->';
const END = '<!-- END POST GENERATED CONTENT -->';

function parseFrontMatter(fileContent) {
    const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return {};

    const frontMatterText = match[1];
    const metadata = {};

    frontMatterText.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
            // Trim spaces and quotes
            metadata[key.trim()] = valueParts.join(':').trim().replace(/^['"]|['"]$/g, '');
        }
    });

    return metadata;
}

const files = fs.readdirSync(MD_DIR)
    .filter(f => f.endsWith('.md'))
    .sort();

const items = files.map(f => {
    const filePath = path.join(MD_DIR, f);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const metadata = parseFrontMatter(fileContent);

    const title = metadata.title || f.replace(/\.md$/, '').replace(/[-_]/g, ' ');
    const data = metadata.date ? new Date(metadata.date) : new Date();
    const tags = metadata.tags ? metadata.tags.split(',').map(tag => tag.trim()) : [];
    const excerpt = metadata.excerpt || '';
    const href = path.join(BLOG_DIR, f.replace(/\.md$/, '.html'));
    return `  <div class="blog-post" data-tags="${tags.join(',')}">
    <h2><a href="${href}">${title}</a></h2>
    <p class="blog-post-meta">${data.toDateString()}</p>
    <p>${excerpt}</p>
  </div>`;
}).join('\n');

const html = fs.readFileSync(HTML_FILE, 'utf8');
const startIdx = html.indexOf(START) + START.length;
const endIdx = html.indexOf(END);

const newHtml =
    html.slice(0, startIdx) + '\n' + items + '\n' + html.slice(endIdx);

fs.writeFileSync(HTML_FILE, newHtml);
console.log(`Updated ${HTML_FILE} with ${files.length} entries.`);