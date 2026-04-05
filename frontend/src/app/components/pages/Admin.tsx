import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { content as defaultContent } from "../../utils/content";
import RichTextEditor from "../RichTextEditor";
import {
  updateSiteContent,
  loginAdmin,
  uploadMedia,
  fetchAdminMe,
  adminListNews,
  adminUpsertNews,
  adminDeleteNews,
  adminListJobs,
  adminUpsertJob,
  adminDeleteJob,
  adminListTeam,
  adminUpsertTeam,
  adminDeleteTeam,
  adminListPublications,
  adminUpsertPublication,
  adminDeletePublication,
  adminListEvents,
  adminUpsertEvent,
  adminDeleteEvent,
  adminListMemory,
  adminUpsertMemory,
  adminDeleteMemory,
  adminListArchive,
  adminUpsertArchive,
  adminDeleteArchive,
} from "../../utils/api";
import { type SiteContent } from "../../utils/contentStore";

const toLabel = (value: string) =>
  value
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const pathToString = (path: Array<string | number>) => path.join(".");

type FieldType = "text" | "textarea" | "date" | "checkbox" | "number" | "file" | "select";

type FieldDef = {
  name: string;
  label: { en: string; ar: string };
  type?: FieldType;
  placeholder?: { en?: string; ar?: string };
  options?: Array<{ value: string; label: { en: string; ar: string } }>;
};

type ResourceConfig = {
  title: { en: string; ar: string };
  fields: FieldDef[];
  list: (token: string) => Promise<any[]>;
  upsert: (token: string, payload: Record<string, any>, id?: number) => Promise<any>;
  remove: (token: string, id: number) => Promise<any>;
  summary: (item: any, lang: string) => string;
  initial: Record<string, any>;
};

type ResourceKey =
  | "news"
  | "jobs"
  | "team"
  | "publications"
  | "events"
  | "memory"
  | "archive";

