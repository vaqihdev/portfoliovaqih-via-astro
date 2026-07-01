import { C as renderTemplate, D as renderHead, M as createComponent, S as renderSlot, b as renderComponent, j as createAstro } from "./render_Q3oU-XgZ.mjs";
import "./compiler_DpBGOTbu.mjs";
/* empty css                 */
import { n as $$LoadingScreen, r as $$Footer } from "./Navbar_CyTy8TxT.mjs";
//#region src/layouts/BaseLayout.astro
createAstro("https://astro.build");
var $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BaseLayout;
	const { title = "Muchamad Ghufron Vaqih | Developer Portfolio" } = Astro.props;
	return renderTemplate`<html lang="en" class="scroll-smooth"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title>${renderHead($$result)}</head><body class="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50 font-sans antialiased selection:bg-blue-200 dark:selection:bg-blue-900 flex flex-col min-h-screen">${renderComponent($$result, "LoadingScreen", $$LoadingScreen, {})}<div class="flex-1">${renderSlot($$result, $$slots["default"])}</div>${renderComponent($$result, "Footer", $$Footer, {})}</body></html>`;
}, "/home/vaqih/workspace/portfoliovaqih-via-astro/src/layouts/BaseLayout.astro", void 0);
//#endregion
export { $$BaseLayout as t };
