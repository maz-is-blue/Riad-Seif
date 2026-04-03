const RAW_API_BASE_URL = ((import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() || "/api");
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

export type AdminUser = {
  id: number;
  username: string;
  email?: string;
  is_superuser?: boolean;
  role?: string;
  permissions?: Record<string, { view?: boolean; edit?: boolean; delete?: boolean }>;
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

export type JobOpportunity = {
  id: number;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  requirements_en: string;
  requirements_ar: string;
  apply_info_en: string;
  apply_info_ar: string;
  is_active?: boolean;
  created_at?: string;
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
  const rawText = await response.text().catch(() => "");
  const payload = rawText ? (() => {
    try {
      return JSON.parse(rawText);
    } catch {
      return null;
    }
  })() : null;
  if (!response.ok) {
    const firstNestedError = (obj: unknown): string => {
      if (!obj || typeof obj !== "object") return "";
      for (const value of Object.values(obj as Record<string, unknown>)) {
        if (Array.isArray(value) && typeof value[0] === "string") {
          return value[0];
        }
        if (typeof value === "string") {
          return value;
        }
      }
      return "";
    };

    const detailFromPayload =
      (payload && typeof payload === "object" && "detail" in payload && typeof (payload as any).detail === "string")
        ? (payload as any).detail
        : "";
    const messageFromPayload =
      (payload && typeof payload === "object" && "message" in payload && typeof (payload as any).message === "string")
        ? (payload as any).message
        : "";
    const validationFromPayload =
      (payload && typeof payload === "object" && "errors" in payload)
        ? firstNestedError((payload as any).errors)
        : "";
    const detail =
      detailFromPayload ||
      messageFromPayload ||
      validationFromPayload ||
      `${response.status} ${response.statusText}`.trim() ||
      "Request failed";
    throw { status: response.status, detail, ...(payload ?? {}) };
  }
  return (payload ?? (rawText as unknown)) as T;
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

function normalizePublicationCategory(input: unknown) {
  const raw = String(input ?? "").trim().toLowerCase();
  if (!raw) return "article";
  if (["report", "تقرير"].includes(raw)) return "report";
  if (["policy_brief", "policy brief", "سياسات", "ورقة سياسات"].includes(raw)) return "policy_brief";
  if (["manual", "دليل"].includes(raw)) return "manual";
  if (["research", "بحث"].includes(raw)) return "research";
  if (["archive", "ارشيف", "أرشيف"].includes(raw)) return "archive";
  if (["article", "مقال"].includes(raw)) return "article";
  return "article";
}

function normalizeEventType(input: unknown) {
  const raw = String(input ?? "").trim().toLowerCase();
  if (!raw) return "dialogue";
  if (["dialogue", "جلسة حوار", "حوار"].includes(raw)) return "dialogue";
  if (["workshop", "ورشة", "ورشة عمل"].includes(raw)) return "workshop";
  if (["conference", "مؤتمر"].includes(raw)) return "conference";
  if (["webinar", "ندوة", "ندوة عبر الإنترنت"].includes(raw)) return "webinar";
  if (["training", "تدريب"].includes(raw)) return "training";
  return "dialogue";
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

export async function fetchAdminMe(token: string) {
  return request<AdminUser>("/auth/me/", {
    headers: authHeaders(token),
  });
}

export async function listAdminUsers(token: string) {
  return request<AdminUser[]>("/auth/users/", {
    headers: authHeaders(token),
  });
}

export async function createAdminUser(token: string, payload: Record<string, any>) {
  return request<{ detail: string; id: number }>("/auth/users/", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders(token) },
    body: JSON.stringify(payload),
  });
}

export async function updateAdminUser(token: string, userId: number, payload: Record<string, any>) {
  return request<{ detail: string }>(`/auth/users/${userId}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders(token) },
    body: JSON.stringify(payload),
  });
}

export async function deleteAdminUser(token: string, userId: number) {
  return request<{ detail: string }>(`/auth/users/${userId}/`, {
    method: "DELETE",
    headers: authHeaders(token),
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

export async function uploadMedia(token: string, file: File) {
  const form = new FormData();
  form.append("file", file);
  return request<{ url: string }>("/upload/", {
    method: "POST",
    headers: {
      ...authHeaders(token),
    },
    body: form,
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
  const response = await request<NewsUpdate[] | PaginatedResponse<NewsUpdate>>("/news/");
  return normalizeList(response);
}

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  const response = await request<TeamMember[] | PaginatedResponse<TeamMember>>("/team/");
  return normalizeList(response);
}

export async function fetchForumEvents(): Promise<ForumEvent[]> {
  const response = await request<ForumEvent[] | PaginatedResponse<ForumEvent>>("/events/");
  return normalizeList(response);
}

export async function fetchMemoryPhotos(): Promise<MemoryPhoto[]> {
  const response = await request<MemoryPhoto[] | PaginatedResponse<MemoryPhoto>>("/memory/");
  return normalizeList(response);
}

export async function fetchArchiveItems(): Promise<ArchiveItem[]> {
  const response = await request<ArchiveItem[] | PaginatedResponse<ArchiveItem>>("/archive/");
  return normalizeList(response);
}

export async function fetchJobs(): Promise<JobOpportunity[]> {
  const response = await request<JobOpportunity[] | PaginatedResponse<JobOpportunity>>("/jobs/");
  return normalizeList(response);
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
  const normalizedPayload = { ...payload };
  normalizedPayload.category = normalizePublicationCategory(normalizedPayload.category);
  delete normalizedPayload.pdf_url;
  delete normalizedPayload.cover_url;
  const body = toFormData(normalizedPayload);
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
  const normalizedPayload = { ...payload };
  normalizedPayload.event_type = normalizeEventType(normalizedPayload.event_type);
  const body = toFormData(normalizedPayload);
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

export async function adminListJobs(token: string) {
  const response = await request<JobOpportunity[] | PaginatedResponse<JobOpportunity>>(
    "/admin/jobs/",
    { headers: authHeaders(token) },
  );
  return normalizeList(response);
}

export async function adminUpsertJob(token: string, payload: Record<string, any>, id?: number) {
  const method = id ? "PATCH" : "POST";
  const path = id ? `/admin/jobs/${id}/` : "/admin/jobs/";
  const body = toFormData(payload);
  return request<JobOpportunity>(path, { method, headers: authHeaders(token), body });
}

export async function adminDeleteJob(token: string, id: number) {
  return request<void>(`/admin/jobs/${id}/`, { method: "DELETE", headers: authHeaders(token) });
}
