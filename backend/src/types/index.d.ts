import type { Document, Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
      isAdmin?: boolean;
    }
  }
}

// =============================================================================
// ENUM INTERFACES
// =============================================================================
export enum UserRole {
  ADMIN = "admin", // Only the portfolio owner
  VISITOR = "visitor", // Anonymous visitors (no account needed)
}

export enum ProjectStatus {
  COMPLETED = "completed",
  IN_PROGRESS = "in_progress",
  PLANNED = "planned",
  ON_HOLD = "on_hold",
}

export enum ContactUrgency {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum ContactStatus {
  NEW = "new",
  REVIEWED = "reviewed",
  REPLIED = "replied",
  CLOSED = "closed",
}

export enum WorkType {
  FULL_TIME = "Full Time",
  PART_TIME = "Part Time",
  CONTRACT = "Contract",
  INTERNSHIP = "Internship",
  FREELANCE = "Freelance",
}

export enum WorkMode {
  REMOTE = "Remote",
  ONSITE = "Onsite",
  HYBRID = "Hybrid",
}

export enum AvailabilityStatus {
  AVAILABLE = "available",
  BUSY = "busy",
  NOT_AVAILABLE = "not-available",
}

export enum ProjectCategory {
  WEB = "Web",
  MOBILE = "Mobile",
  DESKTOP = "Desktop",
  API = "API",
  AI_ML = "AI/ML",
  WEB3 = "Web3",
  OTHER = "Other",
}

export enum ContentVisibility {
  PUBLIC = "public", // Visible to everyone
  UNLISTED = "unlisted", // Accessible via direct link
  PRIVATE = "private", // Only admin can see
  DRAFT = "draft", // Work in progress
}

// =============================================================================
// USER INTERFACES (Simplified for single-user system)
// =============================================================================
export interface IUser {
  name: string;
  email: string;
  password: string;
  bio?: string;
  role: UserRole.ADMIN; // Always admin for portfolio owner
  socialLinks?: {
    platform: string;
    url: string;
    icon?: string;
    order?: number;
    isActive: boolean;
    showInHeader?: boolean;
    showInFooter?: boolean;
  }[];
  avatar?: string;
  isActive: boolean;
  lastLogin?: Date;
  loginAttempts?: number;
  lockUntil?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  twoFactorEnabled?: boolean;
  twoFactorSecret?: string;
  passwordChangedAt?: Date;
  backupCodes?: string; // For 2FA
  sessions?: {
    sessionId: string;
    ip: string;
    userAgent: string;
    lastUsed: Date;
  }[];
  preferences: {
    emailNotifications: {
      newContacts: boolean;
      weeklyAnalytics: boolean;
      systemUpdates: boolean;
    };
    autoBackup: boolean;
    sessionTimeout: number; // minutes
  };
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
// VISITOR TRACKING (For analytics without user accounts)
// =============================================================================
export interface IVisitorSession {
  sessionId: string;
  ip: string;
  userAgent: string;
  country?: string;
  city?: string;
  device: "mobile" | "tablet" | "desktop";
  browser: string;
  os: string;
  referrer?: string;
  visitedPages: Array<{
    path: string;
    timestamp: Date;
    timeSpent?: number; // seconds
  }>;
  actions: Array<{
    type: "view" | "contact" | "download" | "like" | "share";
    target: string;
    timestamp: Date;
    metadata?: Record<string, any>;
  }>;
  firstVisit: Date;
  lastActivity: Date;
  isBot: boolean;
  totalTimeSpent: number; // seconds
}

export interface VisitorSessionDocument extends IVisitorSession, Document {
  createdAt: Date;
  updatedAt: Date;
}

// =============================================================================
// SOCIAL LINKS INTERFACES
// =============================================================================
export interface ISocialLink {
  platform: string;
  url: string;
  icon?: string;
  order?: number;
  isActive: boolean;
  showInHeader?: boolean;
  showInFooter?: boolean;
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
  displayString?: string; // e.g., "San Francisco, CA"
}

export interface IAvailability {
  status: AvailabilityStatus;
  message?: string;
  availableFrom?: Date;
  hourlyRate?: number;
  currency?: string;
  workingHours?: {
    timezone: string;
    schedule: {
      [key: string]: {
        // day of week
        available: boolean;
        start?: string; // "09:00"
        end?: string; // "17:00"
      };
    };
  };
}

export interface ILanguage {
  name: string;
  proficiency: "native" | "fluent" | "conversational" | "basic";
  certified?: boolean;
  certificationUrl?: string;
}

export interface IAchievement {
  title: string;
  description: string;
  date: Date;
  icon?: string;
  url?: string;
  category?: "award" | "certification" | "milestone" | "recognition";
  verified?: boolean;
  visibility: ContentVisibility;
}

export interface IContactInfo {
  email: string; // Required for contact
  phone?: string;
  alternateEmail?: string;
  preferredContact: "email" | "phone" | "linkedin";
  responseTime?: string; // e.g., "within 24 hours"
}

export interface IAbout {
  name: string;
  title: string;
  summary: string;
  bio?: string;
  tagline?: string;
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
  visibility: ContentVisibility;
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
  categoryId: Types.ObjectId;
  icon?: string;
  color?: string;
  description?: string;
  lastUsed?: Date;
  trending?: boolean;
  certifications?: Types.ObjectId[];
  relatedProjects?: Types.ObjectId[];
  order?: number;
  visibility: ContentVisibility;
  showOnResume: boolean;
  featured?: boolean; // Highlight important skills
}

export interface ISkillCategory {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  order?: number;
  visibility: ContentVisibility;
  showOnHomepage?: boolean;
}

export interface SkillDocument extends ISkill, Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface SkillCategoryDocument extends ISkillCategory, Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface ICertification {
  name: string;
  issuer: string;
  date: Date;
  expiryDate?: Date;
  credentialId?: string;
  url?: string;
  skillIds?: Types.ObjectId[];
  verified?: boolean;
  order?: number;
  visibility: ContentVisibility;
  showOnResume: boolean;
}

export interface CertificationDocument extends ICertification, Document {
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
  workType: WorkType;
  workMode: WorkMode;
  startDate: Date;
  endDate?: Date;
  current?: boolean;
  description: string[];
  achievements?: string[];
  skills: string[];
  technologies: string[];
  teamSize?: number;
  order?: number;
  location?: string;
  visibility: ContentVisibility;
  showOnResume: boolean;
  featured?: boolean; // Highlight important experiences
  salary?: {
    disclosed: boolean;
    range?: {
      min: number;
      max: number;
      currency: string;
      period: "hourly" | "monthly" | "yearly";
    };
  };
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
  lastViewed?: Date;
  uniqueVisitors?: number;
}

export interface IProject {
  title: string;
  description: string;
  outcomes?: string[];
  features: string[];
  challenges?: string[];
  learnings?: string[];
  technologies: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  githubUrl?: string;
  liveUrl?: string;
  documentationUrl?: string;
  images: string[];
  videoUrl?: string;
  order?: number;
  myRole?: string;
  metrics: IProjectMetrics;
  startDate?: Date;
  endDate?: Date;
  duration?: string;
  teamSize?: number;
  featured: boolean; // Important for homepage display
  visibility: ContentVisibility;
  showOnResume: boolean;
  archived?: boolean;
  tags?: string[]; // For better categorization
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
  degreeType:
    | "High School"
    | "Associate's"
    | "Bachelor's"
    | "Master's"
    | "Doctorate"
    | "Diploma"
    | "Certificate"
    | "Bootcamp"
    | "Online Course"
    | "Other";
  degreeLevel?:
    | "Undergraduate"
    | "Graduate"
    | "Postgraduate"
    | "Professional"
    | "Other";
  fieldOfStudy?: string;
  institution: string;
  institutionUrl?: string;
  institutionLogoUrl?: string;
  country: string;
  region?: string;
  city?: string;
  startDate: Date;
  endDate?: Date;
  current?: boolean;
  relevantCourses?: string[];
  description?: string;
  certificateUrl?: string;
  achievements?: string[];
  coursework?: string[];
  grade?: string; // e.g., "A", "B+", "Pass"
  certificate?: {
    title: string;
    url: string;
    issuedBy: string;
    dateIssued: Date;
  };
  featured?: boolean; // Highlight important education
  order?: number;
  gpa?: number;
  maxGpa?: number;
  honors?: string[];
  thesis?: {
    title: string;
    description?: string;
    url?: string;
  };
  visibility: ContentVisibility;
  showOnResume: boolean;
}

export interface EducationDocument extends IEducation, Document {
  createdAt: Date;
  updatedAt: Date;
}

// =============================================================================
// CONTACT INTERFACES (For visitors to contact admin)
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
  urgency: ContactUrgency;
  source?: "website" | "linkedin" | "referral" | "github" | "other";
  read: boolean;
  replied: boolean;
  status: ContactStatus;
  tags: string[];
  notes?: string; // Admin notes
  followUpDate?: Date;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  priority: "low" | "medium" | "high";
  sessionId?: string; // Link to visitor session
  attachments?: Array<{
    filename: string;
    url: string;
    size: number;
  }>;
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
  author: Types.ObjectId; // Always admin
  tags: string[];
  category?: string;
  visibility: ContentVisibility;
  featured?: boolean;
  readTime?: number;
  views: number;
  likes: number;
  publishedAt?: Date;
  scheduledFor?: Date;
  lastModified?: Date;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords: string[];
  };
  relatedPosts?: Types.ObjectId[];
  commentsEnabled: boolean;
  archived?: boolean;
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
  featured: boolean;
  approved: boolean; // Admin must approve before showing
  order?: number;
  visibility: ContentVisibility;
  relationship?: "client" | "colleague" | "manager" | "subordinate" | "other";
  linkedinProfile?: string;
  workPeriod?: {
    start: Date;
    end?: Date;
  };
  showOnHomepage?: boolean;
}

