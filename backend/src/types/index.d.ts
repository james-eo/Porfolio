import type { Document, Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}

// =============================================================================
// USER INTERFACES
// =============================================================================
export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user" | "moderator"; // Add moderator role
  avatar?: string;
  isActive: boolean;
  lastLogin?: Date;
  loginAttempts?: number;
  lockUntil?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  emailVerified: boolean;
  emailVerificationToken?: string;
  twoFactorEnabled?: boolean;
  twoFactorSecret?: string;
  // Methods
  getSignedJwtToken(): string;
  matchPassword(enteredPassword: string): Promise<boolean>;
  generatePasswordResetToken(): string;
  generateEmailVerificationToken(): string;
}

export interface UserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}

// =============================================================================
// ABOUT INTERFACES
// =============================================================================
export interface ISocialLink {
  platform: string;
  url: string;
  icon?: string;
  order?: number;
}

export interface ILocation {
  city?: string;
  state?: string;
  country?: string;
  timezone?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface IContactInfo {
  email?: string;
  phone?: string;
  alternateEmail?: string;
  preferredContact?: "email" | "phone" | "linkedin";
}

export interface IAvailability {
  status: "available" | "busy" | "not-available";
  message?: string;
  availableFrom?: Date;
  hourlyRate?: number;
  currency?: string;
}

export interface ILanguage {
  name: string;
  proficiency: "native" | "fluent" | "conversational" | "basic";
  certified?: boolean;
}

export interface IAchievement {
  title: string;
  description: string;
  date: Date;
  icon?: string;
  url?: string;
  category?: "award" | "certification" | "milestone" | "recognition";
}

export interface IAbout {
  name: string; // Make required
  title: string; // Make required
  summary: string;
  bio?: string; // Longer detailed bio
  tagline?: string; // Short catchy phrase
  profileImage?: string;
  backgroundImage?: string;
  resumeUrl?: string;
  location?: ILocation;
  socialLinks: ISocialLink[];
  contactInfo: IContactInfo;
  availability: IAvailability;
  yearsOfExperience?: number;
  languages: ILanguage[];
  interests: string[];
  achievements: IAchievement[];
  funFacts?: string[];
  currentlyLearning?: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords: string[];
  };
}

export interface AboutDocument extends IAbout, Document {
  createdAt: Date;
  updatedAt: Date;
}

// =============================================================================
// SKILLS INTERFACES
// =============================================================================
export interface ISkill {
  name: string;
  proficiency: number; // 1-10 scale
  yearsOfExperience?: number;
  category:
    | "frontend"
    | "backend"
    | "database"
    | "devops"
    | "tools"
    | "soft-skills"
    | "languages";
  icon?: string;
  color?: string;
  description?: string;
  lastUsed?: Date;
  trending?: boolean;
  certifications?: ICertification[];
  relatedProjects?: Types.ObjectId[];
}

export interface ICertification {
  name: string;
  issuer: string;
  date: Date;
  expiryDate?: Date;
  credentialId?: string;
  url?: string;
}

export interface ISkillCategory {
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  order?: number;
  skills: ISkill[];
}

export interface SkillDocument extends ISkill, Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface SkillCategoryDocument extends ISkillCategory, Document {
  createdAt: Date;
  updatedAt: Date;
}
// =============================================================================
// EXPERIENCE INTERFACES
// =============================================================================

export interface IExperience {
  title: string;
  company: string;
  companyUrl?: string;
  companyLogo?: string;
  location?: string;
  workType: "full-time" | "part-time" | "contract" | "internship" | "freelance";
  workMode: "remote" | "on-site" | "hybrid";
  startDate: Date;
  endDate?: Date;
  current?: boolean;
  description: string[];
  achievements?: string[];
  skills: string[];
  technologies: string[];
  teamSize?: number;
  reportingTo?: string;
  salary?: {
    amount?: number;
    currency?: string;
    period?: "hourly" | "monthly" | "yearly";
  };
  order?: number;
}

export interface ExperienceDocument extends IExperience, Document {
  createdAt: Date;
  updatedAt: Date;
}
// =============================================================================
// PROJECT INTERFACES
// =============================================================================

export interface IProjectMetrics {
  views: number;
  likes: number;
  downloads?: number;
  stars?: number;
  forks?: number;
}

