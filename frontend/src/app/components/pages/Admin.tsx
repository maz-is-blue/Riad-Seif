import { useEffect, useMemo, useState } from "react";
import { content as defaultContent } from "../../utils/content";
import {
  fetchSiteContent,
  loginAdmin,
  changeAdminPassword,
  updateSiteContent,
  adminListNews,
  adminUpsertNews,
  adminDeleteNews,
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

type FieldType = "text" | "textarea" | "date" | "checkbox" | "number";

type FieldDef = {
  name: string;
  label: { en: string; ar: string };
  type?: FieldType;
  placeholder?: { en?: string; ar?: string };
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
  | "team"
  | "publications"
  | "events"
  | "memory"
  | "archive";

const resourceConfigs: Record<ResourceKey, ResourceConfig> = {
  news: {
    title: { en: "News Updates", ar: "الأخبار" },
    fields: [
      { name: "title_en", label: { en: "Title (EN)", ar: "العنوان (EN)" } },
      { name: "title_ar", label: { en: "Title (AR)", ar: "العنوان (AR)" } },
      { name: "summary_en", label: { en: "Summary (EN)", ar: "الملخص (EN)" }, type: "textarea" },
      { name: "summary_ar", label: { en: "Summary (AR)", ar: "الملخص (AR)" }, type: "textarea" },
      { name: "content_en", label: { en: "Content (EN)", ar: "المحتوى (EN)" }, type: "textarea" },
      { name: "content_ar", label: { en: "Content (AR)", ar: "المحتوى (AR)" }, type: "textarea" },
      { name: "image_url", label: { en: "Image URL", ar: "رابط الصورة" } },
      { name: "external_link", label: { en: "External Link", ar: "رابط خارجي" } },
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
      image_url: "",
      external_link: "",
      published_date: "",
      is_featured: false,
      is_published: true,
    },
  },
  team: {
    title: { en: "Team Members", ar: "الفريق" },
    fields: [
      { name: "name_en", label: { en: "Name (EN)", ar: "الاسم (EN)" } },
      { name: "name_ar", label: { en: "Name (AR)", ar: "الاسم (AR)" } },
      { name: "role_en", label: { en: "Role (EN)", ar: "الدور (EN)" } },
      { name: "role_ar", label: { en: "Role (AR)", ar: "الدور (AR)" } },
      { name: "bio_en", label: { en: "Bio (EN)", ar: "النبذة (EN)" }, type: "textarea" },
      { name: "bio_ar", label: { en: "Bio (AR)", ar: "النبذة (AR)" }, type: "textarea" },
      { name: "photo_url", label: { en: "Photo URL", ar: "رابط الصورة" } },
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
      photo_url: "",
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
      { name: "category", label: { en: "Category", ar: "التصنيف" } },
      { name: "pdf_url", label: { en: "PDF URL", ar: "رابط PDF" } },
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
      category: "",
      pdf_url: "",
      published_date: "",
    },
  },
  events: {
    title: { en: "Forum Events", ar: "فعاليات المنتدى" },
    fields: [
      { name: "title_en", label: { en: "Title (EN)", ar: "العنوان (EN)" } },
      { name: "title_ar", label: { en: "Title (AR)", ar: "العنوان (AR)" } },
      { name: "description_en", label: { en: "Description (EN)", ar: "الوصف (EN)" }, type: "textarea" },
      { name: "description_ar", label: { en: "Description (AR)", ar: "الوصف (AR)" }, type: "textarea" },
      { name: "event_type", label: { en: "Event Type", ar: "نوع الفعالية" } },
      { name: "date", label: { en: "Start Date", ar: "تاريخ البداية" }, type: "date" },
      { name: "end_date", label: { en: "End Date", ar: "تاريخ النهاية" }, type: "date" },
      { name: "location", label: { en: "Location", ar: "الموقع" } },
      { name: "is_online", label: { en: "Online", ar: "عبر الإنترنت" }, type: "checkbox" },
      { name: "online_link", label: { en: "Online Link", ar: "رابط المشاركة" } },
      { name: "registration_url", label: { en: "Registration URL", ar: "رابط التسجيل" } },
      { name: "cover_url", label: { en: "Cover Image URL", ar: "رابط الغلاف" } },
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
      cover_url: "",
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
      { name: "image_url", label: { en: "Image URL", ar: "رابط الصورة" } },
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
      image_url: "",
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
      { name: "external_link", label: { en: "External Link", ar: "رابط خارجي" } },
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
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordStatus, setPasswordStatus] = useState("");
  const [activeRoot, setActiveRoot] = useState("ar");
  const [activeMode, setActiveMode] = useState<"content" | "resource">("content");
  const [activeContentKey, setActiveContentKey] = useState("home");
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
    setDraft(content);
  }, [content]);

  const rootKeys = useMemo(() => Object.keys(draft ?? {}), [draft]);

  useEffect(() => {
    if (!rootKeys.includes(activeRoot) && rootKeys.length > 0) {
      setActiveRoot(rootKeys[0]);
    }
  }, [activeRoot, rootKeys]);

  const isPlainObject = (value: unknown) =>
    value !== null && typeof value === "object" && !Array.isArray(value);

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
    setSaving(true);
    updateSiteContent(draft as unknown as Record<string, unknown>, token)
      .then((response) => {
        const payload = response?.content as SiteContent;
        onContentUpdate(payload);
        setStatus(isRTL ? "تم الحفظ بنجاح." : "Saved successfully.");
      })
      .catch((error) => {
        const message =
          error?.detail ??
          (error?.status === 401
            ? isRTL
              ? "غير مصرح. يرجى تسجيل الدخول."
              : "Unauthorized. Please log in."
            : isRTL
            ? "فشل الحفظ على الخادم."
            : "Failed to save to server.");
        setStatus(Array.isArray(message) ? message[0] : message);
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const handleReset = () => {
    if (!token) {
      setStatus(isRTL ? "يرجى تسجيل الدخول أولاً." : "Please log in first.");
      return;
    }
    updateSiteContent(defaultContent as unknown as Record<string, unknown>, token)
      .then(() => {
        onContentUpdate(defaultContent as SiteContent);
        setDraft(defaultContent as SiteContent);
        setStatus(isRTL ? "تمت العودة إلى النسخة الافتراضية." : "Reset to defaults.");
      })
      .catch(() => {
        setStatus(isRTL ? "تعذر إعادة الضبط." : "Reset failed.");
      });
  };

  const handleLoadServer = () => {
    fetchSiteContent()
      .then((response) => {
        const payload = response?.content;
        if (payload && Object.keys(payload).length > 0) {
          setDraft(payload as SiteContent);
          onContentUpdate(payload as SiteContent);
          setStatus(isRTL ? "تم التحميل من الخادم." : "Loaded from server.");
        } else {
          setStatus(isRTL ? "لا يوجد محتوى محفوظ على الخادم." : "No server content found.");
        }
      })
      .catch(() => {
        setStatus(isRTL ? "فشل التحميل من الخادم." : "Failed to load from server.");
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

  const handlePasswordChange = () => {
    if (!token) {
      setPasswordStatus(isRTL ? "يرجى تسجيل الدخول أولاً." : "Please log in first.");
      return;
    }
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordStatus(isRTL ? "يرجى تعبئة جميع الحقول." : "Please fill in all fields.");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordStatus(isRTL ? "كلمتا المرور غير متطابقتين." : "Passwords do not match.");
      return;
    }
    changeAdminPassword(token, passwordForm.currentPassword, passwordForm.newPassword)
      .then((response) => {
        setPasswordStatus(
          response?.detail ?? (isRTL ? "تم تحديث كلمة المرور." : "Password updated."),
        );
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      })
      .catch((error) => {
        const message =
          error?.detail?.[0] ??
          error?.detail ??
          (isRTL ? "فشل تحديث كلمة المرور." : "Password update failed.");
        setPasswordStatus(Array.isArray(message) ? message[0] : message);
      });
  };

  const handleFieldChange = (path: Array<string | number>, value: any) => {
    setDraft((prev) => updateAtPath(prev, path, value));
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

  const renderValue = (value: any, path: Array<string | number>, label: string, depth: number) => {
    const keyLabel = label || path[path.length - 1]?.toString() || "";
    if (typeof value === "string") {
      if (!matchesSearch(keyLabel) && !matchesSearch(pathToString(path))) return null;
      const useTextarea = value.length > 120 || value.includes("\n");
      const isUrl = /url|image|photo|cover|logo/i.test(keyLabel);
      return (
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-500">{toLabel(keyLabel)}</label>
          {useTextarea ? (
            <textarea
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm leading-6"
              rows={4}
              value={value}
              onChange={(event) => handleFieldChange(path, event.target.value)}
            />
          ) : (
            <input
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={value}
              onChange={(event) => handleFieldChange(path, event.target.value)}
            />
          )}
          {isUrl && value && value.startsWith("http") ? (
            <img src={value} alt={keyLabel} className="mt-2 max-h-40 rounded-md border" />
          ) : null}
        </div>
      );
    }
    if (typeof value === "number") {
      if (!matchesSearch(keyLabel) && !matchesSearch(pathToString(path))) return null;
      return (
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-500">{toLabel(keyLabel)}</label>
          <input
            type="number"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            value={value}
            onChange={(event) => handleFieldChange(path, Number(event.target.value))}
          />
        </div>
      );
    }
    if (typeof value === "boolean") {
      if (!matchesSearch(keyLabel) && !matchesSearch(pathToString(path))) return null;
      return (
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={value}
            onChange={(event) => handleFieldChange(path, event.target.checked)}
          />
          {toLabel(keyLabel)}
        </label>
      );
    }
    if (Array.isArray(value)) {
      if (!matchesSearch(keyLabel) && !matchesSearch(pathToString(path))) return null;
      const template = value.length > 0 ? value[0] : "";
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-[#1c3944]">{toLabel(keyLabel)}</div>
            <button
              type="button"
              className="text-sm text-[#1c3944] font-semibold"
              onClick={() => handleAddArrayItem(path, template)}
            >
              {isRTL ? "إضافة عنصر" : "Add Item"}
            </button>
          </div>
          {value.map((item, index) => (
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
                      onClick={() => moveArrayItem(path, index, index - 1)}
                    >
                      {isRTL ? "أعلى" : "Up"}
                    </button>
                  )}
                  {index < value.length - 1 && (
                    <button
                      type="button"
                      className="text-xs text-slate-600"
                      onClick={() => moveArrayItem(path, index, index + 1)}
                    >
                      {isRTL ? "أسفل" : "Down"}
                    </button>
                  )}
                  <button
                    type="button"
                    className="text-xs text-red-600 hover:text-red-800"
                    onClick={() => handleRemoveArrayItem([...path, index])}
                  >
                    {isRTL ? "حذف" : "Remove"}
                  </button>
                </div>
              </div>
              {renderValue(item, [...path, index], `${keyLabel} ${index + 1}`, depth + 1)}
            </div>
          ))}
        </div>
      );
    }
    if (isPlainObject(value)) {
      const sectionKey = pathToString(path);
      const isCollapsed = collapsed.has(sectionKey);
      const entries = Object.entries(value).filter(([key]) => matchesSearch(key) || matchesSearch(sectionKey));
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
              {entries.map(([key, nested]) => (
                <div key={`${path.join(".")}-${key}`} className="bg-white border border-slate-200 rounded-lg p-4">
                  {renderValue(nested, [...path, key], key, depth + 1)}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return <div className="text-sm text-slate-500">{isRTL ? "نوع غير مدعوم" : "Unsupported type"}</div>;
  };

  const contentSections = useMemo(
    () => [
      { key: "home", label: isRTL ? "الرئيسية" : "Home", path: ["home"] },
      { key: "about", label: isRTL ? "عن المؤسسة" : "About Us", path: ["about"] },
      { key: "jumana", label: isRTL ? "جمانة سيف" : "Joumana Seif", path: ["jumana"] },
      { key: "founder", label: isRTL ? "عن رياض سيف" : "About Riad Seif", path: ["founder"] },
      { key: "center", label: isRTL ? "مركز حقوق الإنسان" : "Human Rights Center", path: ["center"] },
      { key: "forum", label: isRTL ? "منتدى الحوار" : "Dialogue Forum", path: ["forum"] },
      { key: "publications", label: isRTL ? "الإصدارات" : "Publications", path: ["publications"] },
      { key: "contact", label: isRTL ? "اتصل بنا" : "Contact", path: ["contact"] },
      { key: "footer", label: isRTL ? "تذييل الموقع" : "Footer", path: ["footer"] },
      { key: "topBar", label: isRTL ? "الشريط العلوي" : "Top Bar", path: ["topBar"] },
      { key: "nav", label: isRTL ? "القائمة" : "Navigation", path: ["nav"] },
      { key: "hero", label: isRTL ? "واجهة الموقع" : "Hero", path: ["hero"] },
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
  }, [activeMode, activeContentKey, activeRoot]);

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
    const config = resourceConfigs[key];
    const payload = resourceState[key].form;
    config
      .upsert(token, payload, resourceState[key].editingId ?? undefined)
      .then(() => {
        setResourceStatus(isRTL ? "تم الحفظ." : "Saved.");
        handleResourceNew(key);
        loadResource(key);
      })
      .catch(() => {
        setResourceStatus(isRTL ? "فشل الحفظ." : "Save failed.");
      });
  };

  const handleResourceDelete = (key: ResourceKey, id: number) => {
    if (!token) return;
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

  const activeSection = contentSections.find((section) => section.key === activeContentKey) ??
    contentSections[0];
  const activeSectionPath = [activeRoot, ...(activeSection?.path ?? [])];
  const activeSectionValue = activeSectionPath.reduce(
    (acc, key) => (acc ? acc[key as keyof typeof acc] : undefined),
    draft as any,
  );

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-3xl lg:text-4xl font-semibold text-[#1c3944]">
            {isRTL ? "لوحة التحكم" : "Admin Dashboard"}
          </h1>
          <p className="text-slate-600 leading-7">
            {isRTL
              ? "يمكنك تعديل كل النصوص والبيانات من خلال الحقول أدناه."
              : "Edit all website content using the fields below."}
          </p>
        </div>

        {token ? (
          <>
            <div className="grid lg:grid-cols-[220px_minmax(0,1fr)] gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-6">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                  {isRTL ? "صفحات الموقع" : "Pages"}
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
                  {isRTL ? "البيانات الديناميكية" : "Dynamic Data"}
                </div>
                <div className="flex flex-col gap-2">
                  {(Object.keys(resourceConfigs) as ResourceKey[]).map((key) => {
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
            </div>

            <div className="space-y-6">
              {activeMode === "content" ? (
                <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {rootKeys.map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setActiveRoot(key)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          activeRoot === key
                            ? "bg-[#1c3944] text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {toLabel(key)}
                      </button>
                    ))}
                  </div>

                  <input
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    placeholder={isRTL ? "ابحث عن حقل..." : "Search fields..."}
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />

                  {activeSectionValue === undefined ? (
                    <div className="text-sm text-slate-500">
                      {isRTL ? "لا يوجد محتوى لهذا القسم." : "No content found for this section."}
                    </div>
                  ) : (
                    renderValue(activeSectionValue, activeSectionPath, activeSection.label, 0)
                  )}

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
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      className="w-full rounded-lg border border-slate-300 text-slate-700 px-4 py-3 hover:bg-slate-100"
                      onClick={handleLoadServer}
                    >
                      {isRTL ? "تحميل من الخادم" : "Load From Server"}
                    </button>
                    <button
                      type="button"
                      className="w-full rounded-lg border border-red-200 text-red-700 px-4 py-3 hover:bg-red-50"
                      onClick={handleReset}
                    >
                      {isRTL ? "إعادة الضبط" : "Reset to Default"}
                    </button>
                  </div>
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
                        if (field.type === "textarea") {
                          return (
                            <div key={field.name} className="space-y-2">
                              <label className="block text-xs font-semibold text-slate-500">{label}</label>
                              <textarea
                                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm leading-6"
                                rows={4}
                                value={value}
                                onChange={(event) =>
                                  handleResourceChange(activeResourceKey, field.name, event.target.value)
                                }
                              />
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
            <div className="mt-10 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <div className="text-lg font-semibold text-[#1c3944]">
                {isRTL ? "إعدادات الحساب" : "Account Settings"}
              </div>
              <div className="text-sm text-slate-600">
                {isRTL ? "يمكنك تغيير كلمة مرور لوحة التحكم من هنا." : "Update the dashboard password here."}
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-500">
                    {isRTL ? "كلمة المرور الحالية" : "Current Password"}
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    value={passwordForm.currentPassword}
                    onChange={(event) =>
                      setPasswordForm({ ...passwordForm, currentPassword: event.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-500">
                    {isRTL ? "كلمة المرور الجديدة" : "New Password"}
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    value={passwordForm.newPassword}
                    onChange={(event) =>
                      setPasswordForm({ ...passwordForm, newPassword: event.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-500">
                    {isRTL ? "تأكيد كلمة المرور" : "Confirm Password"}
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    value={passwordForm.confirmPassword}
                    onChange={(event) =>
                      setPasswordForm({ ...passwordForm, confirmPassword: event.target.value })
                    }
                  />
                </div>
              </div>
              <button
                type="button"
                className="w-full md:w-auto rounded-lg bg-[#1c3944] text-white px-4 py-2 hover:bg-[#122c35]"
                onClick={handlePasswordChange}
              >
                {isRTL ? "تحديث كلمة المرور" : "Update Password"}
              </button>
              {passwordStatus && <div className="text-sm text-slate-600">{passwordStatus}</div>}
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
