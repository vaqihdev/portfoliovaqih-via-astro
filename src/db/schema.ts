import { pgTable, serial, text, varchar, boolean, integer, jsonb } from 'drizzle-orm/pg-core';

export const landingMetadata = pgTable('landing_metadata', {
  id: serial('id').primaryKey(),
  heroFirstName: varchar('hero_first_name', { length: 100 }).notNull(),
  heroLastName: varchar('hero_last_name', { length: 100 }).notNull(),
  heroSubtitle: varchar('hero_subtitle', { length: 255 }).notNull(),
  heroShortBio: text('hero_short_bio').notNull(),
  aboutHeading: varchar('about_heading', { length: 255 }).notNull(),
  aboutLongDesc: text('about_long_desc').notNull(),
  coreDomains: text('core_domains').notNull(),
});

export const projectsLabs = pgTable('projects_labs', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  tools: text('tools').notNull(),
  description: text('description').notNull(),
  isFeatured: boolean('is_featured').default(false).notNull(),
});

export const capabilities = pgTable('capabilities', {
  id: serial('id').primaryKey(),
  skillName: varchar('skill_name', { length: 150 }).notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  level: varchar('level', { length: 50 }).notNull(),
  orderIndex: integer('order_index').default(99).notNull(),
});

export const resumeProfile = pgTable('resume_profile', {
  id: serial('id').primaryKey(),
  fullName: varchar('full_name', { length: 150 }).default('').notNull(),
  jobTitle: varchar('job_title', { length: 200 }).default('').notNull(),
  email: varchar('email', { length: 150 }).default('').notNull(),
  phone: varchar('phone', { length: 50 }).default('').notNull(),
  location: varchar('location', { length: 150 }).default('').notNull(),
  linkedIn: varchar('linked_in', { length: 255 }).default('').notNull(),
  github: varchar('github', { length: 255 }).default('').notNull(),
  website: varchar('website', { length: 255 }).default('').notNull(),
  summary: text('summary').default('').notNull(),
  experience: jsonb('experience').default([]).notNull(),
  education: jsonb('education').default([]).notNull(),
  certifications: jsonb('certifications').default([]).notNull(),
});
export const atsResumes = pgTable('ats_resumes', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).default('Untitled Resume').notNull(),
  template: varchar('template', { length: 50 }).default('harvard').notNull(),
  content: jsonb('content').default({}).notNull(),
  createdAt: varchar('created_at', { length: 50 }).notNull(),
  updatedAt: varchar('updated_at', { length: 50 }).notNull(),
});
