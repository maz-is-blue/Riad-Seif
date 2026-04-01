import React from "react";

export default function JoinUs({ lang, content }) {
  const t = content[lang];
  const isRTL = lang === "ar";
  const joinUs = t.joinUs ?? {};
  const jobs = Array.isArray(joinUs.jobs) ? joinUs.jobs : [];

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h1 className={`text-4xl lg:text-5xl ${t.serif} text-[#1c3944] mb-5`}>
          {joinUs.title ?? (isRTL ? "انضم إلينا" : "Join Us")}
        </h1>
        <p className="text-slate-600 mb-10 leading-8">
          {joinUs.intro ??
            (isRTL
              ? "اطلع على فرص العمل الحالية في المؤسسة. عند توفر وظائف يمكنك التقديم مباشرة عبر التفاصيل أدناه."
              : "Explore current opportunities at the foundation. When positions are open, you can apply directly using the details below.")}
        </p>

        {jobs.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-600">
            {joinUs.emptyState ??
              (isRTL
                ? "لا توجد فرص متاحة حالياً. تابعنا لفرص قادمة."
                : "There are no opportunities at the moment. Follow us for future openings.")}
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8">
                <h2 className={`text-2xl ${t.serif} text-[#1c3944] mb-3`}>
                  {job.title}
                </h2>
                <p className="text-slate-600 leading-7 mb-5">{job.description}</p>
                {Array.isArray(job.requirements) && job.requirements.length > 0 && (
                  <div className="mb-5">
                    <h3 className="text-sm font-semibold text-slate-500 mb-2">
                      {isRTL ? "المتطلبات" : "Requirements"}
                    </h3>
                    <ul className="list-disc list-inside text-slate-600 space-y-1">
                      {job.requirements.map((req, reqIndex) => (
                        <li key={reqIndex}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {job.howToApply && (
                  <div className="border-t border-slate-200 pt-4 text-slate-700">
                    <span className="text-sm font-semibold text-slate-500">
                      {isRTL ? "طريقة التقديم" : "How to Apply"}:
                    </span>{" "}
                    {job.howToApply}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
