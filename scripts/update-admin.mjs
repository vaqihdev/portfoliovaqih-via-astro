import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/pages/admin/index.astro');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove Blog Manager button
content = content.replace(
  /<button class="w-full text-left px-3 py-2 text-xs font-medium rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all cursor-pointer" data-tab="blogs">Blog Manager<\/button>\n/g,
  ''
);

// 2. Change hidden input to select for Project Matrix
content = content.replace(
  /<input type="hidden" name="type" id="form-type" value="Project" \/>/g,
  `<select name="type" id="form-type" class="w-full px-3 py-2 border border-slate-200 bg-slate-50/50 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500" required>
                    <option value="Project">Project</option>
                    <option value="Lab">Lab</option>
                  </select>`
);

// 3. Update filter to show Project and Lab
content = content.replace(
  /projects\.filter\(p => p\.type && p\.type\.toLowerCase\(\) === 'project'\)\.map/g,
  `projects.filter(p => p.type && (p.type.toLowerCase() === 'project' || p.type.toLowerCase() === 'lab')).map`
);

// 4. Update the tag color logic
content = content.replace(
  /proj\.type === 'Project' \? 'bg-blue-50 text-blue-600 border border-blue-100\/60' : 'bg-purple-50 text-purple-600 border border-purple-100\/60'/g,
  `proj.type === 'Project' ? 'bg-blue-50 text-blue-600 border border-blue-100/60' : 'bg-orange-50 text-orange-600 border border-orange-100/60'`
);

// 5. Remove #panel-blogs section completely
const panelBlogsStart = content.indexOf('<div id="panel-blogs"');
const panelLogsStart = content.indexOf('<div id="panel-logs"');
if (panelBlogsStart !== -1 && panelLogsStart !== -1) {
  content = content.slice(0, panelBlogsStart) + content.slice(panelLogsStart);
}

// 6. Update JS tabs array
content = content.replace(
  /\['panel-landing', 'panel-projects', 'panel-blogs', 'panel-logs', 'panel-career'\]/g,
  `['panel-landing', 'panel-projects', 'panel-logs', 'panel-career']`
);

// 7. Remove blogs JS logic
const blogsJsStart = content.indexOf('const dropzoneBlogs = document.getElementById');
const blogsJsEnd = content.indexOf("const careerForm = document.getElementById('career-form');");
if (blogsJsStart !== -1 && blogsJsEnd !== -1) {
  content = content.slice(0, blogsJsStart) + content.slice(blogsJsEnd);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Admin CMS updated successfully');
