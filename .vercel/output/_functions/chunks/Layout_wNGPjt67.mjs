import { C as renderTemplate, D as renderHead, M as createComponent, O as addAttribute, S as renderSlot, b as renderComponent, j as createAstro } from "./render_Q3oU-XgZ.mjs";
import "./compiler_DpBGOTbu.mjs";
/* empty css                 */
import { n as $$LoadingScreen, r as $$Footer } from "./Navbar_CyTy8TxT.mjs";
//#region src/layouts/Layout.astro
createAstro("https://astro.build");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const { title } = Astro.props;
	return renderTemplate`<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><meta name="generator"${addAttribute(Astro.generator, "content")}><title>${title || "Portfolio"}</title>${renderHead($$result)}</head><body class="bg-slate-50 text-slate-800 antialiased selection:bg-blue-500/10 min-h-screen flex flex-col">${renderComponent($$result, "LoadingScreen", $$LoadingScreen, {})}<div class="flex-1">${renderSlot($$result, $$slots["default"])}</div>${renderComponent($$result, "Footer", $$Footer, {})}</body></html>`;
}, "/home/vaqih/workspace/portfoliovaqih-via-astro/src/layouts/Layout.astro", void 0);
//#endregion
export { $$Layout as t };
