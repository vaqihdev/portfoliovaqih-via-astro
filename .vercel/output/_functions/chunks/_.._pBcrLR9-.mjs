import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as projectsLabs, i as landingMetadata, n as atsResumes, r as capabilities, t as db } from "./db_CQw15ogo.mjs";
import { asc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { deleteCookie, setCookie } from "hono/cookie";
//#region src/server/index.ts
var app = new Hono().basePath("/api");
app.post("/auth", async (c) => {
	const body = await c.req.json();
	const username = body.username?.trim();
	const password = body.password?.trim();
	if (username === "admin@vaqih.dev" && password === "password123") {
		setCookie(c, "admin_session", "true", {
			path: "/",
			httpOnly: true,
			secure: true,
			sameSite: "Strict",
			maxAge: 3600 * 24
		});
		return c.json({ success: true });
	}
	return c.json({
		success: false,
		message: "Invalid Credentials"
	}, 401);
});
app.get("/projects-labs", async (c) => {
	try {
		const data = await db.select().from(projectsLabs).orderBy(asc(projectsLabs.id));
		return c.json({
			success: true,
			data
		});
	} catch (err) {
		return c.json({
			success: false,
			message: "Database query failed"
		}, 500);
	}
});
app.get("/capabilities", async (c) => {
	try {
		const data = await db.select().from(capabilities).orderBy(asc(capabilities.orderIndex));
		return c.json({
			success: true,
			data
		});
	} catch (err) {
		return c.json({
			success: false,
			message: "Database query failed"
		}, 500);
	}
});
app.get("/logout", (c) => {
	deleteCookie(c, "admin_session", { path: "/" });
	return c.redirect("/");
});
app.post("/projects-labs", async (c) => {
	try {
		const body = await c.req.json();
		await db.insert(projectsLabs).values({
			title: body.title,
			type: body.type,
			description: body.description || "",
			isFeatured: body.isFeatured === true || body.isFeatured === "true",
			tools: body.tools || ""
		});
		return c.json({ success: true });
	} catch (err) {
		return c.json({
			success: false,
			message: "Insert failed"
		}, 500);
	}
});
app.delete("/projects-labs/:id", async (c) => {
	try {
		const id = parseInt(c.req.param("id"), 10);
		await db.delete(projectsLabs).where(eq(projectsLabs.id, id));
		return c.json({ success: true });
	} catch (err) {
		return c.json({
			success: false,
			message: "Delete failed"
		}, 500);
	}
});
app.post("/capabilities", async (c) => {
	try {
		const body = await c.req.json();
		await db.insert(capabilities).values({
			skillName: body.skillName || body.name,
			category: body.category,
			level: body.level || "proficient",
			orderIndex: body.orderIndex ? parseInt(body.orderIndex, 10) : 99
		});
		return c.json({ success: true });
	} catch (err) {
		return c.json({
			success: false,
			message: "Insert failed"
		}, 500);
	}
});
app.delete("/capabilities/:id", async (c) => {
	try {
		const id = parseInt(c.req.param("id"), 10);
		await db.delete(capabilities).where(eq(capabilities.id, id));
		return c.json({ success: true });
	} catch (err) {
		return c.json({
			success: false,
			message: "Delete failed"
		}, 500);
	}
});
app.put("/landing-metadata", async (c) => {
	try {
		const body = await c.req.json();
		const existing = await db.select().from(landingMetadata).limit(1);
		if (existing.length > 0) await db.update(landingMetadata).set({
			heroFirstName: body.heroFirstName,
			heroLastName: body.heroLastName,
			heroSubtitle: body.heroSubtitle,
			heroShortBio: body.heroShortBio,
			aboutHeading: body.aboutHeading,
			aboutLongDesc: body.aboutLongDesc,
			coreDomains: body.coreDomains
		}).where(eq(landingMetadata.id, existing[0].id));
		else await db.insert(landingMetadata).values({
			heroFirstName: body.heroFirstName,
			heroLastName: body.heroLastName,
			heroSubtitle: body.heroSubtitle,
			heroShortBio: body.heroShortBio,
			aboutHeading: body.aboutHeading,
			aboutLongDesc: body.aboutLongDesc,
			coreDomains: body.coreDomains
		});
		return c.json({ success: true });
	} catch (err) {
		console.error("Update failed error:", err);
		return c.json({
			success: false,
			message: "Update failed"
		}, 500);
	}
});
app.get("/contributions", async (c) => {
	const heatmap = {};
	let totalProjects = 0, totalLabs = 0, totalResumes = 0;
	const toDateKey = (raw) => {
		if (!raw) return null;
		const d = raw instanceof Date ? raw : new Date(raw);
		if (isNaN(d.getTime())) return null;
		return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
	};
	const addEntry = (dateKey, entry) => {
		if (!dateKey) return;
		if (!heatmap[dateKey]) heatmap[dateKey] = [];
		heatmap[dateKey].push(entry);
	};
	try {
		const plRows = await db.select({
			id: projectsLabs.id,
			title: projectsLabs.title,
			type: projectsLabs.type,
			createdAt: projectsLabs.createdAt
		}).from(projectsLabs).orderBy(asc(projectsLabs.id));
		for (const row of plRows) {
			const key = toDateKey(row.createdAt);
			if (row.type?.toUpperCase() === "LAB") {
				totalLabs++;
				addEntry(key, {
					type: "Lab",
					title: row.title
				});
			} else {
				totalProjects++;
				addEntry(key, {
					type: "Project",
					title: row.title
				});
			}
		}
	} catch (err) {
		console.error("[contributions] projectsLabs query failed:", err);
	}
	try {
		const resumeRows = await db.select({
			id: atsResumes.id,
			title: atsResumes.title,
			createdAt: atsResumes.createdAt,
			updatedAt: atsResumes.updatedAt
		}).from(atsResumes).orderBy(asc(atsResumes.id));
		for (const row of resumeRows) {
			const key = toDateKey(row.createdAt) ?? toDateKey(row.updatedAt);
			totalResumes++;
			addEntry(key, {
				type: "Resume",
				title: row.title || "Untitled Resume"
			});
		}
	} catch (err) {
		console.error("[contributions] atsResumes query failed:", err);
	}
	const allDates = Object.keys(heatmap).sort();
	const lastUpdated = allDates.length > 0 ? allDates[allDates.length - 1] : null;
	return c.json({
		success: true,
		heatmap,
		stats: {
			totalProjects,
			totalLabs,
			totalResumes,
			totalPublished: totalProjects + totalLabs + totalResumes,
			lastUpdated
		}
	});
});
//#endregion
//#region src/pages/api/[...path].ts
var ____path__exports = /* @__PURE__ */ __exportAll({
	ALL: () => ALL,
	prerender: () => false
});
var ALL = ({ request }) => app.fetch(request);
//#endregion
//#region \0virtual:astro:page:src/pages/api/[...path]@_@ts
var page = () => ____path__exports;
//#endregion
export { page };
