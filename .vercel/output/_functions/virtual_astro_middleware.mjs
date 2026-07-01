import { F as sequence } from "./chunks/render_Q3oU-XgZ.mjs";
//#region src/middleware.ts
var onRequest$1 = async ({ url, cookies, redirect }, next) => {
	if (url.pathname.startsWith("/admin")) {
		if (!cookies.has("admin_session")) return redirect("/", 302);
	}
	return next();
};
//#endregion
//#region \0virtual:astro:middleware
var onRequest = sequence(onRequest$1);
//#endregion
export { onRequest };
