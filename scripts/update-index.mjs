import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/pages/index.astro');
let content = fs.readFileSync(filePath, 'utf8');

// Update DB queries
content = content.replace(/not\(eq\(projectsLabs\.type, 'Blog'\)\)/g, "eq(projectsLabs.type, 'Project')");
content = content.replace(/eq\(projectsLabs\.type, 'Blog'\)/g, "eq(projectsLabs.type, 'Lab')");

// Rename variables
content = content.replace(/recentBlogs/g, 'recentLabs');
content = content.replace(/groupBlogsByMonth/g, 'groupLabsByMonth');
content = content.replace(/blogGroups/g, 'labGroups');

// Map loops variables
content = content.replace(/\(blogs: typeof recentLabs\)/g, "(labs: typeof recentLabs)");
content = content.replace(/blogs\.forEach\(blog =>/g, "labs.forEach(lab =>");
content = content.replace(/groups\[key\]\.push\(blog\);/g, "groups[key].push(lab);");

content = content.replace(/recentLabs\.map\(\(blog,/g, "recentLabs.map((lab,");
content = content.replace(/\{blog\./g, "{lab.");
content = content.replace(/blog\.id/g, "lab.id");
content = content.replace(/blog\.title/g, "lab.title");
content = content.replace(/blog\.tools/g, "lab.tools");

// Content updates
content = content.replace(/Blog Activity Timeline/g, "Labs Activity Timeline");
content = content.replace(/Technical Write-ups/g, "Engineering Labs");
content = content.replace(/write-up/g, "lab");
content = content.replace(/write-ups/g, "labs");

// Routes
content = content.replace(/href="\/blog"/g, 'href="/labs"');
content = content.replace(/href=\{`\/blog\/\$\{lab\.id\}`\}/g, 'href={`/labs/${lab.id}`}');

fs.writeFileSync(filePath, content, 'utf8');
console.log('index.astro updated');
