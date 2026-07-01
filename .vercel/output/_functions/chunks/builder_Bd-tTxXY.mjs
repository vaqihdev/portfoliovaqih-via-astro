import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as renderTemplate, D as renderHead, M as createComponent, b as renderComponent } from "./render_Q3oU-XgZ.mjs";
import "./compiler_DpBGOTbu.mjs";
/* empty css                 */
//#region src/pages/admin/builder.astro
var builder_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Builder,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var $$Builder = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>ATS Resume Builder</title>${renderHead($$result)}</head><body class="bg-slate-50 antialiased selection:bg-blue-500/20 m-0 p-0 overflow-hidden">${renderComponent($$result, "ResumeBuilderApp", null, {
		"client:only": "react",
		"client:component-hydration": "only",
		"client:component-path": "/home/vaqih/workspace/portfoliovaqih-via-astro/src/components/resume-builder/ResumeBuilderApp",
		"client:component-export": "default"
	})}</body></html>`;
}, "/home/vaqih/workspace/portfoliovaqih-via-astro/src/pages/admin/builder.astro", void 0);
var $$file = "/home/vaqih/workspace/portfoliovaqih-via-astro/src/pages/admin/builder.astro";
var $$url = "/admin/builder";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/builder@_@astro
var page = () => builder_exports;
//#endregion
export { page };
