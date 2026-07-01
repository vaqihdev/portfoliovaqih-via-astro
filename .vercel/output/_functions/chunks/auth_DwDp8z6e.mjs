import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
//#region src/pages/api/auth.ts
var auth_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, cookies }) => {
	try {
		const { username, password } = await request.json();
		const secureAdminUser = "admin@vaqih.dev";
		const secureAdminPass = "password123";
		const inputUser = username ? username.trim() : "";
		const inputPass = password ? password.trim() : "";
		if (inputUser === secureAdminUser && inputPass === secureAdminPass) {
			cookies.set("admin_session", "authorized_cloud_plane_token", {
				path: "/",
				httpOnly: true,
				secure: true,
				sameSite: "strict",
				maxAge: 3600 * 24
			});
			return new Response(JSON.stringify({
				success: true,
				message: "AUTHENTICATION_SUCCESSFUL"
			}), {
				status: 200,
				headers: { "Content-Type": "application/json" }
			});
		}
		return new Response(JSON.stringify({
			success: false,
			message: "INVALID_CREDENTIALS"
		}), {
			status: 401,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Critical identity pipeline verification crash:", error);
		return new Response(JSON.stringify({
			success: false,
			message: "INTERNAL_SERVER_ERROR"
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/auth@_@ts
var page = () => auth_exports;
//#endregion
export { page };
