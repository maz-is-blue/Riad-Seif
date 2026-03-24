const RAW_API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "http://127.0.0.1:8000/api";
const API_BASE_URL = RAW_API_BASE_URL.replace(/\/+$/, "");

type PaginatedResponse<T> = {
  results?: T[];
};

export type Publication = {
  id: number;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  category: string;
  category_display: string;
  pdf_url: string | null;
  published_date: string;
};

export type SiteContentBlob = {
  content: Record<string, unknown>;
  updated_at?: string;
};

export type NewsUpdate = {
  id: number;
  title_en: string;
  title_ar: string;
  summary_en: string;
  summary_ar: string;
  content_en?: string;
  content_ar?: string;
  image_url?: string | null;
  external_link?: string;
  published_date: string;
  is_featured: boolean;
  is_published?: boolean;
};

export type TeamMember = {
  id: number;
  name_en: string;
  name_ar: string;
  role_en: string;
  role_ar: string;
  bio_en?: string;
  bio_ar?: string;
  photo_url?: string | null;
  email?: string;
  linkedin_url?: string;
  is_active?: boolean;
  order?: number;
};

export type ForumEvent = {
  id: number;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  event_type: string;
  date: string;
  end_date?: string | null;
  location?: string;
  is_online?: boolean;
  online_link?: string;
  registration_url?: string;
  cover_url?: string | null;
  is_featured?: boolean;
  is_published?: boolean;
};

export type MemoryPhoto = {
  id: number;
  title_en: string;
  title_ar: string;
  description_en?: string;
  description_ar?: string;
  image_url?: string | null;
  date?: string;
  is_published?: boolean;
  order?: number;
};

export type ArchiveItem = {
  id: number;
  title_en: string;
  title_ar: string;
  description_en?: string;
  description_ar?: string;
  date?: string;
  external_link?: string;
  is_published?: boolean;
  order?: number;
};

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  phone?: string;
  subject?: string;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, init);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

function normalizeList<T>(payload: T[] | PaginatedResponse<T>) {
  if (Array.isArray(payload)) return payload;
  return payload.results ?? [];
}

function authHeaders(token?: string) {
  return token ? { Authorization: `Token ${token}` } : {};
}

function toFormData(payload: Record<string, any>) {
  const form = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }
    form.append(key, value as any);
  });
  return form;
}

export async function loginAdmin(username: string, password: string) {
  return request<{ token: string }>("/auth/token/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
}

export async function changeAdminPassword(
  token: string,
  currentPassword: string,
  newPassword: string,
) {
  return request<{ detail: string }>("/auth/change-password/", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders(token) },
    body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
  });
}

export async function fetchSiteContent(): Promise<SiteContentBlob> {
  return request<SiteContentBlob>("/content/site-content/");
}

export async function updateSiteContent(content: Record<string, unknown>, token: string) {
  return request<SiteContentBlob>("/content/site-content/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(token),
    },
    body: JSON.stringify({ content }),
  });
}

export async function fetchPublications(): Promise<Publication[]> {
  const response = await request<Publication[] | PaginatedResponse<Publication>>("/publications/");
  if (Array.isArray(response)) {
    return response;
  }
  return response.results ?? [];
}

export async function submitContact(payload: ContactPayload) {
  return request<{ success: boolean; message?: string; message_ar?: string }>(
    "/contact/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        message: payload.message,
        phone: payload.phone ?? "",
        subject: payload.subject ?? "",
      }),
    },
  );
}

export async function fetchNewsUpdates(): Promise<NewsUpdate[]> {
  return request<NewsUpdate[]>("/news/");
}

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  return request<TeamMember[]>("/team/");
}

export async function fetchForumEvents(): Promise<ForumEvent[]> {
  return request<ForumEvent[]>("/events/");
}

export async function fetchMemoryPhotos(): Promise<MemoryPhoto[]> {
  return request<MemoryPhoto[]>("/memory/");
}

export async function fetchArchiveItems(): Promise<ArchiveItem[]> {
  return request<ArchiveItem[]>("/archive/");
}

// Admin CRUD
export async function adminListNews(token: string) {
  const response = await request<NewsUpdate[] | PaginatedResponse<NewsUpdate>>(
    "/admin/news/",
    { headers: authHeaders(token) },
  );
  return normalizeList(response);
}

