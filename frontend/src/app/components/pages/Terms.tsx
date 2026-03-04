import React from "react";

export default function Terms({ lang, content }) {
  const t = content[lang];

  const sections =
    lang === "ar"
      ? [
          {
            title: "قبول الشروط",
            body: "باستخدامك لهذا الموقع، فإنك توافق على الالتزام بهذه الشروط والقوانين المعمول بها. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام الموقع.",
          },
          {
            title: "استخدام المحتوى",
            body: "جميع النصوص والمواد المنشورة لأغراض معرفية وتوعوية. لا يجوز إعادة نشر المحتوى أو نسخه لأغراض تجارية دون موافقة خطية مسبقة.",
          },
          {
            title: "روابط خارجية",
            body: "قد يحتوي الموقع على روابط لمواقع خارجية. نحن غير مسؤولين عن محتوى أو سياسات الخصوصية في تلك المواقع.",
          },
          {
            title: "تحديد المسؤولية",
            body: "نحن نبذل جهدًا معقولًا لضمان دقة المعلومات، لكننا لا نقدم ضمانًا كاملًا لعدم وجود أخطاء أو انقطاعات في الخدمة.",
          },
          {
            title: "التعديلات",
            body: "يحق لنا تعديل هذه الشروط في أي وقت. استمرارك في استخدام الموقع بعد نشر التعديلات يعني موافقتك على النسخة المحدثة.",
          },
        ]
      : [
          {
            title: "Acceptance of Terms",
            body: "By using this website, you agree to comply with these terms and applicable laws. If you do not agree with any part of these terms, do not use the website.",
          },
          {
            title: "Use of Content",
            body: "All published materials are provided for educational and informational purposes. You may not reproduce or republish content for commercial use without prior written permission.",
          },
          {
            title: "External Links",
            body: "This website may contain links to third-party websites. We are not responsible for the content or privacy practices of those websites.",
          },
          {
            title: "Limitation of Liability",
            body: "We make reasonable efforts to keep information accurate, but we do not guarantee uninterrupted service or complete absence of errors.",
          },
          {
            title: "Updates to Terms",
            body: "We may update these terms at any time. Continued use of the website after updates are posted means you accept the revised terms.",
          },
        ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <h1 className={`text-4xl lg:text-5xl ${t.serif} text-[#1c3944] mb-6`}>
          {t.topBar.terms}
        </h1>
        <p className="text-slate-600 mb-10">
          {lang === "ar" ? "آخر تحديث: 4 مارس 2026" : "Last updated: March 4, 2026"}
        </p>

        <div className="space-y-8">
          {sections.map((section) => (
            <article key={section.title} className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className={`text-2xl ${t.serif} text-[#1c3944] mb-3`}>{section.title}</h2>
              <p className="text-slate-700 leading-8">{section.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
