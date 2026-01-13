import type {
  Publication,
  ContactSubmission,
  Event,
  SiteSettings,
  PageContent,
  TeamMember,
  NewsItem,
} from '../types';

const API_BASE = 'http://localhost:8000/api';

export const api = {
  publications: {
    list: async (): Promise<Publication[]> => {
      const res = await fetch(`${API_BASE}/publications/`);
      if (!res.ok) throw new Error('Failed to fetch publications');
      return res.json();
  },
    featured: async (): Promise<Publication[]> => {
      const res = await fetch(`${API_BASE}/publications/featured/`);
      if (!res.ok) throw new Error('Failed to fetch featured publications');
      return res.json();
  },
  },
  contact: {
    submit: async (data: {
      name: string;
      email: string;
      message: string;
    }): Promise<{ success: boolean }> => {
      const res = await fetch(`${API_BASE}/contact/`, {
      method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Failed to submit contact form');
      }
      return res.json();
    },
  },
  events: {
    list: async (): Promise<Event[]> => {
      const res = await fetch(`${API_BASE}/events/`);
      if (!res.ok) throw new Error('Failed to fetch events');
      return res.json();
    },
    upcoming: async (): Promise<Event[]> => {
      const res = await fetch(`${API_BASE}/events/upcoming/`);
      if (!res.ok) throw new Error('Failed to fetch upcoming events');
      return res.json();
    },
  },
  content: {
  settings: async (): Promise<SiteSettings> => {
      const res = await fetch(`${API_BASE}/content/settings/`);
      if (!res.ok) throw new Error('Failed to fetch site settings');
      return res.json();
    },
    page: async (slug: string): Promise<PageContent> => {
      const res = await fetch(`${API_BASE}/content/pages/${slug}/`);
      if (!res.ok) throw new Error(`Failed to fetch page content for ${slug}`);
      return res.json();
  },
  team: async (): Promise<TeamMember[]> => {
      const res = await fetch(`${API_BASE}/content/team/`);
      if (!res.ok) throw new Error('Failed to fetch team members');
      return res.json();
  },
    news: async (): Promise<NewsItem[]> => {
      const res = await fetch(`${API_BASE}/content/news/`);
      if (!res.ok) throw new Error('Failed to fetch news items');
      return res.json();
    },
  },
};

// Also export individual APIs for convenience
export const publicationsAPI = api.publications;
export const contactAPI = api.contact;
export const eventsAPI = api.events;
export const contentAPI = api.content;