const resourceConfigs: Record<ResourceKey, ResourceConfig> = {
  news: {
    title: { en: "News Updates", ar: "أحدث الأخبار" },
    fields: [
      { name: "title_en", label: { en: "Title (EN)", ar: "العنوان (EN)" } },
      { name: "title_ar", label: { en: "Title (AR)", ar: "العنوان (AR)" } },
      { name: "summary_en", label: { en: "Summary (EN)", ar: "الملخص (EN)" }, type: "textarea" },
      { name: "summary_ar", label: { en: "Summary (AR)", ar: "الملخص (AR)" }, type: "textarea" },
      { name: "content_en", label: { en: "Content (EN)", ar: "المحتوى (EN)" }, type: "textarea" },
      { name: "content_ar", label: { en: "Content (AR)", ar: "المحتوى (AR)" }, type: "textarea" },
      { name: "image_upload_url", label: { en: "Image URL (Optional)", ar: "رابط الصورة (اختياري)" } },
      { name: "external_link", label: { en: "External Link", ar: "الرابط الخارجي" } },
      { name: "published_date", label: { en: "Published Date", ar: "تاريخ النشر" }, type: "date" },
      { name: "is_featured", label: { en: "Featured", ar: "مميز" }, type: "checkbox" },
      { name: "is_published", label: { en: "Published", ar: "منشور" }, type: "checkbox" },
    ],
    list: adminListNews,
    upsert: adminUpsertNews,
    remove: adminDeleteNews,
    summary: (item, lang) => (lang === "ar" ? item.title_ar : item.title_en),
    initial: {
      title_en: "",
      title_ar: "",
      summary_en: "",
      summary_ar: "",
      content_en: "",
      content_ar: "",
      image_upload_url: "",
      external_link: "",
      published_date: "",
      is_featured: false,
      is_published: true,
    },
  },
  jobs: {
    title: { en: "Job Opportunities", ar: "الفرص الوظيفية" },
    fields: [
      { name: "title_en", label: { en: "Job Title (EN)", ar: "اسم الوظيفة (EN)" } },
      { name: "title_ar", label: { en: "Job Title (AR)", ar: "اسم الوظيفة (AR)" } },
      { name: "description_en", label: { en: "Description (EN)", ar: "الوصف (EN)" }, type: "textarea" },
      { name: "description_ar", label: { en: "Description (AR)", ar: "الوصف (AR)" }, type: "textarea" },
      { name: "requirements_en", label: { en: "Requirements (EN)", ar: "المتطلبات (EN)" }, type: "textarea" },
      { name: "requirements_ar", label: { en: "Requirements (AR)", ar: "المتطلبات (AR)" }, type: "textarea" },
      { name: "apply_info_en", label: { en: "How To Apply (EN)", ar: "طريقة التقديم (EN)" }, type: "textarea" },
      { name: "apply_info_ar", label: { en: "How To Apply (AR)", ar: "طريقة التقديم (AR)" }, type: "textarea" },
      { name: "is_active", label: { en: "Active", ar: "نشط" }, type: "checkbox" },
    ],
    list: adminListJobs,
    upsert: adminUpsertJob,
    remove: adminDeleteJob,
    summary: (item, lang) => (lang === "ar" ? item.title_ar : item.title_en),
    initial: {
      title_en: "",
      title_ar: "",
      description_en: "",
      description_ar: "",
      requirements_en: "",
      requirements_ar: "",
      apply_info_en: "",
      apply_info_ar: "",
      is_active: true,
    },
  },
  team: {
    title: { en: "Team Members", ar: "الفريق" },
    fields: [
      { name: "name_en", label: { en: "Name (EN)", ar: "الاسم (EN)" } },
      { name: "name_ar", label: { en: "Name (AR)", ar: "الاسم (AR)" } },
      { name: "role_en", label: { en: "Role (EN)", ar: "المنصب (EN)" } },
      { name: "role_ar", label: { en: "Role (AR)", ar: "المنصب (AR)" } },
      { name: "bio_en", label: { en: "Bio (EN)", ar: "السيرة (EN)" }, type: "textarea" },
      { name: "bio_ar", label: { en: "Bio (AR)", ar: "السيرة (AR)" }, type: "textarea" },
      { name: "photo_upload_url", label: { en: "Photo URL", ar: "رابط الصورة" } },
      { name: "email", label: { en: "Email", ar: "البريد الإلكتروني" } },
      { name: "linkedin_url", label: { en: "LinkedIn URL", ar: "رابط لينكدإن" } },
      { name: "order", label: { en: "Order", ar: "الترتيب" }, type: "number" },
      { name: "is_active", label: { en: "Active", ar: "نشط" }, type: "checkbox" },
    ],
    list: adminListTeam,
    upsert: adminUpsertTeam,
    remove: adminDeleteTeam,
    summary: (item, lang) => (lang === "ar" ? item.name_ar : item.name_en),
    initial: {
      name_en: "",
      name_ar: "",
      role_en: "",
      role_ar: "",
      bio_en: "",
      bio_ar: "",
      photo_upload_url: "",
      email: "",
      linkedin_url: "",
      order: 0,
      is_active: true,
    },
  },
  publications: {
    title: { en: "Publications", ar: "الإصدارات" },
    fields: [
      { name: "title_en", label: { en: "Title (EN)", ar: "العنوان (EN)" } },
      { name: "title_ar", label: { en: "Title (AR)", ar: "العنوان (AR)" } },
      { name: "description_en", label: { en: "Description (EN)", ar: "الوصف (EN)" }, type: "textarea" },
      { name: "description_ar", label: { en: "Description (AR)", ar: "الوصف (AR)" }, type: "textarea" },
      {
        name: "category",
        label: { en: "Category", ar: "التصنيف" },
        type: "select",
        options: [
          { value: "report", label: { en: "Report", ar: "تقرير" } },
          { value: "policy_brief", label: { en: "Policy Brief", ar: "ورقة سياسات" } },
          { value: "manual", label: { en: "Manual", ar: "دليل" } },
          { value: "research", label: { en: "Research", ar: "بحث" } },
          { value: "article", label: { en: "Article", ar: "مقال" } },
          { value: "archive", label: { en: "Archive", ar: "أرشيف" } },
        ],
      },
      { name: "pdf_file", label: { en: "PDF File", ar: "ملف PDF" }, type: "file" },
      { name: "published_date", label: { en: "Published Date", ar: "تاريخ النشر" }, type: "date" },
    ],
    list: adminListPublications,
    upsert: adminUpsertPublication,
    remove: adminDeletePublication,
    summary: (item, lang) => (lang === "ar" ? item.title_ar : item.title_en),
    initial: {
      title_en: "",
      title_ar: "",
      description_en: "",
      description_ar: "",
      category: "article",
      pdf_file: null,
      published_date: new Date().toISOString().slice(0, 10),
    },
  },
  events: {
    title: { en: "Forum Events", ar: "فعاليات المنتدى" },
    fields: [
      { name: "title_en", label: { en: "Title (EN)", ar: "العنوان (EN)" } },
      { name: "title_ar", label: { en: "Title (AR)", ar: "العنوان (AR)" } },
      { name: "description_en", label: { en: "Description (EN)", ar: "الوصف (EN)" }, type: "textarea" },
      { name: "description_ar", label: { en: "Description (AR)", ar: "الوصف (AR)" }, type: "textarea" },
      {
        name: "event_type",
        label: { en: "Event Type", ar: "نوع الفعالية" },
        type: "select",
        options: [
          { value: "dialogue", label: { en: "Dialogue Session", ar: "جلسة حوار" } },
          { value: "workshop", label: { en: "Workshop", ar: "ورشة عمل" } },
          { value: "conference", label: { en: "Conference", ar: "مؤتمر" } },
          { value: "webinar", label: { en: "Webinar", ar: "ندوة عبر الإنترنت" } },
          { value: "training", label: { en: "Training", ar: "تدريب" } },
        ],
      },
      { name: "date", label: { en: "Start Date", ar: "تاريخ البداية" }, type: "date" },
      { name: "end_date", label: { en: "End Date", ar: "تاريخ النهاية" }, type: "date" },
      { name: "location", label: { en: "Location", ar: "المكان" } },
      { name: "is_online", label: { en: "Online", ar: "عبر الإنترنت" }, type: "checkbox" },
      { name: "online_link", label: { en: "Online Link", ar: "رابط الحضور" } },
      { name: "registration_url", label: { en: "Registration URL", ar: "رابط التسجيل" } },
      { name: "cover_image", label: { en: "Cover Image", ar: "صورة الغلاف" }, type: "file" },
      { name: "is_featured", label: { en: "Featured", ar: "مميز" }, type: "checkbox" },
      { name: "is_published", label: { en: "Published", ar: "منشور" }, type: "checkbox" },
    ],
    list: adminListEvents,
    upsert: adminUpsertEvent,
    remove: adminDeleteEvent,
    summary: (item, lang) => (lang === "ar" ? item.title_ar : item.title_en),
    initial: {
      title_en: "",
      title_ar: "",
      description_en: "",
      description_ar: "",
      event_type: "",
      date: "",
      end_date: "",
      location: "",
      is_online: false,
      online_link: "",
      registration_url: "",
      cover_image: null,
      is_featured: false,
      is_published: true,
    },
  },
  memory: {
    title: { en: "Forum Memory", ar: "ذاكرة المنتدى" },
    fields: [
      { name: "title_en", label: { en: "Title (EN)", ar: "العنوان (EN)" } },
      { name: "title_ar", label: { en: "Title (AR)", ar: "العنوان (AR)" } },
      { name: "description_en", label: { en: "Description (EN)", ar: "الوصف (EN)" }, type: "textarea" },
      { name: "description_ar", label: { en: "Description (AR)", ar: "الوصف (AR)" }, type: "textarea" },
      { name: "image_upload_url", label: { en: "Image URL", ar: "رابط الصورة" } },
      { name: "date", label: { en: "Date", ar: "التاريخ" }, type: "date" },
      { name: "order", label: { en: "Order", ar: "الترتيب" }, type: "number" },
      { name: "is_published", label: { en: "Published", ar: "منشور" }, type: "checkbox" },
    ],
    list: adminListMemory,
    upsert: adminUpsertMemory,
    remove: adminDeleteMemory,
    summary: (item, lang) => (lang === "ar" ? item.title_ar : item.title_en),
    initial: {
      title_en: "",
      title_ar: "",
      description_en: "",
      description_ar: "",
      image_upload_url: "",
      date: "",
      order: 0,
      is_published: true,
    },
  },
  archive: {
    title: { en: "Forum Archive", ar: "أرشيف المنتدى" },
    fields: [
      { name: "title_en", label: { en: "Title (EN)", ar: "العنوان (EN)" } },
      { name: "title_ar", label: { en: "Title (AR)", ar: "العنوان (AR)" } },
      { name: "description_en", label: { en: "Description (EN)", ar: "الوصف (EN)" }, type: "textarea" },
      { name: "description_ar", label: { en: "Description (AR)", ar: "الوصف (AR)" }, type: "textarea" },
      { name: "date", label: { en: "Date", ar: "التاريخ" }, type: "date" },
      { name: "external_link", label: { en: "External Link", ar: "الرابط الخارجي" } },
      { name: "order", label: { en: "Order", ar: "الترتيب" }, type: "number" },
      { name: "is_published", label: { en: "Published", ar: "منشور" }, type: "checkbox" },
    ],
    list: adminListArchive,
    upsert: adminUpsertArchive,
    remove: adminDeleteArchive,
    summary: (item, lang) => (lang === "ar" ? item.title_ar : item.title_en),
    initial: {
      title_en: "",
      title_ar: "",
      description_en: "",
      description_ar: "",
      date: "",
      external_link: "",
      order: 0,
      is_published: true,
    },
  },
};