export interface TestimonialDocument extends ITestimonial, Document {
  createdAt: Date;
  updatedAt: Date;
}

// =============================================================================
// ANALYTICS INTERFACES (Enhanced for single-user system)
// =============================================================================
export interface IAnalytics {
  date: Date;
  pageViews: number;
  uniqueVisitors: number;
  bounceRate?: number;
  avgSessionDuration?: number;
  topPages: Array<{ page: string; views: number }>;
  topProjects: Array<{ projectId: Types.ObjectId; views: number }>;
  contactFormSubmissions: number;
  resumeViews: number; // Public resume views
  demographics: {
    countries: Array<{ country: string; count: number }>;
    cities: Array<{ city: string; count: number }>;
    devices: Array<{ device: string; count: number }>;
    browsers: Array<{ browser: string; count: number }>;
    os: Array<{ os: string; count: number }>;
    referrers: Array<{ source: string; count: number }>;
  };
  conversions: {
    contactFormSubmissions: number;
    projectViews: number;
    blogViews: number;
    socialClicks: number;
  };
  realTimeUsers?: number;
  newVsReturning?: {
    new: number;
    returning: number;
  };
  performanceMetrics?: {
    avgLoadTime: number;
    slowestPages: Array<{ page: string; loadTime: number }>;
  };
}

