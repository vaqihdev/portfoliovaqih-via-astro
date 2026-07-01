import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as renderTemplate, E as maybeRenderHead, M as createComponent, O as addAttribute, b as renderComponent, v as renderScript, x as Fragment } from "./render_Q3oU-XgZ.mjs";
import "./compiler_DpBGOTbu.mjs";
import { a as projectsLabs, t as db } from "./db_CQw15ogo.mjs";
import { t as $$Navbar } from "./Navbar_CyTy8TxT.mjs";
import { t as $$BaseLayout } from "./BaseLayout_B7GJyHDI.mjs";
import { desc } from "drizzle-orm";
//#region src/pages/projects.astro
var projects_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Projects,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var $$Projects = createComponent(async ($$result, $$props, $$slots) => {
	let allProjects = [];
	try {
		allProjects = (await db.select().from(projectsLabs).orderBy(desc(projectsLabs.id))).filter((p) => p.type === "Project");
	} catch (error) {
		console.error("Database connection error:", error);
	}
	const cleanDescription = (text) => {
		if (!text) return { text: "" };
		let cleanText = text.replace(/<[^>]*>?/gm, "").replace(/[#*`_]/g, "");
		return { text: cleanText.substring(0, 150) + (cleanText.length > 150 ? "..." : "") };
	};
	const uniqueCategories = Array.from(new Set(allProjects.flatMap((project) => project.tools ? project.tools.split(",").map((t) => t.trim()) : []))).filter(Boolean).sort();
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Projects Vault | Developer Portfolio",
		"data-astro-cid-3rkrlumz": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Navbar", $$Navbar, { "data-astro-cid-3rkrlumz": true })}${maybeRenderHead($$result)}<main class="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-24 flex flex-col lg:flex-row gap-10 sm:gap-12 items-start" data-astro-cid-3rkrlumz><aside class="w-full lg:w-1/4 lg:sticky lg:top-24 flex flex-col gap-8 shrink-0" data-astro-cid-3rkrlumz><div data-astro-cid-3rkrlumz><h1 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3" data-astro-cid-3rkrlumz>Projects Vault</h1><p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed" data-astro-cid-3rkrlumz>A historical index of verified system architecture implementations, automation environments, and experimental nodes.</p></div><div class="flex flex-col gap-3" data-astro-cid-3rkrlumz><h3 class="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-widest font-mono border-b border-slate-200 dark:border-slate-800 pb-2" data-astro-cid-3rkrlumz>Browse by Category</h3><div class="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 hide-scrollbar" id="category-filters" data-astro-cid-3rkrlumz><button class="category-btn active whitespace-nowrap lg:whitespace-normal text-left px-3 py-2 text-sm font-medium rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 transition-colors" data-category="all" data-astro-cid-3rkrlumz>All Projects</button>${uniqueCategories.map((category) => renderTemplate`<button class="category-btn whitespace-nowrap lg:whitespace-normal text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"${addAttribute(category.toLowerCase(), "data-category")} data-astro-cid-3rkrlumz>${category}</button>`)}</div></div></aside><div class="w-full lg:w-3/4 flex flex-col min-h-[50vh]" data-astro-cid-3rkrlumz>${allProjects.length > 0 ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 gap-6" id="projects-grid" data-astro-cid-3rkrlumz>${allProjects.map((project) => {
		const projectCategories = project.tools ? project.tools.split(",").map((t) => t.trim().toLowerCase()) : [];
		const formattedDate = project.createdAt ? new Date(project.createdAt).toLocaleDateString("en-US", {
			month: "long",
			year: "numeric"
		}) : "Unknown Date";
		return renderTemplate`<div class="project-card group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col h-full"${addAttribute(projectCategories.join(","), "data-categories")} data-astro-cid-3rkrlumz><div class="p-6 flex flex-col flex-grow" data-astro-cid-3rkrlumz><div class="flex items-center gap-2 mb-3 flex-wrap" data-astro-cid-3rkrlumz>${(project.tools ? project.tools.split(",") : []).slice(0, 2).map((tag) => renderTemplate`<span class="text-[10px] font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-sm" data-astro-cid-3rkrlumz>${tag.trim()}</span>`)}</div><h2 class="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" data-astro-cid-3rkrlumz>${project.title}</h2><p class="text-sm text-slate-600 dark:text-slate-400 mb-5 line-clamp-3 leading-relaxed" data-astro-cid-3rkrlumz>${cleanDescription(project.description).text}</p><div class="mt-auto flex flex-col gap-3" data-astro-cid-3rkrlumz>${project.tools && renderTemplate`<div class="text-xs text-slate-500 font-mono flex items-start gap-2" data-astro-cid-3rkrlumz><span class="text-slate-400 uppercase tracking-widest text-[9px] mt-0.5" data-astro-cid-3rkrlumz>Stack</span><span class="flex-1 leading-relaxed text-slate-700 dark:text-slate-300" data-astro-cid-3rkrlumz>${project.tools}</span></div>`}<div class="flex items-center justify-between text-xs text-slate-500 font-mono border-t border-slate-100 dark:border-slate-800 pt-3 mt-1" data-astro-cid-3rkrlumz><div class="flex flex-col gap-1" data-astro-cid-3rkrlumz><span data-astro-cid-3rkrlumz>Status: <span class="text-slate-700 dark:text-slate-300 font-semibold" data-astro-cid-3rkrlumz>Public</span></span><span data-astro-cid-3rkrlumz>Completed: <span class="text-slate-700 dark:text-slate-300" data-astro-cid-3rkrlumz>${formattedDate}</span></span></div></div></div></div><a${addAttribute(`/projects/${project.id}`, "href")} class="block w-full border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-3 text-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-colors flex items-center justify-center gap-2" data-astro-cid-3rkrlumz>View Project <span data-astro-cid-3rkrlumz>&rarr;</span></a></div>`;
	})}</div><div id="empty-state" class="hidden text-center py-20 text-slate-500 font-mono text-sm border border-dashed border-slate-300 dark:border-slate-700 rounded-xl" data-astro-cid-3rkrlumz>No Projects available in this category yet.</div>` })}` : renderTemplate`<div class="text-center py-20 text-slate-500 font-mono text-sm border border-dashed border-slate-300 dark:border-slate-700 rounded-xl" data-astro-cid-3rkrlumz>Repository list is empty.</div>`}</div></main>` })}${renderScript($$result, "/home/vaqih/workspace/portfoliovaqih-via-astro/src/pages/projects.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/vaqih/workspace/portfoliovaqih-via-astro/src/pages/projects.astro", void 0);
var $$file = "/home/vaqih/workspace/portfoliovaqih-via-astro/src/pages/projects.astro";
var $$url = "/projects";
//#endregion
//#region \0virtual:astro:page:src/pages/projects@_@astro
var page = () => projects_exports;
//#endregion
export { page };
