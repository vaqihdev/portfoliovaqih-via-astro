import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as renderTemplate, E as maybeRenderHead, M as createComponent, O as addAttribute, b as renderComponent, j as createAstro, k as unescapeHTML } from "./render_Q3oU-XgZ.mjs";
import "./compiler_DpBGOTbu.mjs";
import { a as projectsLabs, t as db } from "./db_CQw15ogo.mjs";
import { t as $$Navbar } from "./Navbar_CyTy8TxT.mjs";
import { t as $$Layout } from "./Layout_wNGPjt67.mjs";
import { and, eq } from "drizzle-orm";
import { marked } from "marked";
//#region src/pages/labs/[id].astro
var _id__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Id,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Id = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Id;
	const { id } = Astro.params;
	let lab = null;
	try {
		const result = await db.select().from(projectsLabs).where(and(eq(projectsLabs.id, Number(id)), eq(projectsLabs.type, "Lab"))).limit(1);
		if (result.length > 0) lab = result[0];
	} catch (e) {
		console.error("Error fetching lab:", e);
	}
	if (!lab) return Astro.redirect("/404");
	const htmlContent = marked.parse(lab.description);
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${lab.title} | Engineering Labs` }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Navbar", $$Navbar, {})}${maybeRenderHead($$result)}<main class="w-full max-w-4xl mx-auto px-6 py-24 flex flex-col gap-10 min-h-[80vh] relative z-10"><div class="flex items-center gap-2 text-sm text-slate-500 mb-2 font-mono"><a href="/labs" class="hover:text-blue-600 hover:underline">Labs</a><span>/</span><span class="text-slate-900 font-semibold">${lab.title}</span></div><div class="bg-white border border-slate-300 rounded-lg shadow-sm overflow-hidden"><div class="border-b border-slate-200 bg-slate-50 px-8 py-6"><div class="flex items-center justify-between mb-4"><span${addAttribute(`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider ${lab.type === "Project" ? "bg-blue-50 text-blue-600 border border-blue-100/50" : "bg-orange-50 text-orange-600 border border-orange-100/50"}`, "class")}>${lab.type}</span><span class="text-[10px] text-slate-400 font-mono tracking-widest uppercase">NODE_#${lab.id}</span></div><h1 class="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">${lab.title}</h1><div class="flex flex-wrap gap-2">${lab.tools.split(",").map((tool) => renderTemplate`<span class="px-2.5 py-1 bg-white border border-slate-200 text-slate-600 font-mono text-[10px] rounded-md shadow-sm">${tool.trim()}</span>`)}</div></div><div class="p-8 prose prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-img:rounded-lg prose-img:border prose-img:border-slate-200 prose-img:shadow-sm">${unescapeHTML(htmlContent)}</div></div></main>` })}`;
}, "/home/vaqih/workspace/portfoliovaqih-via-astro/src/pages/labs/[id].astro", void 0);
var $$file = "/home/vaqih/workspace/portfoliovaqih-via-astro/src/pages/labs/[id].astro";
var $$url = "/labs/[id]";
//#endregion
//#region \0virtual:astro:page:src/pages/labs/[id]@_@astro
var page = () => _id__exports;
//#endregion
export { page };
