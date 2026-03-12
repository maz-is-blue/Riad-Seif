import { useEffect, useMemo, useState } from "react";
import { content as defaultContent } from "../../utils/content";
import { fetchSiteContent, loginAdmin, updateSiteContent } from "../../utils/api";
import { type SiteContent } from "../../utils/contentStore";

export default function Admin({ lang, content, onContentUpdate }) {
  const isRTL = lang === "ar";
  const initialJson = useMemo(() => JSON.stringify(content, null, 2), [content]);
  const [rawJson, setRawJson] = useState(initialJson);
  const [status, setStatus] = useState("");
  const [token, setToken] = useState(() => window.localStorage.getItem("rs_admin_token") ?? "");
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  useEffect(() => {
    setRawJson(initialJson);
  }, [initialJson]);

  const tryParse = () => {
    try {
      const parsed = JSON.parse(rawJson) as SiteContent;
      if (!parsed || typeof parsed !== "object") {
        throw new Error("Invalid JSON structure.");
      }
      return parsed;
    } catch (error) {
      setStatus(isRTL ? "فشل التحقق من الصيغة." : "Validation failed.");
      return null;
    }
  };

  const handleValidate = () => {
    const parsed = tryParse();
    if (parsed) {
      setStatus(isRTL ? "الصيغة صحيحة." : "JSON is valid.");
    }
  };

  const handleSave = () => {
    const parsed = tryParse();
    if (!parsed) {
      return;
    }
    if (!token) {
      setStatus(isRTL ? "يرجى تسجيل الدخول أولاً." : "Please log in first.");
      return;
    }
    updateSiteContent(parsed as Record<string, unknown>, token)
      .then((response) => {
        const payload = response?.content as SiteContent;
        onContentUpdate(payload);
        setStatus(isRTL ? "تم الحفظ بنجاح." : "Saved successfully.");
      })
      .catch(() => {
        setStatus(isRTL ? "فشل الحفظ على الخادم." : "Failed to save to server.");
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
        setRawJson(JSON.stringify(defaultContent, null, 2));
        setStatus(isRTL ? "تمت العودة إلى النسخة الافتراضية." : "Reset to defaults.");
      })
      .catch(() => {
        setStatus(isRTL ? "تعذر إعادة الضبط." : "Reset failed.");
      });
  };

  const handleDownload = () => {
    const blob = new Blob([rawJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "site-content.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadServer = () => {
    fetchSiteContent()
      .then((response) => {
        const payload = response?.content;
        if (payload && Object.keys(payload).length > 0) {
          setRawJson(JSON.stringify(payload, null, 2));
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

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-3xl lg:text-4xl font-semibold text-[#1c3944]">
            {isRTL ? "لوحة التحكم" : "Admin Dashboard"}
          </h1>
          <p className="text-slate-600 leading-7">
            {isRTL
              ? "يمكنك تعديل محتوى الموقع بالكامل من خلال تحرير JSON أدناه. عند الحفظ سيتم استخدام المحتوى الجديد مباشرة."
              : "Edit the entire website content by updating the JSON below. Saving will apply the new content immediately."}
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_240px] gap-6">
          {token ? (
            <>
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <textarea
                  dir="ltr"
                  className="w-full h-[540px] font-mono text-sm leading-6 text-slate-800 focus:outline-none"
                  value={rawJson}
                  onChange={(event) => setRawJson(event.target.value)}
                />
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  className="w-full rounded-lg bg-[#1c3944] text-white px-4 py-3 hover:bg-[#122c35]"
                  onClick={handleSave}
                >
                  {isRTL ? "حفظ التغييرات" : "Save Changes"}
                </button>
                <button
                  type="button"
                  className="w-full rounded-lg border border-slate-300 text-slate-700 px-4 py-3 hover:bg-slate-100"
                  onClick={handleValidate}
                >
                  {isRTL ? "تحقق من الصيغة" : "Validate JSON"}
                </button>
                <button
                  type="button"
                  className="w-full rounded-lg border border-slate-300 text-slate-700 px-4 py-3 hover:bg-slate-100"
                  onClick={handleLoadServer}
                >
                  {isRTL ? "تحميل من الخادم" : "Load From Server"}
                </button>
                <button
                  type="button"
                  className="w-full rounded-lg border border-slate-300 text-slate-700 px-4 py-3 hover:bg-slate-100"
                  onClick={handleDownload}
                >
                  {isRTL ? "تنزيل JSON" : "Download JSON"}
                </button>
                <button
                  type="button"
                  className="w-full rounded-lg border border-red-200 text-red-700 px-4 py-3 hover:bg-red-50"
                  onClick={handleReset}
                >
                  {isRTL ? "إعادة الضبط" : "Reset to Default"}
                </button>
                <button
                  type="button"
                  className="w-full rounded-lg border border-slate-300 text-slate-700 px-4 py-2 hover:bg-slate-100"
                  onClick={handleLogout}
                >
                  {isRTL ? "تسجيل الخروج" : "Logout"}
                </button>
                {status && <div className="text-sm text-slate-600 mt-2">{status}</div>}
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
      </div>
    </section>
  );
}