export interface AnalyticsDocument extends IAnalytics, Document {
  createdAt: Date;
  updatedAt: Date;
}

// =============================================================================
// PORTFOLIO SETTINGS (Global settings for the portfolio)
// =============================================================================
export interface IPortfolioSettings {
  siteName: string;
  siteUrl: string;
  maintenanceMode: boolean;
  allowContactForm: boolean;
  allowResume: boolean; // Allow public resume viewing
  analytics: {
    enabled: boolean;
    googleAnalyticsId?: string;
    trackingEnabled: boolean;
  };
  seo: {
    defaultMetaTitle: string;
    defaultMetaDescription: string;
    defaultKeywords: string[];
    favicon?: string;
    ogImage?: string;
  };
  security: {
    rateLimiting: {
      enabled: boolean;
      windowMs: number;
      maxRequests: number;
    };
    captcha: {
      enabled: boolean;
      siteKey?: string;
      secretKey?: string;
    };
  };
  email: {
    provider: "gmail" | "smtp" | "sendgrid" | "other";
    settings: Record<string, any>;
    templates: {
      contactConfirmation: boolean;
      contactNotification: boolean;
    };
  };
  backup: {
    enabled: boolean;
    frequency: "daily" | "weekly" | "monthly";
    retention: number; // days
  };
}

