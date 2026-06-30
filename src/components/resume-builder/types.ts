export interface ResumeData {
  id?: number;
  title: string;
  template: string;
  content: ResumeContent;
}

export interface ResumeContent {
  personal: PersonalInfo;
  summary: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  leadership: Leadership[];
  certifications: Certification[];
  awards: Award[];
  languages: Language[];
  skills: Skills;
}

export interface PersonalInfo {
  fullName: string;
  headline: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  linkedIn: string;
  portfolio: string;
  github: string;
}

export interface Education {
  id: string;
  school: string;
  location: string;
  degree: string;
  major: string;
  minor: string;
  gpa: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  coursework: string;
  honors: string;
  activities: string;
}

export interface Experience {
  id: string;
  company: string;
  location: string;
  position: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  bullets: string[];
}

export interface Project {
  id: string;
  name: string;
  role: string;
  duration: string;
  description: string;
  technologies: string;
  github: string;
  liveDemo: string;
  bullets: string[];
}

export interface Leadership {
  id: string;
  organization: string;
  position: string;
  duration: string;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expirationDate: string;
  credentialId: string;
  credentialUrl: string;
}

export interface Award {
  id: string;
  name: string;
  organization: string;
  year: string;
  description: string;
}

export interface Language {
  id: string;
  language: string;
  level: string;
}

export interface Skills {
  programming: string[];
  frameworks: string[];
  cloud: string[];
  database: string[];
  devops: string[];
  tools: string[];
  soft: string[];
  other: string[];
}

export const defaultResumeContent: ResumeContent = {
  personal: {
    fullName: '', headline: '', city: '', state: '', country: '', phone: '', email: '', linkedIn: '', portfolio: '', github: ''
  },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  leadership: [],
  certifications: [],
  awards: [],
  languages: [],
  skills: {
    programming: [], frameworks: [], cloud: [], database: [], devops: [], tools: [], soft: [], other: []
  }
};
