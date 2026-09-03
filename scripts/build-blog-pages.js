// Build script to convert markdown files in src/blog to HTML files in blog directory
const fs = require('fs');
const path = require('path');
const marked = require('marked');

const MD_DIR = 'src/blog';
const BLOG_DIR = 'blog';

// Ensure the blog directory exists
if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR);
}

// Function to parse front matter from markdown content
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

// Read all markdown files in the MD_DIR
const files = fs.readdirSync(MD_DIR).filter(f => f.endsWith('.md'));

// Convert each markdown file to HTML
files.forEach(f => {
    const filePath = path.join(MD_DIR, f);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const metadata = parseFrontMatter(fileContent);
    const title = metadata.title || f.replace(/\.md$/, '').replace(/[-_]/g, ' ');
    const htmlContent = marked(fileContent.replace(/^---[\s\S]*?---/, '')); // Remove front matter before converting
    const htmlFileName = f.replace(/\.md$/, '.html');
    const htmlFilePath = path.join(BLOG_DIR, htmlFileName);
    const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
        </head>
        <body>
            <header>
                <h1>${title}</h1>
            </header>
            <main>
                ${htmlContent}
            </main>
        </body>
        </html>`;
    fs.writeFileSync(htmlFilePath, html);
    console.log(`Converted ${f} to ${htmlFileName}`);
});