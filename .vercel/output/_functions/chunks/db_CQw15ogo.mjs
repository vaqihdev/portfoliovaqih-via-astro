import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { boolean, integer, jsonb, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
//#region src/db/schema.ts
var schema_exports = /* @__PURE__ */ __exportAll({
	atsResumes: () => atsResumes,
	capabilities: () => capabilities,
	landingMetadata: () => landingMetadata,
	projectsLabs: () => projectsLabs,
	resumeProfile: () => resumeProfile
});
var landingMetadata = pgTable("landing_metadata", {
	id: serial("id").primaryKey(),
	heroFirstName: varchar("hero_first_name", { length: 100 }).notNull(),
	heroLastName: varchar("hero_last_name", { length: 100 }).notNull(),
	heroSubtitle: varchar("hero_subtitle", { length: 255 }).notNull(),
	heroShortBio: text("hero_short_bio").notNull(),
	aboutHeading: varchar("about_heading", { length: 255 }).notNull(),
	aboutLongDesc: text("about_long_desc").notNull(),
	coreDomains: text("core_domains").notNull()
});
var projectsLabs = pgTable("projects_labs", {
	id: serial("id").primaryKey(),
	title: varchar("title", { length: 255 }).notNull(),
	type: varchar("type", { length: 50 }).notNull(),
	tools: text("tools").notNull(),
	description: text("description").notNull(),
	isFeatured: boolean("is_featured").default(false).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull()
});
var capabilities = pgTable("capabilities", {
	id: serial("id").primaryKey(),
	skillName: varchar("skill_name", { length: 150 }).notNull(),
	category: varchar("category", { length: 100 }).notNull(),
	level: varchar("level", { length: 50 }).notNull(),
	orderIndex: integer("order_index").default(99).notNull()
});
var resumeProfile = pgTable("resume_profile", {
	id: serial("id").primaryKey(),
	fullName: varchar("full_name", { length: 150 }).default("").notNull(),
	jobTitle: varchar("job_title", { length: 200 }).default("").notNull(),
	email: varchar("email", { length: 150 }).default("").notNull(),
	phone: varchar("phone", { length: 50 }).default("").notNull(),
	location: varchar("location", { length: 150 }).default("").notNull(),
	linkedIn: varchar("linked_in", { length: 255 }).default("").notNull(),
	github: varchar("github", { length: 255 }).default("").notNull(),
	website: varchar("website", { length: 255 }).default("").notNull(),
	summary: text("summary").default("").notNull(),
	experience: jsonb("experience").default([]).notNull(),
	education: jsonb("education").default([]).notNull(),
	certifications: jsonb("certifications").default([]).notNull()
});
var atsResumes = pgTable("ats_resumes", {
	id: serial("id").primaryKey(),
	title: varchar("title", { length: 255 }).default("Untitled Resume").notNull(),
	template: varchar("template", { length: 50 }).default("harvard").notNull(),
	content: jsonb("content").default({}).notNull(),
	createdAt: varchar("created_at", { length: 50 }).notNull(),
	updatedAt: varchar("updated_at", { length: 50 }).notNull()
});
var db = drizzle(neon("postgresql://neondb_owner:npg_PkmfLW4MJ2Bv@ep-weathered-glitter-atk5shrq-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require"), { schema: schema_exports });
//#endregion
export { projectsLabs as a, landingMetadata as i, atsResumes as n, resumeProfile as o, capabilities as r, db as t };
