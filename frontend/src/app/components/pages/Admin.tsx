import { useMemo, useState } from "react";
import { clearContent, saveContent, type SiteContent } from "../../utils/contentStore";
import { content as defaultContent } from "../../utils/content";

export default function Admin({ lang, content, onContentUpdate }) {
  const isRTL = lang === "ar";
  const initialJson = useMemo(() => JSON.stringify(content, null, 2), [content]);
  const [rawJson, setRawJson] = useState(initialJson);
  const [status, setStatus] = useState("");

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
    saveContent(parsed);
    onContentUpdate(parsed);
    setStatus(isRTL ? "تم الحفظ بنجاح." : "Saved successfully.");
  };

  const handleReset = () => {
    clearContent();
    onContentUpdate(defaultContent);
    setRawJson(JSON.stringify(defaultContent, null, 2));
    setStatus(isRTL ? "تمت العودة إلى النسخة الافتراضية." : "Reset to defaults.");
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
            {status && (
              <div className="text-sm text-slate-600 mt-2">{status}</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
