export type Language = 'en' | 'ar';

// API Models
export interface Publication {
  id: number;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  category: string;
  pdf_file: string; // URL to the PDF
  published_date: string; // ISO date string
  created_at: string;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Event {
  id: number;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  date: string; // ISO date string
  location: string;
  is_online: boolean;
  registration_url: string;
  is_published: boolean;
}

export interface SiteSettings {
  id: number;
  site_name_en: string;
  site_name_ar: string;
  contact_email: string;
  contact_phone: string;
  address_en: string;
  address_ar: string;
  facebook_url: string;
  twitter_url: string;
  linkedin_url: string;
  privacy_policy_url: string;
  terms_of_use_url: string;
  footer_description_en: string;
  footer_description_ar: string;
}

export interface PageContent {
  id: number;
  slug: string;
  title_en: string;
  title_ar: string;
  content_en: string;
  content_ar: string;
  last_updated: string;
}

export interface TeamMember {
  id: number;
  name_en: string;
  name_ar: string;
  role_en: string;
  role_ar: string;
  bio_en: string;
  bio_ar: string;
  image: string; // URL to image
  order: number;
}

export interface NewsItem {
  id: number;
  title_en: string;
  title_ar: string;
  summary_en: string;
  summary_ar: string;
  content_en: string;
  content_ar: string;
  image: string; // URL to image
  published_date: string;
  is_featured: boolean;
}

// Frontend Content (for fallback/static parts)
export interface NavLink {
  label: string;
  href: string;
}

export interface TopBarContent {
  location: string;
  privacy: string;
  terms: string;
  rights: string;
}

export interface HeroContent {
  titleStart: string;
  titleEnd: string;
  description: string;
  btnCenter: string;
  btnForum: string;
  btnPubs: string;
}

export interface HomeSectionContent {
  title: string;
  text: string;
  link: string;
}

export interface AboutPillar {
  title: string;
  desc: string;
}

export interface FounderSection {
  title: string;
  text: string;
}

export interface PublicationsItem {
  cat: string;
  title: string;
  date: string;
  desc: string;
  type?: string; // Added for Home.tsx
}

export interface LocaleContent {
  direction: 'ltr' | 'rtl';
  font: string;
  serif: string;
  topBar: TopBarContent;
  nav: {
    home: string;
    about: string;
    founder: string;
    center: string;
    forum: string;
    publications: string;
    contact: string;
  };
  hero: HeroContent;
  home: {
    aboutSection: HomeSectionContent;
    founderSection: HomeSectionContent;
    newsSection: {
      title: string;
      subtitle: string;
    };
  };
  about: {
    title: string;
    whoWeAre: { title: string; text: string };
    ourStory: { title: string; text: string };
    vision: { title: string; text: string };
    mission: { title: string; text: string };
    approach: { title: string; pillars: AboutPillar[] };
  };
  founder: {
    title: string;
    sections: FounderSection[];
  };
  center: {
    title: string;
    intro: { title: string; text: string };
    curriculum: { title: string; text: string };
    training: { title: string; text: string };
    mentoring: { title: string; text: string };
    networking: { title: string; text: string };
  };
  forum: {
    title: string;
    history: { title: string; text: string };
    activities: { title: string; text: string };
    events: { title: string; text: string };
  };
  publications: {
    title: string;
    approach: { title: string; text: string };
    access: { title: string; text: string };
    latest: {
      subtitle: string;
      viewAll: string;
      readMore: string;
    };
    items: PublicationsItem[];
  };
  contact: {
    title: string;
    form: {
      name: string;
      email: string;
      message: string;
      send: string;
    };
    info: {
      address: string;
      phone: string;
      email: string;
    };
  };
  footer: {
    desc: string;
    navTitle: string;
    resTitle: string;
    contactTitle: string;
  };
}

// Component Props
export interface PageProps {
  lang: Language;
  content: Record<Language, LocaleContent>;
}

export interface LayoutProps extends PageProps {
  children: React.ReactNode;
  setLang: (lang: Language) => void;
}

// Additional types for API responses
export interface PublicationListItem {
  id: number;
  title_en: string;
  title_ar: string;
  category: string;
  category_display: string;
  published_date: string;
  is_featured: boolean;
}

export interface EventListItem {
  id: number;
  title_en: string;
  title_ar: string;
  date: string;
  location: string;
  is_online: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  phone?: string;
  subject?: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
  id?: number;
  errors?: Record<string, string[]>;
}
