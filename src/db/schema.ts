import { pgTable, serial, text, varchar, boolean, integer, jsonb, timestamp } from 'drizzle-orm/pg-core';

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

export const engineeringAssets = pgTable('engineering_assets', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  category: varchar('category', { length: 100 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  summary: text('summary').notNull(),
  detailedContent: text('detailed_content').notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  difficulty: varchar('difficulty', { length: 50 }).notNull(),
  technologyStack: jsonb('technology_stack').default([]).notNull(),
  cloudProvider: varchar('cloud_provider', { length: 100 }).notNull(),
  operatingSystem: varchar('operating_system', { length: 100 }).notNull(),
  repositoryUrl: varchar('repository_url', { length: 255 }).default('').notNull(),
  liveDemoUrl: varchar('live_demo_url', { length: 255 }).default('').notNull(),
  documentationUrl: varchar('documentation_url', { length: 255 }).default('').notNull(),
  startedDate: timestamp('started_date'),
  completedDate: timestamp('completed_date'),
  readingTime: varchar('reading_time', { length: 50 }).default('5 min').notNull(),
  estimatedBuildTime: varchar('estimated_build_time', { length: 100 }).default('').notNull(),
  version: varchar('version', { length: 50 }).default('1.0.0').notNull(),
  isFeatured: boolean('is_featured').default(false).notNull(),
  tags: jsonb('tags').default([]).notNull(),
  thumbnail: varchar('thumbnail', { length: 500 }).default('').notNull(),
  banner: varchar('banner', { length: 500 }).default('').notNull(),
  galleryImages: jsonb('gallery_images').default([]).notNull(),
  author: varchar('author', { length: 100 }).default('Muchamad Ghufron Vaqih').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const incidentReports = pgTable('incident_reports', {
  id: serial('id').primaryKey(),
  incidentId: varchar('incident_id', { length: 100 }).notNull().unique(),
  severity: varchar('severity', { length: 50 }).notNull(),
  impact: text('impact').notNull(),
  rootCause: text('root_cause').notNull(),
  timeline: text('timeline').notNull(),
  mitigation: text('mitigation').notNull(),
  resolution: text('resolution').notNull(),
  lessonsLearned: text('lessons_learned').notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  relatedProject: integer('related_project').references(() => engineeringAssets.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
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
