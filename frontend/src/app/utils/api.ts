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
