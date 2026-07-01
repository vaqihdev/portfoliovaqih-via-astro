import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/pages/labs.astro');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/publishedBlogs/g, 'publishedLabs');
content = content.replace(/p\.type === 'Blog'/g, "p.type === 'Lab'");
content = content.replace(/Blog \| Developer Portfolio/g, "Labs | Developer Portfolio");
content = content.replace(/publishedLabs\.map\(blog =>/g, "publishedLabs.map(lab =>");
content = content.replace(/blog\./g, "lab.");
content = content.replace(/href=\{`\/blog\/\$\{lab\.id\}`\}/g, "href={`/labs/${lab.id}`}");
content = content.replace(/No published blogs found/g, "No published labs found");

fs.writeFileSync(filePath, content, 'utf8');
console.log('labs.astro updated');