export async function adminUpsertNews(token: string, payload: Record<string, any>, id?: number) {
  const method = id ? "PATCH" : "POST";
  const path = id ? `/admin/news/${id}/` : "/admin/news/";
  const body = toFormData(payload);
  return request<NewsUpdate>(path, { method, headers: authHeaders(token), body });
}

export async function adminDeleteNews(token: string, id: number) {
  return request<void>(`/admin/news/${id}/`, { method: "DELETE", headers: authHeaders(token) });
}

export async function adminListTeam(token: string) {
  const response = await request<TeamMember[] | PaginatedResponse<TeamMember>>(
    "/admin/team/",
    { headers: authHeaders(token) },
  );
  return normalizeList(response);
}

export async function adminUpsertTeam(token: string, payload: Record<string, any>, id?: number) {
  const method = id ? "PATCH" : "POST";
  const path = id ? `/admin/team/${id}/` : "/admin/team/";
  const body = toFormData(payload);
  return request<TeamMember>(path, { method, headers: authHeaders(token), body });
}

export async function adminDeleteTeam(token: string, id: number) {
  return request<void>(`/admin/team/${id}/`, { method: "DELETE", headers: authHeaders(token) });
}

export async function adminListPublications(token: string) {
  const response = await request<Publication[] | PaginatedResponse<Publication>>(
    "/admin/publications/",
    { headers: authHeaders(token) },
  );
  return normalizeList(response);
}

export async function adminUpsertPublication(token: string, payload: Record<string, any>, id?: number) {
  const method = id ? "PATCH" : "POST";
  const path = id ? `/admin/publications/${id}/` : "/admin/publications/";
  const body = toFormData(payload);
  return request<Publication>(path, { method, headers: authHeaders(token), body });
}

export async function adminDeletePublication(token: string, id: number) {
  return request<void>(`/admin/publications/${id}/`, { method: "DELETE", headers: authHeaders(token) });
}

export async function adminListEvents(token: string) {
  const response = await request<ForumEvent[] | PaginatedResponse<ForumEvent>>(
    "/admin/events/",
    { headers: authHeaders(token) },
  );
  return normalizeList(response);
}

export async function adminUpsertEvent(token: string, payload: Record<string, any>, id?: number) {
  const method = id ? "PATCH" : "POST";
  const path = id ? `/admin/events/${id}/` : "/admin/events/";
  const body = toFormData(payload);
  return request<ForumEvent>(path, { method, headers: authHeaders(token), body });
}

export async function adminDeleteEvent(token: string, id: number) {
  return request<void>(`/admin/events/${id}/`, { method: "DELETE", headers: authHeaders(token) });
}

export async function adminListMemory(token: string) {
  const response = await request<MemoryPhoto[] | PaginatedResponse<MemoryPhoto>>(
    "/admin/memory/",
    { headers: authHeaders(token) },
  );
  return normalizeList(response);
}

export async function adminUpsertMemory(token: string, payload: Record<string, any>, id?: number) {
  const method = id ? "PATCH" : "POST";
  const path = id ? `/admin/memory/${id}/` : "/admin/memory/";
  const body = toFormData(payload);
  return request<MemoryPhoto>(path, { method, headers: authHeaders(token), body });
}

export async function adminDeleteMemory(token: string, id: number) {
  return request<void>(`/admin/memory/${id}/`, { method: "DELETE", headers: authHeaders(token) });
}

export async function adminListArchive(token: string) {
  const response = await request<ArchiveItem[] | PaginatedResponse<ArchiveItem>>(
    "/admin/archive/",
    { headers: authHeaders(token) },
  );
  return normalizeList(response);
}

export async function adminUpsertArchive(token: string, payload: Record<string, any>, id?: number) {
  const method = id ? "PATCH" : "POST";
  const path = id ? `/admin/archive/${id}/` : "/admin/archive/";
  const body = toFormData(payload);
  return request<ArchiveItem>(path, { method, headers: authHeaders(token), body });
}

export async function adminDeleteArchive(token: string, id: number) {
  return request<void>(`/admin/archive/${id}/`, { method: "DELETE", headers: authHeaders(token) });
}