export interface IProject {
  title: string;
  description: string;
  shortDescription?: string;
  outcomes?: string[];
  features: string[];
  challenges?: string[];
  learnings?: string[];
  technologies: string[];
  category: "web" | "mobile" | "desktop" | "api" | "ai/ml" | "web3" | "other";
  status: "completed" | "in-progress" | "planned" | "on-hold";
  githubUrl?: string;
  liveUrl?: string;
  documentationUrl?: string;
  images: string[];
  videoUrl?: string;
  demoCredentials?: {
    username?: string;
    password?: string;
  };
  featured?: boolean;
  priority?: number;
  order?: number;
  startDate?: Date;
  endDate?: Date;
  duration?: string; // "3 months"
  client?: string;
  teamSize?: number;
  myRole?: string;
  budget?: number;
  metrics: IProjectMetrics;
  tags: string[];
  seo?: {
    keywords: string[];
    metaDescription?: string;
  };
}

export interface ProjectDocument extends IProject, Document {
  createdAt: Date;
  updatedAt: Date;
}
// =============================================================================
// EDUCATION INTERFACES
// =============================================================================
export interface IEducation {
  degree: string;
  fieldOfStudy?: string;
  institution: string;
  institutionUrl?: string;
  institutionLogo?: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  gpa?: number;
  maxGpa?: number;
  honors?: string[];
  relevantCourses?: string[];
  thesis?: {
    title: string;
    description?: string;
    url?: string;
  };
  activities?: string[];
  description?: string;
  order?: number;
}

export interface EducationDocument extends IEducation, Document {
  createdAt: Date;
  updatedAt: Date;
}

// =============================================================================
// CONTACT INTERFACES
// =============================================================================

export interface IContact {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  projectType?:
    | "web-development"
    | "mobile-app"
    | "consultation"
    | "collaboration"
    | "other";
  budget?: "<5k" | "5k-10k" | "10k-25k" | "25k+" | "discuss";
  timeline?: string;
  urgency: "low" | "medium" | "high";
  source?: "website" | "linkedin" | "referral" | "github" | "other";
  read: boolean;
  replied?: boolean;
  status: "new" | "in-progress" | "closed";
  tags?: string[];
  notes?: string;
  followUpDate?: Date;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
}

export interface ContactDocument extends IContact, Document {
  createdAt: Date;
  updatedAt: Date;
}

// =============================================================================
// BLOG INTERFACES
// =============================================================================

export interface IBlog {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  author: Types.ObjectId;
  tags: string[];
  category?: string;
  published: boolean;
  featured?: boolean;
  readTime?: number;
  views: number;
  likes: number;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords: string[];
  };
  relatedPosts?: Types.ObjectId[];
}

export interface BlogDocument extends IBlog, Document {
  createdAt: Date;
  updatedAt: Date;
}

// =============================================================================
// TESTIMONIALS INTERFACES
// =============================================================================

export interface ITestimonial {
  name: string;
  position: string;
  company: string;
  companyUrl?: string;
  avatar?: string;
  content: string;
  rating: number; // 1-5
  project?: Types.ObjectId;
  featured?: boolean;
  approved: boolean;
  order?: number;
}

export interface TestimonialDocument extends ITestimonial, Document {
  createdAt: Date;
  updatedAt: Date;
}

// =============================================================================
// ANALYTICS INTERFACES
// =============================================================================

export interface IAnalytics {
  date: Date;
  pageViews: number;
  uniqueVisitors: number;
  bounceRate?: number;
  avgSessionDuration?: number;
  topPages: Array<{ page: string; views: number }>;
  topProjects: Array<{ projectId: Types.ObjectId; views: number }>;
  demographics: {
    countries: Array<{ country: string; count: number }>;
    devices: Array<{ device: string; count: number }>;
    browsers: Array<{ browser: string; count: number }>;
  };
  conversions: {
    contactFormSubmissions: number;
    resumeDownloads: number;
    projectViews: number;
  };
}

export interface AnalyticsDocument extends IAnalytics, Document {
  createdAt: Date;
  updatedAt: Date;
}

// =============================================================================
// API RESPONSE INTERFACES
// =============================================================================

export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
// =============================================================================
// EMAIL INTERFACES
// =============================================================================
export interface IEmailOptions {
  to: string;
  subject: string;
  message: string;
  html?: string;
  from?: string;
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
}

// =============================================================================
// SEARCH INTERFACES
// =============================================================================

export interface ISearchFilters {
  category?: string;
  technologies?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  featured?: boolean;
  status?: string;
}

export interface ISearchQuery {
  query?: string;
  filters?: ISearchFilters;
  sort?: string;
  page?: number;
  limit?: number;
}
