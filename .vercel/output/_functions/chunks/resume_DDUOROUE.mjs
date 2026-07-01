import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { o as resumeProfile, t as db } from "./db_CQw15ogo.mjs";
import { eq } from "drizzle-orm";
//#region src/pages/api/resume.ts
var resume_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
async function GET() {
	try {
		const data = await db.select().from(resumeProfile).limit(1).then((r) => r[0]);
		return new Response(JSON.stringify({
			success: true,
			data: data || null
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
		const { fullName, jobTitle, email, phone, location, linkedIn, github, website, summary, experience, education, certifications } = await request.json();
		const existing = await db.select().from(resumeProfile).limit(1).then((r) => r[0]);
		if (existing) await db.update(resumeProfile).set({
			fullName: fullName || "",
			jobTitle: jobTitle || "",
			email: email || "",
			phone: phone || "",
			location: location || "",
			linkedIn: linkedIn || "",
			github: github || "",
			website: website || "",
			summary: summary || "",
			experience: experience || [],
			education: education || [],
			certifications: certifications || []
		}).where(eq(resumeProfile.id, existing.id));
		else await db.insert(resumeProfile).values({
			fullName: fullName || "",
			jobTitle: jobTitle || "",
			email: email || "",
			phone: phone || "",
			location: location || "",
			linkedIn: linkedIn || "",
			github: github || "",
			website: website || "",
			summary: summary || "",
			experience: experience || [],
			education: education || [],
			certifications: certifications || []
		});
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
//#region \0virtual:astro:page:src/pages/api/resume@_@ts
var page = () => resume_exports;
//#endregion
export { page };