export interface PortfolioSettingsDocument
  extends IPortfolioSettings,
    Document {
  createdAt: Date;
  updatedAt: Date;
}

// =============================================================================
// ADMIN DASHBOARD INTERFACES
// =============================================================================
export interface IDashboardMetrics {
  totalViews: number;
  totalContacts: number;
  totalProjects: number;
  weeklyGrowth: {
    views: number;
    contacts: number;
    visitors: number;
  };
  topPerformingProjects: Array<{
    project: IProject;
    views: number;
    growth: number;
  }>;
  recentContacts: IContact[];
  systemHealth: {
    status: "healthy" | "warning" | "error";
    uptime: number;
    lastBackup?: Date;
    storageUsed: number;
    storageLimit: number;
  };
  pendingActions: {
    unreadContacts: number;
    draftPosts: number;
    unapprovedTestimonials: number;
  };
}

// =============================================================================
// API RESPONSE INTERFACES
// =============================================================================
export interface IPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: IValidationError[];
  pagination?: IPagination;
  timestamp: Date;
  requestId?: string;
  cached?: boolean;
  executionTime?: number;
}

// =============================================================================
// ERROR HANDLING INTERFACES
// =============================================================================
export interface IValidationError {
  field: string;
  message: string;
  code: string;
  value?: any;
}

export interface IApiError {
  statusCode: number;
  message: string;
  errors?: IValidationError[];
  stack?: string;
  timestamp: Date;
  path: string;
  method: string;
  requestId?: string;
  userId?: Types.ObjectId;
}

// =============================================================================
// RESUME INTERFACES (Enhanced for ATS optimization)
// =============================================================================
export interface IResumeTemplate {
  id: string;
  name: string;
  description: string;
  category: "modern" | "classic" | "creative" | "minimal" | "professional";
  preview: string;
  templateFile: string;
  active: boolean;
  atsCompliance: {
    score: number; // 1-100 ATS compatibility score
    features: {
      standardSections: boolean;
      standardFonts: boolean;
      simpleFormatting: boolean;
      machineReadable: boolean;
      keywordOptimized: boolean;
    };
  };
  customizable: {
    colors: boolean;
    fonts: boolean;
    layout: boolean;
    sections: boolean;
  };
  supportedFormats: ("pdf" | "docx" | "html" | "txt")[];
  fontCompatibility: string[]; // ATS-friendly fonts
  layoutType: "single-column" | "two-column" | "hybrid";
  order?: number;
  isDefault?: boolean;
  atsRecommended?: boolean;
}

export interface IResumeContent {
  personalInfo: {
    fullName: string;
    professionalTitle: string;
    email: string;
    phone: string;
    location: {
      city: string;
      state: string;
      country: string;
      zipCode?: string;
    };
    linkedin?: string;
    github?: string;
    portfolio?: string;
    summary: string;
  };
  experience: Array<{
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string | "Present";
    description: string[];
    achievements: string[];
    technologies: string[];
    quantifiedResults: string[]; // Metrics and numbers for ATS
  }>;
  skills: {
    technical: {
      programming: string[];
      frameworks: string[];
      databases: string[];
      tools: string[];
      cloud: string[];
    };
    soft: string[];
    industry: string[];
  };
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    achievements: string[];
    url?: string;
    github?: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    location: string;
    graduationDate: string;
    gpa?: string;
    honors?: string[];
    relevantCourses?: string[];
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    dateObtained: string;
    expiryDate?: string;
    credentialId?: string;
  }>;
  languages?: Array<{
    language: string;
    proficiency: string;
  }>;
  awards?: Array<{
    title: string;
    issuer: string;
    date: string;
    description?: string;
  }>;
}

export interface IATSOptimization {
  keywordDensity: {
    [keyword: string]: number;
  };
  sectionStandardization: {
    standardHeaders: boolean;
    properDateFormats: boolean;
    consistentFormatting: boolean;
  };
  formatChecks: {
    hasStandardSections: boolean;
    usesStandardFonts: boolean;
    hasProperSpacing: boolean;
    avoidsTables: boolean;
    avoidsImages: boolean;
    avoidsColumns: boolean;
  };
  contentAnalysis: {
    hasQuantifiedAchievements: boolean;
    hasRelevantKeywords: boolean;
    properLength: boolean;
    hasActionVerbs: boolean;
  };
  score: number; // Overall ATS score
  recommendations: string[];
}