export default function Admin({ lang, content, onContentUpdate }) {
  const isRTL = lang === "ar";
  const [draft, setDraft] = useState<SiteContent>(content);
  const [status, setStatus] = useState("");
  const [resourceStatus, setResourceStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [token, setToken] = useState(() => window.localStorage.getItem("rs_admin_token") ?? "");
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [adminPermissions, setAdminPermissions] = useState<Record<string, any>>({});
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [activeMode, setActiveMode] = useState<"content" | "resource">("content");
  const [activeContentKey, setActiveContentKey] = useState("home-hero-1");
  const [activeResourceKey, setActiveResourceKey] = useState<ResourceKey>("news");
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState(() => new Set<string>());
  const [resourceState, setResourceState] = useState(() => {
    const initial = {} as Record<ResourceKey, {
      items: any[];
      form: Record<string, any>;
      editingId: number | null;
      loading: boolean;
      error: string;
    }>;
    (Object.keys(resourceConfigs) as ResourceKey[]).forEach((key) => {
      initial[key] = {
        items: [],
        form: { ...resourceConfigs[key].initial },
        editingId: null,
        loading: false,
        error: "",
      };
    });
    return initial;
  });

  useEffect(() => {
    setDraft(normalizeContentForAdmin(mergeContent(defaultContent as SiteContent, content as SiteContent)));
  }, [content]);

  useEffect(() => {
    if (!token) return;
    fetchAdminMe(token)
      .then((data) => {
        setAdminPermissions(data?.permissions ?? {});
        setIsSuperAdmin(Boolean(data?.is_superuser));
      })
      .catch(() => {
        setAdminPermissions({});
        setIsSuperAdmin(false);
      });
  }, [token]);

  const isPlainObject = (value: unknown) =>
    value !== null && typeof value === "object" && !Array.isArray(value);

  const isSharedMediaPath = (path: Array<string | number>) =>
    typeof path[0] === "string" &&
    ["en", "ar"].includes(path[0] as string) &&
    /(image|photo|cover|logo|portrait|hero|background|bg|banner|thumbnail|avatar|icon)/i.test(
      String(path[path.length - 1] ?? ""),
    );

  const isSharedMediaKey = (key: string) =>
    /(image|photo|cover|logo|portrait|hero|background|bg|banner|thumbnail|avatar|icon)/i.test(key);

  const syncSharedMediaNodes = (arNode: any, enNode: any): [any, any] => {
    if (Array.isArray(arNode) || Array.isArray(enNode)) {
      const arArr = Array.isArray(arNode) ? arNode : [];
      const enArr = Array.isArray(enNode) ? enNode : [];
      const length = Math.max(arArr.length, enArr.length);
      const nextAr = new Array(length);
      const nextEn = new Array(length);
      for (let i = 0; i < length; i += 1) {
        const [syncedAr, syncedEn] = syncSharedMediaNodes(arArr[i], enArr[i]);
        nextAr[i] = syncedAr;
        nextEn[i] = syncedEn;
      }
      return [nextAr, nextEn];
    }

    if (isPlainObject(arNode) || isPlainObject(enNode)) {
      const arObj = isPlainObject(arNode) ? arNode : {};
      const enObj = isPlainObject(enNode) ? enNode : {};
      const keys = new Set([...Object.keys(arObj), ...Object.keys(enObj)]);
      const nextAr: Record<string, unknown> = {};
      const nextEn: Record<string, unknown> = {};

      keys.forEach((key) => {
        const arValue = arObj[key];
        const enValue = enObj[key];
        if (
          isSharedMediaKey(key) &&
          (typeof arValue === "string" || typeof enValue === "string")
        ) {
          const sharedValue = String(arValue || enValue || "");
          nextAr[key] = sharedValue;
          nextEn[key] = sharedValue;
          return;
        }
        const [syncedAr, syncedEn] = syncSharedMediaNodes(arValue, enValue);
        nextAr[key] = syncedAr;
        nextEn[key] = syncedEn;
      });
      return [nextAr, nextEn];
    }

    return [arNode, enNode];
  };

  const syncSharedMediaContent = (value: any) => {
    if (!isPlainObject(value) || !value?.ar || !value?.en) return value;
    const [ar, en] = syncSharedMediaNodes(value.ar, value.en);
    return { ...value, ar, en };
  };

  const mergeContent = (base: any, override: any): any => {
    if (override === undefined || override === null) return base;
    if (Array.isArray(base)) {
      return Array.isArray(override) ? override : base;
    }
    if (isPlainObject(base)) {
      if (!isPlainObject(override)) return override;
      const result: Record<string, any> = { ...base };
      Object.keys(override).forEach((key) => {
        result[key] = mergeContent(base?.[key], override[key]);
      });
      return result;
    }
    return override;
  };

  const normalizeHeroSlide = (slide: any) => {
    if (!isPlainObject(slide)) return slide;
    const normalized = { ...slide };
    const titleAr = normalized.titleAr ?? normalized.title_ar ?? normalized.title?.ar;
    const titleEn = normalized.titleEn ?? normalized.title_en ?? normalized.title?.en;
    const descAr = normalized.descAr ?? normalized.desc_ar ?? normalized.description?.ar;
    const descEn = normalized.descEn ?? normalized.desc_en ?? normalized.description?.en;

    if (titleAr !== undefined) normalized.titleAr = titleAr;
    if (titleEn !== undefined) normalized.titleEn = titleEn;
    if (descAr !== undefined) normalized.descAr = descAr;
    if (descEn !== undefined) normalized.descEn = descEn;

    delete normalized.title_ar;
    delete normalized.title_en;
    delete normalized.desc_ar;
    delete normalized.desc_en;
    delete normalized.title;
    delete normalized.description;
    return normalized;
  };

  const getLegacyLangSuffix = (key: string): { base: string; lang: "ar" | "en" } | null => {
    if (/_ar$/i.test(key)) return { base: key.replace(/_ar$/i, ""), lang: "ar" };
    if (/_en$/i.test(key)) return { base: key.replace(/_en$/i, ""), lang: "en" };
    if (/Ar$/.test(key)) return { base: key.slice(0, -2), lang: "ar" };
    if (/En$/.test(key)) return { base: key.slice(0, -2), lang: "en" };
    return null;
  };

  const normalizeLegacyBilingualNodes = (arNode: any, enNode: any): [any, any] => {
    if (Array.isArray(arNode) || Array.isArray(enNode)) {
      const arArr = Array.isArray(arNode) ? arNode : [];
      const enArr = Array.isArray(enNode) ? enNode : [];
      const length = Math.max(arArr.length, enArr.length);
      const nextAr = new Array(length);
      const nextEn = new Array(length);
      for (let i = 0; i < length; i += 1) {
        const [childAr, childEn] = normalizeLegacyBilingualNodes(arArr[i], enArr[i]);
        nextAr[i] = childAr;
        nextEn[i] = childEn;
      }
      return [nextAr, nextEn];
    }

    if (isPlainObject(arNode) || isPlainObject(enNode)) {
      const arObj = isPlainObject(arNode) ? arNode : {};
      const enObj = isPlainObject(enNode) ? enNode : {};
      const allKeys = new Set([...Object.keys(arObj), ...Object.keys(enObj)]);

      const aliasValues: Record<string, { ar?: any; en?: any }> = {};
      const passthroughKeys = new Set<string>();

      allKeys.forEach((key) => {
        const legacy = getLegacyLangSuffix(key);
        if (!legacy || !legacy.base) {
          passthroughKeys.add(key);
          return;
        }
        if (!aliasValues[legacy.base]) aliasValues[legacy.base] = {};
        const arValue = arObj[key];
        const enValue = enObj[key];
        if (legacy.lang === "ar") {
          if (arValue !== undefined) aliasValues[legacy.base].ar = arValue;
          else if (enValue !== undefined && aliasValues[legacy.base].ar === undefined) {
            aliasValues[legacy.base].ar = enValue;
          }
        } else {
          if (enValue !== undefined) aliasValues[legacy.base].en = enValue;
          else if (arValue !== undefined && aliasValues[legacy.base].en === undefined) {
            aliasValues[legacy.base].en = arValue;
          }
        }
      });

      const mergedKeys = new Set<string>([
        ...Array.from(passthroughKeys),
        ...Object.keys(aliasValues),
      ]);

      const nextAr: Record<string, any> = {};
      const nextEn: Record<string, any> = {};

      mergedKeys.forEach((key) => {
        const fallback = aliasValues[key];
        const arValue = arObj[key] !== undefined ? arObj[key] : fallback?.ar;
        const enValue = enObj[key] !== undefined ? enObj[key] : fallback?.en;
        const [childAr, childEn] = normalizeLegacyBilingualNodes(arValue, enValue);
        nextAr[key] = childAr;
        nextEn[key] = childEn;
      });

      return [nextAr, nextEn];
    }

    return [arNode, enNode];
  };

  const normalizeContentForAdmin = (value: any): any => {
    if (!isPlainObject(value)) return value;
    const next = { ...value } as any;
    (["ar", "en"] as const).forEach((locale) => {
      const slides = next?.[locale]?.home?.heroSlides;
      if (Array.isArray(slides)) {
        next[locale] = {
          ...next[locale],
          home: {
            ...next[locale].home,
            heroSlides: slides.map(normalizeHeroSlide),
          },
        };
      }
    });
    if (isPlainObject(next?.ar) || isPlainObject(next?.en)) {
      const [normalizedAr, normalizedEn] = normalizeLegacyBilingualNodes(next?.ar, next?.en);
      next.ar = normalizedAr;
      next.en = normalizedEn;
    }
    return syncSharedMediaContent(next);
  };

  const updateAtPath = (value: any, path: Array<string | number>, nextValue: any) => {
    if (path.length === 0) return nextValue;
    const [head, ...rest] = path;
    if (Array.isArray(value)) {
      const copy = value.slice();
      copy[head as number] = updateAtPath(copy[head as number], rest, nextValue);
      return copy;
    }
    if (isPlainObject(value)) {
      return {
        ...value,
        [head]: updateAtPath(value[head as string], rest, nextValue),
      };
    }
    return value;
  };

  const removeAtPath = (value: any, path: Array<string | number>) => {
    if (path.length === 0) return value;
    const [head, ...rest] = path;
    if (Array.isArray(value)) {
      const copy = value.slice();
      if (rest.length === 0) {
        copy.splice(head as number, 1);
        return copy;
      }
      copy[head as number] = removeAtPath(copy[head as number], rest);
      return copy;
    }
    if (isPlainObject(value)) {
      return {
        ...value,
        [head]: removeAtPath(value[head as string], rest),
      };
    }
    return value;
  };

  const moveArrayItem = (path: Array<string | number>, from: number, to: number) => {
    setDraft((prev) => {
      const target = path.reduce((acc, key) => (acc ? acc[key as any] : undefined), prev as any);
      if (!Array.isArray(target)) return prev;
      const copy = target.slice();
      const [item] = copy.splice(from, 1);
      copy.splice(to, 0, item);
      return updateAtPath(prev, path, copy);
    });
  };

  const handleSave = () => {
    if (!token) {
      setStatus(isRTL ? "يرجى تسجيل الدخول أولاً." : "Please log in first.");
      return;
    }
    if (!isSuperAdmin && !adminPermissions?.content?.edit) {
      setStatus(isRTL ? "ليس لديك صلاحية التعديل." : "You do not have edit permission.");
      return;
    }
    setSaving(true);
    const normalizedDraft = normalizeContentForAdmin(draft);
    updateSiteContent(normalizedDraft as unknown as Record<string, unknown>, token)
      .then((response) => {
        const payload = normalizeContentForAdmin(response?.content as SiteContent);
        onContentUpdate(payload);
        setDraft(payload);
        setStatus(isRTL ? "تم حفظ التغييرات بنجاح." : "Saved successfully.");
      })
      .catch((error) => {
        const firstErrorKey = error && typeof error === "object" ? Object.keys(error).find((k) => !["status", "detail"].includes(k)) : "";
        const firstErrorValue = firstErrorKey ? error[firstErrorKey] : "";
        const message =
          (typeof error?.detail === "string" ? error.detail : "") ||
          (Array.isArray(error?.detail) ? error.detail[0] : "") ||
          (typeof firstErrorValue === "string" ? firstErrorValue : "") ||
          (Array.isArray(firstErrorValue) ? firstErrorValue[0] : "") ||
          (error?.status === 401
            ? isRTL
              ? "غير مصرح. يرجى تسجيل الدخول."
              : "Unauthorized. Please log in."
            : isRTL
            ? "فشل حفظ التغييرات على الخادم."
            : "Failed to save to server.");
        setStatus(Array.isArray(message) ? message[0] : message);
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const handleLogin = () => {
    if (!credentials.username || !credentials.password) {
      setStatus(isRTL ? "أدخل بيانات الدخول." : "Enter credentials.");
      return;
    }
    loginAdmin(credentials.username, credentials.password)
      .then((response) => {
        window.localStorage.setItem("rs_admin_token", response.token);
        setToken(response.token);
        setStatus(isRTL ? "تم تسجيل الدخول." : "Logged in.");
      })
      .catch(() => {
        setStatus(isRTL ? "فشل تسجيل الدخول." : "Login failed.");
      });
  };

  const handleLogout = () => {
    window.localStorage.removeItem("rs_admin_token");
    setToken("");
    setStatus(isRTL ? "تم تسجيل الخروج." : "Logged out.");
  };


  const canEditResource = (key) => isSuperAdmin || Boolean(adminPermissions?.[key]?.edit);
  const canDeleteResource = (key) => isSuperAdmin || Boolean(adminPermissions?.[key]?.delete);
  const handleFieldChange = (path: Array<string | number>, value: any) => {
    setDraft((prev) => {
      const next = updateAtPath(prev, path, value);
      if (!isSharedMediaPath(path)) {
        return next;
      }
      const siblingRoot = path[0] === "en" ? "ar" : "en";
      return updateAtPath(next, [siblingRoot, ...path.slice(1)], value);
    });
  };

  const handleAddArrayItem = (path: Array<string | number>, template: any) => {
    setDraft((prev) => {
      const target = path.reduce((acc, key) => (acc ? acc[key as any] : undefined), prev as any);
      if (!Array.isArray(target)) return prev;
      const nextItem = template ?? "";
      const nextArray = target.concat([nextItem]);
      return updateAtPath(prev, path, nextArray);
    });
  };

  const handleRemoveArrayItem = (path: Array<string | number>) => {
    setDraft((prev) => removeAtPath(prev, path));
  };

  const toggleCollapsed = (path: Array<string | number>) => {
    const key = pathToString(path);
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const matchesSearch = (label: string) => {
    if (!search.trim()) return true;
    return label.toLowerCase().includes(search.trim().toLowerCase());
  };

  const getByPath = (root: "ar" | "en", path: Array<string | number>) =>
    [root, ...path].reduce((acc, key) => (acc ? acc[key as keyof typeof acc] : undefined), draft as any);

  const setBilingualPathValue = (path: Array<string | number>, value: any) => {
    handleFieldChange(["ar", ...path], value);
    handleFieldChange(["en", ...path], value);
  };

  const moveBilingualArrayItem = (path: Array<string | number>, from: number, to: number) => {
    setDraft((prev) => {
      const moveOne = (lang: "ar" | "en", source: any) => {
        const listPath = [lang, ...path];
        const target = listPath.reduce((acc, key) => (acc ? acc[key as any] : undefined), source as any);
        if (!Array.isArray(target)) return source;
        const copy = target.slice();
        const [item] = copy.splice(from, 1);
        copy.splice(to, 0, item);
        return updateAtPath(source, listPath, copy);
      };
      return moveOne("en", moveOne("ar", prev));
    });
  };

  const addBilingualArrayItem = (path: Array<string | number>, templateAr: any, templateEn: any) => {
    setDraft((prev) => {
      const addOne = (lang: "ar" | "en", item: any, source: any) => {
        const listPath = [lang, ...path];
        const target = listPath.reduce((acc, key) => (acc ? acc[key as any] : undefined), source as any);
        if (!Array.isArray(target)) return source;
        return updateAtPath(source, listPath, target.concat([item]));
      };
      return addOne("en", templateEn, addOne("ar", templateAr, prev));
    });
  };

  const removeBilingualArrayItem = (path: Array<string | number>, index: number) => {
    setDraft((prev) => {
      const removeOne = (lang: "ar" | "en", source: any) => removeAtPath(source, [lang, ...path, index]);
      return removeOne("en", removeOne("ar", prev));
    });
  };

  const renderBilingualValue = (
    arValue: any,
    enValue: any,
    path: Array<string | number>,
    label: string,
    depth: number,
  ) => {
    const keyLabel = label || path[path.length - 1]?.toString() || "";
    const pathText = pathToString(path);
    const isUrl = /url|image|photo|cover|logo|portrait/i.test(keyLabel);
    const isLongText = /text|description|summary|content|quote|message|bio|lead|requirements|apply/i.test(keyLabel);
    const fieldIsExplicitLanguageKey = /(?:_ar|_en)$/i.test(keyLabel) || /(Ar|En)$/.test(keyLabel);
    const isBoolean =
      typeof arValue === "boolean" ||
      typeof enValue === "boolean";
    const isNumber =
      (typeof arValue === "number" || typeof enValue === "number") && !isBoolean;
    const isString =
      typeof arValue === "string" ||
      typeof enValue === "string";
    const normalizedAr = arValue ?? (isNumber ? 0 : isBoolean ? false : "");
    const normalizedEn = enValue ?? (isNumber ? 0 : isBoolean ? false : "");

    if (Array.isArray(arValue) || Array.isArray(enValue)) {
      if (!matchesSearch(keyLabel) && !matchesSearch(pathText)) return null;
      const listAr = Array.isArray(arValue) ? arValue : [];
      const listEn = Array.isArray(enValue) ? enValue : [];
      const maxItems = Math.max(listAr.length, listEn.length);
      const templateAr = listAr[0] ?? "";
      const templateEn = listEn[0] ?? templateAr;
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-[#1c3944]">{toLabel(keyLabel)}</div>
            <button
              type="button"
              className="text-sm text-[#1c3944] font-semibold"
              onClick={() => addBilingualArrayItem(path, templateAr, templateEn)}
            >
              {isRTL ? "إضافة عنصر" : "Add Item"}
            </button>
          </div>
          {Array.from({ length: maxItems }).map((_, index) => (
            <div key={`${path.join(".")}-${index}`} className="rounded-lg border border-slate-200 p-3 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">
                  {isRTL ? "عنصر" : "Item"} {index + 1}
                </span>
                <div className="flex gap-2">
                  {index > 0 && (
                    <button
                      type="button"
                      className="text-xs text-slate-600"
                      onClick={() => moveBilingualArrayItem(path, index, index - 1)}
                    >
                      {isRTL ? "أعلى" : "Up"}
                    </button>
                  )}
                  {index < maxItems - 1 && (
                    <button
                      type="button"
                      className="text-xs text-slate-600"
                      onClick={() => moveBilingualArrayItem(path, index, index + 1)}
                    >
                      {isRTL ? "أسفل" : "Down"}
                    </button>
                  )}
                  <button
                    type="button"
                    className="text-xs text-red-600 hover:text-red-800"
                    onClick={() => removeBilingualArrayItem(path, index)}
                  >
                    {isRTL ? "حذف" : "Remove"}
                  </button>
                </div>
              </div>
              {renderBilingualValue(listAr[index], listEn[index], [...path, index], `${keyLabel} ${index + 1}`, depth + 1)}
            </div>
          ))}
        </div>
      );
    }

    if (isPlainObject(arValue) || isPlainObject(enValue)) {
      const arObj = isPlainObject(arValue) ? arValue : {};
      const enObj = isPlainObject(enValue) ? enValue : {};
      const sectionKey = pathText;
      const isCollapsed = collapsed.has(sectionKey);
      const keys = Array.from(new Set([...Object.keys(arObj), ...Object.keys(enObj)]));
      const entries = keys.filter((key) => matchesSearch(key) || matchesSearch(sectionKey));
      if (!entries.length && search.trim()) return null;
      return (
        <div className="space-y-3">
          {path.length > 0 && (
            <button
              type="button"
              className="w-full flex items-center justify-between text-left bg-slate-100 rounded-lg px-3 py-2"
              onClick={() => toggleCollapsed(path)}
            >
              <span className="text-sm font-semibold text-[#1c3944]">{toLabel(keyLabel)}</span>
              <span className="text-xs text-slate-500">
                {isCollapsed ? (isRTL ? "إظهار" : "Show") : isRTL ? "إخفاء" : "Hide"}
              </span>
            </button>
          )}
          {!isCollapsed && (
            <div className="space-y-4">
              {entries.map((key) => (
                <div key={`${path.join(".")}-${key}`} className="bg-white border border-slate-200 rounded-lg p-4">
                  {renderBilingualValue(arObj[key], enObj[key], [...path, key], key, depth + 1)}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (!matchesSearch(keyLabel) && !matchesSearch(pathText)) return null;

    if (isUrl) {
      const sharedPath = ["ar", ...path];
      const pathKey = pathToString(sharedPath);
      const urlValue = normalizedAr || normalizedEn || "";
      return (
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-500">{toLabel(keyLabel)}</label>
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            value={urlValue}
            onChange={(event) => setBilingualPathValue(path, event.target.value)}
          />
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file || !token) return;
                setUploading((prev) => ({ ...prev, [pathKey]: true }));
                uploadMedia(token, file)
                  .then((res) => {
                    if (res?.url) {
                      setBilingualPathValue(path, res.url);
                    }
                  })
                  .catch(() => {
                    setStatus(isRTL ? "فشل رفع الصورة." : "Image upload failed.");
                  })
                  .finally(() => {
                    setUploading((prev) => ({ ...prev, [pathKey]: false }));
                  });
              }}
            />
            {uploading[pathKey] ? (isRTL ? "جارٍ الرفع..." : "Uploading...") : null}
            <span>{isRTL ? "سيتم استخدام الصورة نفسها في العربية والإنجليزية." : "This image will be shared across Arabic and English."}</span>
          </div>
          {urlValue && String(urlValue).startsWith("http") ? (
            <img src={urlValue} alt={keyLabel} className="mt-2 max-h-40 rounded-md border" />
          ) : null}
        </div>
      );
    }

    if (isBoolean) {
      return (
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-500">{toLabel(keyLabel)}</label>
          <div className="grid md:grid-cols-2 gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={Boolean(normalizedAr)}
                onChange={(event) => handleFieldChange(["ar", ...path], event.target.checked)}
              />
              {isRTL ? `${toLabel(keyLabel)} Ar` : `${toLabel(keyLabel)} AR`}
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={Boolean(normalizedEn)}
                onChange={(event) => handleFieldChange(["en", ...path], event.target.checked)}
              />
              {isRTL ? `${toLabel(keyLabel)} En` : `${toLabel(keyLabel)} EN`}
            </label>
          </div>
        </div>
      );
    }

    if (isNumber) {
      return (
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-500">{toLabel(keyLabel)}</label>
          <div className="grid md:grid-cols-2 gap-3">
            <input
              type="number"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={normalizedAr}
              onChange={(event) => handleFieldChange(["ar", ...path], Number(event.target.value))}
              placeholder={`${toLabel(keyLabel)} AR`}
            />
            <input
              type="number"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={normalizedEn}
              onChange={(event) => handleFieldChange(["en", ...path], Number(event.target.value))}
              placeholder={`${toLabel(keyLabel)} EN`}
            />
          </div>
        </div>
      );
    }

    if (isString) {
      if (fieldIsExplicitLanguageKey) {
        const value = String(normalizedAr || normalizedEn || "");
        const renderAsRichText = value.length > 90 || value.includes("\n") || isLongText;
        return (
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-500">{toLabel(keyLabel)}</label>
            {renderAsRichText ? (
              <RichTextEditor value={value} onChange={(nextValue) => setBilingualPathValue(path, nextValue)} />
            ) : (
              <input
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                value={value}
                onChange={(event) => setBilingualPathValue(path, event.target.value)}
              />
            )}
          </div>
        );
      }
      const renderAsRichText =
        String(normalizedAr).length > 90 ||
        String(normalizedAr).includes("\n") ||
        String(normalizedEn).length > 90 ||
        String(normalizedEn).includes("\n") ||
        isLongText;
      return (
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-500">{toLabel(keyLabel)}</label>
          <div className="space-y-3">
            <div>
              <div className="mb-1 text-xs text-slate-500">{`${toLabel(keyLabel)} AR`}</div>
              {renderAsRichText ? (
                <RichTextEditor value={String(normalizedAr)} onChange={(nextValue) => handleFieldChange(["ar", ...path], nextValue)} />
              ) : (
                <input
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  value={String(normalizedAr)}
                  onChange={(event) => handleFieldChange(["ar", ...path], event.target.value)}
                />
              )}
            </div>
            <div>
              <div className="mb-1 text-xs text-slate-500">{`${toLabel(keyLabel)} EN`}</div>
              {renderAsRichText ? (
                <RichTextEditor value={String(normalizedEn)} onChange={(nextValue) => handleFieldChange(["en", ...path], nextValue)} />
              ) : (
                <input
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  value={String(normalizedEn)}
                  onChange={(event) => handleFieldChange(["en", ...path], event.target.value)}
                />
              )}
            </div>
          </div>
        </div>
      );
    }

    return <div className="text-sm text-slate-500">{isRTL ? "نوع غير مدعوم" : "Unsupported type"}</div>;
  };

  const contentSections = useMemo(
    () => [
      { key: "home-hero-1", label: isRTL ? "الرئيسية - الشريحة 1" : "Home - Slide 1", path: ["home", "heroSlides", 0] },
      { key: "home-hero-2", label: isRTL ? "الرئيسية - الشريحة 2" : "Home - Slide 2", path: ["home", "heroSlides", 1] },
      { key: "home-hero-3", label: isRTL ? "الرئيسية - الشريحة 3" : "Home - Slide 3", path: ["home", "heroSlides", 2] },
      { key: "home-hero-4", label: isRTL ? "الرئيسية - الشريحة 4" : "Home - Slide 4", path: ["home", "heroSlides", 3] },
      { key: "home-news", label: isRTL ? "الرئيسية - أحدث الأخبار" : "Home - Latest Updates", path: ["home", "newsSection"] },
      { key: "home-programs", label: isRTL ? "الرئيسية - البرامج" : "Home - Programs", path: ["home", "programsSection"] },
      { key: "home-center", label: isRTL ? "الرئيسية - مركز حقوق الإنسان" : "Home - Human Rights Center", path: ["home", "centerSection"] },
      { key: "home-foundation", label: isRTL ? "الرئيسية - عن المؤسسة" : "Home - About the Foundation", path: ["home", "aboutFoundationSection"] },
      { key: "home-quote", label: isRTL ? "الرئيسية - اقتباس رياض سيف" : "Home - Riad Seif Quote", path: ["home", "founderQuote"] },
      { key: "about", label: isRTL ? "عن المؤسسة" : "About Us", path: ["about"] },
      { key: "jumana", label: isRTL ? "جمانة سيف" : "Joumana Seif", path: ["jumana"] },
      { key: "founder", label: isRTL ? "عن رياض سيف" : "About Riad Seif", path: ["founder"] },
      { key: "center", label: isRTL ? "مركز حقوق الإنسان" : "Human Rights Center", path: ["center"] },
      { key: "forum", label: isRTL ? "منتدى الحوار" : "Dialogue Forum", path: ["forum"] },
      { key: "publications", label: isRTL ? "الإصدارات" : "Publications", path: ["publications"] },
      { key: "joinUs", label: isRTL ? "انضم إلينا" : "Join Us", path: ["joinUs"] },
      { key: "contact", label: isRTL ? "اتصل بنا" : "Contact", path: ["contact"] },
      { key: "footer", label: isRTL ? "تذييل الموقع" : "Footer", path: ["footer"] },
      { key: "footer-contact", label: isRTL ? "التذييل - بيانات التواصل" : "Footer - Contact Info", path: ["contact"] },
      { key: "topBar", label: isRTL ? "الشريط العلوي" : "Top Bar", path: ["topBar"] },
      { key: "nav", label: isRTL ? "التنقل" : "Navigation", path: ["nav"] },
    ],
    [isRTL],
  );

  const loadResource = (key: ResourceKey) => {
    if (!token) return;
    setResourceState((prev) => ({
      ...prev,
      [key]: { ...prev[key], loading: true, error: "" },
    }));
    resourceConfigs[key]
      .list(token)
      .then((items) => {
        setResourceState((prev) => ({
          ...prev,
          [key]: { ...prev[key], items: items ?? [], loading: false },
        }));
      })
      .catch(() => {
        setResourceState((prev) => ({
          ...prev,
          [key]: { ...prev[key], loading: false, error: isRTL ? "فشل التحميل." : "Failed to load." },
        }));
      });
  };

  useEffect(() => {
    if (activeMode === "resource" && token) {
      loadResource(activeResourceKey);
    }
  }, [activeMode, activeResourceKey, token]);

  useEffect(() => {
    if (activeMode === "content") {
      setSearch("");
      setCollapsed(new Set());
    }
  }, [activeMode, activeContentKey]);

  const handleResourceChange = (key: ResourceKey, field: string, value: any) => {
    setResourceState((prev) => ({
      ...prev,
      [key]: { ...prev[key], form: { ...prev[key].form, [field]: value } },
    }));
  };

  const handleResourceEdit = (key: ResourceKey, item: any) => {
    const config = resourceConfigs[key];
    const form = { ...config.initial };
    config.fields.forEach((field) => {
      form[field.name] = item[field.name] ?? form[field.name] ?? "";
    });
    setResourceState((prev) => ({
      ...prev,
      [key]: { ...prev[key], form, editingId: item.id ?? null },
    }));
  };

  const handleResourceNew = (key: ResourceKey) => {
    const config = resourceConfigs[key];
    setResourceState((prev) => ({
      ...prev,
      [key]: { ...prev[key], form: { ...config.initial }, editingId: null },
    }));
  };

  const handleResourceSave = (key: ResourceKey) => {
    if (!token) return;
    if (!canEditResource(key)) {
      setResourceStatus(isRTL ? "ليس لديك صلاحية التعديل." : "You do not have edit permission.");
      return;
    }
    const config = resourceConfigs[key];
    const payload = resourceState[key].form;
    config
      .upsert(token, payload, resourceState[key].editingId ?? undefined)
      .then(() => {
        setResourceStatus(isRTL ? "تم الحفظ." : "Saved.");
        handleResourceNew(key);
        loadResource(key);
      })
      .catch((error) => {
        const firstErrorKey = error && typeof error === "object" ? Object.keys(error).find((k) => !["status", "detail"].includes(k)) : "";
        const firstErrorValue = firstErrorKey ? error[firstErrorKey] : "";
        const parsedError =
          (typeof error?.detail === "string" ? error.detail : "") ||
          (Array.isArray(error?.detail) ? error.detail[0] : "") ||
          (typeof firstErrorValue === "string" ? firstErrorValue : "") ||
          (Array.isArray(firstErrorValue) ? firstErrorValue[0] : "") ||
          "";
        setResourceStatus(parsedError || (isRTL ? "فشل الحفظ." : "Save failed."));
      });
  };

  const handleResourceDelete = (key: ResourceKey, id: number) => {
    if (!token) return;
    if (!canDeleteResource(key)) {
      setResourceStatus(isRTL ? "ليس لديك صلاحية الحذف." : "You do not have delete permission.");
      return;
    }
    resourceConfigs[key]
      .remove(token, id)
      .then(() => {
        setResourceStatus(isRTL ? "تم الحذف." : "Deleted.");
        loadResource(key);
      })
      .catch(() => {
        setResourceStatus(isRTL ? "فشل الحذف." : "Delete failed.");
      });
  };

  const activeSection = contentSections.find((section) => section.key === activeContentKey) ?? contentSections[0];
  const activeBasePath = activeSection?.path ?? [];
  const activeArabicValue = getByPath("ar", activeBasePath);
  const activeEnglishValue = getByPath("en", activeBasePath);

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-3xl lg:text-4xl font-semibold text-[#1c3944]">
            {isRTL ? "لوحة التحكم" : "Admin Dashboard"}
          </h1>
          <p className="text-slate-600 leading-7">
            {isRTL
              ? "يمكنك تعديل جميع محتويات الموقع من خلال الحقول أدناه."
              : "Edit all website content using the fields below."}
          </p>
        </div>

        {token ? (
          <>
            <div className="grid lg:grid-cols-[220px_minmax(0,1fr)] gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-6">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                  {isRTL ? "أقسام الموقع" : "Pages"}
                </div>
                <div className="flex flex-col gap-2">
                  {contentSections.map((section) => {
                    const isActive = activeMode === "content" && activeContentKey === section.key;
                    return (
                      <button
                        key={section.key}
                        type="button"
                        onClick={() => {
                          setActiveMode("content");
                          setActiveContentKey(section.key);
                        }}
                        className={`text-sm rounded-lg px-3 py-2 text-left ${
                          isActive ? "bg-[#1c3944] text-white" : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {section.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                  {isRTL ? "المحتوى الديناميكي" : "Dynamic Data"}
                </div>
                <div className="flex flex-col gap-2">
                  {(Object.keys(resourceConfigs) as ResourceKey[])
                    .filter((key) => key !== "team")
                    .map((key) => {
                    const isActive = activeMode === "resource" && activeResourceKey === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setActiveMode("resource");
                          setActiveResourceKey(key);
                        }}
                        className={`text-sm rounded-lg px-3 py-2 text-left ${
                          isActive ? "bg-[#1c3944] text-white" : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {resourceConfigs[key].title[isRTL ? "ar" : "en"]}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <Link href="/admin/account">
                  <span className="text-sm font-semibold text-[#1c3944] cursor-pointer">
                    {isRTL ? "إعدادات الحساب" : "Account Settings"}
                    
                  </span>
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              {activeMode === "content" ? (
                <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-6">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    {isRTL
                      ? "الحقول العربية والإنجليزية تظهر معاً داخل الصفحة نفسها. الصور المشتركة ستُحدَّث في اللغتين معاً."
                      : "Arabic and English fields are shown together on the same page. Shared images will update both languages together."}
                  </div>

                  <input
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    placeholder={isRTL ? "ابحث عن حقل..." : "Search fields..."}
                    
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />

                  <div className="space-y-4 rounded-xl border border-slate-200 p-4">
                    {(activeArabicValue === undefined && activeEnglishValue === undefined) ? (
                      <div className="text-sm text-slate-500">
                        {isRTL ? "لا يوجد محتوى لهذا القسم." : "No content found for this section."}
                      </div>
                    ) : (
                      renderBilingualValue(activeArabicValue, activeEnglishValue, activeBasePath, activeSection.label, 0)
                    )}
                  </div>

                  <button
                    type="button"
                    className={`w-full rounded-lg px-4 py-3 text-white ${
                      saving ? "bg-slate-500" : "bg-[#1c3944] hover:bg-[#122c35]"
                    }`}
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? (isRTL ? "جارٍ الحفظ..." : "Saving...") : isRTL ? "حفظ التغييرات" : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    className="w-full rounded-lg border border-slate-300 text-slate-700 px-4 py-2 hover:bg-slate-100"
                    onClick={handleLogout}
                  >
                    {isRTL ? "تسجيل الخروج" : "Logout"}
                  </button>
                  {status && <div className="text-sm text-slate-600">{status}</div>}
                </div>
              ) : (
                <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-6">
                  <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold text-[#1c3944]">
                        {resourceConfigs[activeResourceKey].title[isRTL ? "ar" : "en"]}
                      </div>
                      <button
                        type="button"
                        className="text-sm text-[#1c3944] font-semibold"
                        onClick={() => handleResourceNew(activeResourceKey)}
                      >
                        {isRTL ? "عنصر جديد" : "New Item"}
                        
                      </button>
                    </div>
                    {resourceState[activeResourceKey].loading && (
                      <div className="text-sm text-slate-500">
                        {isRTL ? "جارٍ التحميل..." : "Loading..."}
                        
                      </div>
                    )}
                    {resourceState[activeResourceKey].error && (
                      <div className="text-sm text-red-600">{resourceState[activeResourceKey].error}</div>
                    )}
                    <div className="space-y-3">
                      {resourceState[activeResourceKey].items.map((item) => (
                        <div
                          key={item.id}
                          className="border border-slate-200 rounded-lg p-3 flex items-start justify-between gap-4"
                        >
                          <div>
                            <div className="font-semibold text-sm text-[#1c3944]">
                              {resourceConfigs[activeResourceKey].summary(item, lang)}
                            </div>
                            {item.published_date || item.date ? (
                              <div className="text-xs text-slate-500 mt-1">
                                {item.published_date ?? item.date}
                              </div>
                            ) : null}
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              className="text-xs text-slate-600"
                              onClick={() => handleResourceEdit(activeResourceKey, item)}
                            >
                              {isRTL ? "تعديل" : "Edit"}
                              
                            </button>
                            <button
                              type="button"
                              className="text-xs text-red-600"
                              onClick={() => handleResourceDelete(activeResourceKey, item.id)}
                            >
                              {isRTL ? "حذف" : "Delete"}
                              
                            </button>
                          </div>
                        </div>
                      ))}
                      {resourceState[activeResourceKey].items.length === 0 &&
                        !resourceState[activeResourceKey].loading && (
                          <div className="text-sm text-slate-500">
                            {isRTL ? "لا توجد عناصر بعد." : "No items yet."}
                            
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-4">
                    <div className="text-lg font-semibold text-[#1c3944]">
                      {resourceState[activeResourceKey].editingId
                        ? isRTL
                          ? "تعديل العنصر"
                          : "Edit Item"
                        : isRTL
                        ? "إضافة عنصر"
                        : "Add Item"}
                    </div>
                    <div className="space-y-3">
                      {resourceConfigs[activeResourceKey].fields.map((field) => {
                        const value = resourceState[activeResourceKey].form[field.name] ?? "";
                        const label = field.label[isRTL ? "ar" : "en"];
                        const isUrlField = /url|image|photo|cover|logo|portrait|pdf/i.test(field.name);
                        const uploadKey = `resource:${activeResourceKey}.${field.name}`;
                        const handleUploadUrl = (file: File) => {
                          if (!token) return;
                          setUploading((prev) => ({ ...prev, [uploadKey]: true }));
                          uploadMedia(token, file)
                            .then((res) => {
                              if (res?.url) {
                                handleResourceChange(activeResourceKey, field.name, res.url);
                              }
                            })
                            .catch(() => {
                              setResourceStatus(isRTL ? "فشل الرفع." : "Upload failed.");
                            })
                            .finally(() => {
                              setUploading((prev) => ({ ...prev, [uploadKey]: false }));
                            });
                        };
                        if (field.type === "file") {
                          const selectedName =
                            value && typeof value === "object" && "name" in value
                              ? (value as File).name
                              : "";
                          return (
                            <div key={field.name} className="space-y-2">
                              <label className="block text-xs font-semibold text-slate-500">{label}</label>
                              <input
                                type="file"
                                accept={field.name.toLowerCase().includes("pdf") ? "application/pdf" : "image/*"}
                                onChange={(event) => {
                                  const file = event.target.files?.[0];
                                  if (!file) return;
                                  handleResourceChange(activeResourceKey, field.name, file);
                                }}
                              />
                              {selectedName ? (
                                <div className="text-xs text-slate-500">
                                  {isRTL ? "الملف المحدد:" : "Selected file:"} {selectedName}
                                </div>
                              ) : null}
                            </div>
                          );
                        }
                        if (field.type === "textarea") {
                          return (
                            <div key={field.name} className="space-y-2">
                              <label className="block text-xs font-semibold text-slate-500">{label}</label>
                              <RichTextEditor
                                value={value}
                                onChange={(nextValue) =>
                                  handleResourceChange(activeResourceKey, field.name, nextValue)
                                }
                              />
                              {isUrlField ? (
                                <div className="flex items-center gap-3 text-xs text-slate-500">
                                  <input
                                    type="file"
                                    accept={field.name.toLowerCase().includes("pdf") ? "application/pdf" : "image/*"}
                                    onChange={(event) => {
                                      const file = event.target.files?.[0];
                                      if (!file) return;
                                      handleUploadUrl(file);
                                    }}
                                  />
                                  {uploading[uploadKey] ? (isRTL ? "جارٍ الرفع..." : "Uploading...") : null}
                                </div>
                              ) : null}
                            </div>
                          );
                        }
                        if (field.type === "checkbox") {
                          return (
                            <label key={field.name} className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                checked={Boolean(value)}
                                onChange={(event) =>
                                  handleResourceChange(activeResourceKey, field.name, event.target.checked)
                                }
                              />
                              {label}
                            </label>
                          );
                        }
                        if (field.type === "select") {
                          return (
                            <div key={field.name} className="space-y-2">
                              <label className="block text-xs font-semibold text-slate-500">{label}</label>
                              <select
                                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                                value={value}
                                onChange={(event) =>
                                  handleResourceChange(activeResourceKey, field.name, event.target.value)
                                }
                              >
                                {(field.options ?? []).map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label[isRTL ? "ar" : "en"]}
                                  </option>
                                ))}
                              </select>
                            </div>
                          );
                        }
                        return (
                          <div key={field.name} className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-500">{label}</label>
                            <input
                              type={field.type === "date" ? "date" : field.type === "number" ? "number" : "text"}
                              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                              value={value}
                              onChange={(event) =>
                                handleResourceChange(
                                  activeResourceKey,
                                  field.name,
                                  field.type === "number" ? Number(event.target.value) : event.target.value,
                                )
                              }
                            />
                            {isUrlField ? (
                              <div className="flex items-center gap-3 text-xs text-slate-500">
                                <input
                                  type="file"
                                  accept={field.name.toLowerCase().includes("pdf") ? "application/pdf" : "image/*"}
                                  onChange={(event) => {
                                    const file = event.target.files?.[0];
                                    if (!file) return;
                                    handleUploadUrl(file);
                                  }}
                                />
                                {uploading[uploadKey] ? (isRTL ? "جارٍ الرفع..." : "Uploading...") : null}
                              </div>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                    <button
                      type="button"
                      className="w-full rounded-lg bg-[#1c3944] text-white px-4 py-3 hover:bg-[#122c35]"
                      onClick={() => handleResourceSave(activeResourceKey)}
                    >
                      {isRTL ? "حفظ" : "Save"}
                    </button>
                    {resourceStatus && <div className="text-sm text-slate-600">{resourceStatus}</div>}
                  </div>
                </div>
              )}

            </div>
            </div>
          </>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl p-6 max-w-md">
              <h2 className="text-xl font-semibold text-[#1c3944] mb-4">
                {isRTL ? "تسجيل الدخول إلى لوحة التحكم" : "Sign in to Admin"}
                
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    {isRTL ? "اسم المستخدم" : "Username"}
                    
                  </label>
                  <input
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    value={credentials.username}
                    onChange={(event) =>
                      setCredentials({ ...credentials, username: event.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    {isRTL ? "كلمة المرور" : "Password"}
                    
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    value={credentials.password}
                    onChange={(event) =>
                      setCredentials({ ...credentials, password: event.target.value })
                    }
                  />
                </div>
                <button
                  type="button"
                  className="w-full rounded-lg bg-[#1c3944] text-white px-4 py-2 hover:bg-[#122c35]"
                  onClick={handleLogin}
                >
                  {isRTL ? "تسجيل الدخول" : "Login"}
                  
                </button>
                {status && <div className="text-sm text-slate-600">{status}</div>}
              </div>
            </div>
          )}
      </div>
    </section>
  );
}















