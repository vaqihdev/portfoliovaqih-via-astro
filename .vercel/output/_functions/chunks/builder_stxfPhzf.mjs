import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as atsResumes, t as db } from "./db_CQw15ogo.mjs";
import { eq } from "drizzle-orm";
//#region src/pages/api/builder.ts
var builder_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	POST: () => POST,
	PUT: () => PUT,
	prerender: () => false
});
async function GET({ request }) {
	try {
		const id = new URL(request.url).searchParams.get("id");
		if (id) {
			const data = await db.select().from(atsResumes).where(eq(atsResumes.id, parseInt(id))).limit(1).then((r) => r[0]);
			if (!data) return new Response(JSON.stringify({
				success: false,
				message: "Not found"
			}), { status: 404 });
			return new Response(JSON.stringify({
				success: true,
				data
			}), { headers: { "Content-Type": "application/json" } });
		}
		const data = await db.select().from(atsResumes).orderBy(atsResumes.id);
		return new Response(JSON.stringify({
			success: true,
			data
		}), { headers: { "Content-Type": "application/json" } });
	} catch (err) {
		return new Response(JSON.stringify({
			success: false,
			message: err.message
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
}
async function POST({ request }) {
	try {
		const { title, template, content } = await request.json();
		const result = await db.insert(atsResumes).values({
			title: title || "Untitled Resume",
			template: template || "harvard",
			content: content || {},
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		}).returning();
		return new Response(JSON.stringify({
			success: true,
			data: result[0]
		}), { headers: { "Content-Type": "application/json" } });
	} catch (err) {
		return new Response(JSON.stringify({
			success: false,
			message: err.message
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
}
async function PUT({ request }) {
	try {
		const { id, title, template, content } = await request.json();
		if (!id) return new Response(JSON.stringify({
			success: false,
			message: "ID required"
		}), { status: 400 });
		const result = await db.update(atsResumes).set({
			title,
			template,
			content,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		}).where(eq(atsResumes.id, parseInt(id))).returning();
		return new Response(JSON.stringify({
			success: true,
			data: result[0]
		}), { headers: { "Content-Type": "application/json" } });
	} catch (err) {
		return new Response(JSON.stringify({
			success: false,
			message: err.message
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
}
async function DELETE({ request }) {
	try {
		const id = new URL(request.url).searchParams.get("id");
		if (!id) return new Response(JSON.stringify({
			success: false,
			message: "ID required"
		}), { status: 400 });
		await db.delete(atsResumes).where(eq(atsResumes.id, parseInt(id)));
		return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } });
	} catch (err) {
		return new Response(JSON.stringify({
			success: false,
			message: err.message
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
}
//#endregion
//#region \0virtual:astro:page:src/pages/api/builder@_@ts
var page = () => builder_exports;
//#endregion
export { page };
