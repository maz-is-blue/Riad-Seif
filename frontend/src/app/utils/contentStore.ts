import { content as defaultContent } from "./content";

const STORAGE_KEY = "rs_content_v1";

export type SiteContent = typeof defaultContent;

export function loadContent(): SiteContent {
  if (typeof window === "undefined") {
    return defaultContent;
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return defaultContent;
  }
  try {
    const parsed = JSON.parse(stored) as SiteContent;
    if (!parsed || typeof parsed !== "object") {
      return defaultContent;
    }
    return parsed;
  } catch {
    return defaultContent;
  }
}

export function saveContent(next: SiteContent) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next, null, 2));
}

export function clearContent() {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem(STORAGE_KEY);
}