export interface IResumeSettings {
  selectedTemplate: string;
  publicAccess: boolean;
  atsOptimization: {
    enabled: boolean;
    targetKeywords: string[];
    industry: string;
    jobTitle: string;
    autoOptimize: boolean;
  };
  customization: {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily: "Arial" | "Helvetica" | "Times New Roman" | "Calibri"; // ATS-friendly fonts only
    fontSize: number;
    spacing: "compact" | "normal" | "spacious";
    margins: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
  };
  sectionsConfig: {
    personalInfo: {
      show: boolean;
      order: number;
      standardHeader: boolean; // Use standard "Contact Information" header
      fields: {
        name: boolean;
        title: boolean;
        email: boolean;
        phone: boolean;
        location: boolean;
        website: boolean;
        linkedin: boolean;
        github: boolean;
      };
    };
    professionalSummary: {
      show: boolean;
      order: number;
      title: "Professional Summary" | "Summary" | "Profile"; // Standard ATS headers
      maxLength: number;
      includeKeywords: boolean;
    };
    experience: {
      show: boolean;
      order: number;
      title: "Professional Experience" | "Work Experience" | "Experience";
      limit?: number;
      showAchievements: boolean;
      showTechnologies: boolean;
      quantifyResults: boolean;
      useActionVerbs: boolean;
      standardDateFormat: boolean;
    };
    skills: {
      show: boolean;
      order: number;
      title: "Technical Skills" | "Skills" | "Core Competencies";
      groupByCategory: boolean;
      showProficiency: boolean;
      atsKeywordOptimized: boolean;
      categoriesConfig: {
        [key: string]: {
          show: boolean;
          order: number;
          limit?: number;
          title: string;
        };
      };
    };
    projects: {
      show: boolean;
      order: number;
      title: "Projects" | "Key Projects" | "Technical Projects";
      limit?: number;
      showFeaturedOnly: boolean;
      showTechnologies: boolean;
      showLinks: boolean;
      showAchievements: boolean;
    };
    education: {
      show: boolean;
      order: number;
      title: "Education" | "Educational Background";
      showGpa: boolean;
      showCourses: boolean;
      showHonors: boolean;
      standardFormat: boolean;
    };
    certifications: {
      show: boolean;
      order: number;
      title: "Certifications" | "Professional Certifications";
      limit?: number;
      showExpiry: boolean;
      showCredentialId: boolean;
    };
    awards: {
      show: boolean;
      order: number;
      title: "Awards and Honors" | "Achievements";
      limit?: number;
    };
    languages: {
      show: boolean;
      order: number;
      title: "Languages";
      showProficiency: boolean;
    };
  };
  pageSettings: {
    format: "A4" | "Letter";
    orientation: "portrait"; // ATS prefers portrait
    maxPages: number;
    singleColumn: boolean; // ATS-friendly single column layout
  };
  atsSettings: {
    useStandardHeaders: boolean;
    avoidGraphics: boolean;
    avoidTables: boolean;
    useSimpleFormatting: boolean;
    optimizeForKeywords: boolean;
    targetAtsScore: number;
  };
  lastGenerated?: Date;
  generationCount: number;
  lastAtsScore?: number;
}

export interface IResumeAnalysis {
  atsScore: number;
  keywordMatches: number;
  missingKeywords: string[];
  formatIssues: string[];
  contentSuggestions: string[];
  strengths: string[];
  improvementAreas: string[];
  industryAlignment: number;
  competitivenessScore: number;
  readabilityScore: number;
}

export interface IResumeGeneration {
  templateId: string;
  format: "pdf" | "docx" | "html" | "txt";
  settings: IResumeSettings;
  content: IResumeContent;
  atsOptimization: IATSOptimization;
  analysis: IResumeAnalysis;
  generatedAt: Date;
  downloadUrl: string;
  expiresAt: Date;
  fileSize: number;
  watermark: boolean;
}

export interface ResumeGenerationDocument extends IResumeGeneration, Document {
  createdAt: Date;
  updatedAt: Date;
}
