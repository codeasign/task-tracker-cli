import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

/**
 * Converts a small, known subset of Markdown (headings, fenced code blocks,
 * paragraphs) into HTML. It only needs to handle this project's own README,
 * not Markdown in general.
 */
function markdownToHtml(markdown) {
  const lines = markdown.split('\n');
  const html = [];
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.startsWith('```')) {
      html.push(inCodeBlock ? '</pre>' : '<pre>');
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) {
      html.push(escapeHtml(line));
      continue;
    }
    if (line.startsWith('## ')) {
      html.push(`<h2>${escapeHtml(line.slice(3))}</h2>`);
    } else if (line.startsWith('# ')) {
      html.push(`<h1>${escapeHtml(line.slice(2))}</h1>`);
    } else if (line.trim() === '') {
      html.push('');
    } else {
      html.push(`<p>${escapeHtml(line)}</p>`);
    }
  }

  return html.join('\n');
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const readme = readFileSync('README.md', 'utf-8');
const body = markdownToHtml(readme);

const page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Task Tracker CLI</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 680px; margin: 3rem auto; padding: 0 1rem; line-height: 1.5; }
    pre { background: #f4f4f4; padding: 0.75rem; overflow-x: auto; }
  </style>
</head>
<body>
${body}
</body>
</html>
`;

mkdirSync('site', { recursive: true });
writeFileSync('site/index.html', page);
console.log('Wrote site/index.html');
