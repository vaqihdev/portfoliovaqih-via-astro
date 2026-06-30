-- 1. Projects & Labs Sector
CREATE TABLE IF NOT EXISTS projects_labs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'project' or 'lab'
  tools_used JSONB DEFAULT '[]'::jsonb,
  live_url VARCHAR(500),
  case_study_url VARCHAR(500),
  is_featured BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE INDEX IF NOT EXISTS projects_featured_idx ON projects_labs(is_featured);
CREATE INDEX IF NOT EXISTS projects_type_idx ON projects_labs(type);

-- 2. Capabilities Sector
CREATE TABLE IF NOT EXISTS capabilities (
  id SERIAL PRIMARY KEY,
  category VARCHAR(100) NOT NULL, -- 'tools', 'frontend', 'database'
  name VARCHAR(255) NOT NULL,
  level VARCHAR(100) NOT NULL, -- 'proficient', 'good'
  order_index INTEGER DEFAULT 0 NOT NULL
);
CREATE INDEX IF NOT EXISTS capabilities_category_idx ON capabilities(category);
CREATE INDEX IF NOT EXISTS capabilities_order_idx ON capabilities(order_index);

-- 3. Career Journey Sector
CREATE TABLE IF NOT EXISTS career_journey (
  id SERIAL PRIMARY KEY,
  role VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  duration VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  order_index INTEGER DEFAULT 0 NOT NULL
);
CREATE INDEX IF NOT EXISTS journey_order_idx ON career_journey(order_index);

-- 4. Blog Sector
CREATE TABLE IF NOT EXISTS blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  summary TEXT NOT NULL,
  content_body TEXT NOT NULL,
  tags JSONB DEFAULT '[]'::jsonb,
  status VARCHAR(50) DEFAULT 'draft' NOT NULL, -- 'draft' or 'published'
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE INDEX IF NOT EXISTS blogs_status_date_idx ON blogs(status, published_at);
CREATE INDEX IF NOT EXISTS blogs_slug_idx ON blogs(slug);
