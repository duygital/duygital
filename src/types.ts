export interface Project {
  id: string; // mapped from slug
  slug: string;
  published: boolean;
  featured: boolean;
  title_vi: string;
  title_en: string;
  year: string;
  category: string;
  tags: string[];
  client: string;
  platform: string;
  youtube_url: string;
  vimeo_url: string;
  thumbnail_mode: string;
  thumbnail_url: string;
  thumbnail_time: string;
  runtime: string;
  role_vi: string;
  role_en: string;
  focus_vi: string;
  focus_en: string;
  short_desc_vi: string;
  short_desc_en: string;
  project_context_vi: string;
  project_context_en: string;
  creative_goal_vi: string;
  creative_goal_en: string;
  editing_focus_vi: string;
  editing_focus_en: string;
  deliverables_vi: string;
  deliverables_en: string;
  color_pipeline: string;
  aspect_ratio: string;
  credits: string;
  sort_order: number;

  // Translated dynamic views mapping cleanly for component consumption:
  title: string;
  role: string;
  focus: string;
  short_desc: string;
  project_context: string;
  creative_goal: string;
  editing_focus: string;
  deliverables: string;
}

export interface PhilosophySnippet {
  id: string;
  quote: string;
  author: string;
  context: string;
}

export interface Essay {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  readTime: string;
  date: string;
  bgTexture?: string;
}

export interface WorkflowStep {
  stepNumber: string;
  title: string;
  description: string;
  duration: string;
  deliverable: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  description: string;
  features: string[];
  idealFor: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  projectTitle: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface SheetConfig {
  sheetId: string;
  isPublishedCsv: boolean;
  publishedUrl?: string;
}

export interface HeroContent {
  [key: string]: {
    vi: string;
    en: string;
  };
}

