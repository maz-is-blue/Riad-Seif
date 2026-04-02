import { useEffect, useState } from "react";
import { fetchJobs, type JobOpportunity } from "../../utils/api";

export default function JoinUs({ lang, content }) {
  const t = content[lang];
  const isRTL = lang === "ar";
  const joinUs = t.joinUs ?? {};
  const [jobs, setJobs] = useState<JobOpportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchJobs()
      .then((items) => {
        if (active) {
          setJobs(items ?? []);
        }
      })
      .catch(() => {
        if (active) {
          setJobs([]);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

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

        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-600">
            {isRTL ? "جاري تحميل الفرص..." : "Loading opportunities..."}
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
            <h2 className={`text-2xl ${t.serif} text-[#1c3944] mb-3`}>
              {joinUs.emptyTitle ?? (isRTL ? "لا توجد فرص حالياً" : "No Opportunities Right Now")}
            </h2>
            <p className="text-slate-600 leading-7">
              {joinUs.emptyState ??
                (isRTL
                  ? "لا توجد فرص متاحة حالياً. تابعنا لمعرفة الفرص القادمة."
                  : "There are no opportunities at the moment. Follow us for future openings.")}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => {
              const title = isRTL ? job.title_ar : job.title_en;
              const description = isRTL ? job.description_ar : job.description_en;
              const requirementsText = isRTL ? job.requirements_ar : job.requirements_en;
              const requirements = requirementsText
                .split(/\r?\n/)
                .map((item) => item.trim())
                .filter(Boolean);
              const applyInfo = isRTL ? job.apply_info_ar : job.apply_info_en;

              return (
                <div key={job.id} className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8">
                  <h2 className={`text-2xl ${t.serif} text-[#1c3944] mb-3`}>{title}</h2>
                  <p className="text-slate-600 leading-7 mb-5">{description}</p>

                  {requirements.length > 0 ? (
                    <div className="mb-5">
                      <h3 className="text-sm font-semibold text-slate-500 mb-2">
                        {isRTL ? "متطلبات الوظيفة" : "Job Requirements"}
                      </h3>
                      <ul className="list-disc list-inside text-slate-600 space-y-1">
                        {requirements.map((requirement, index) => (
                          <li key={`${job.id}-${index}`}>{requirement}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {applyInfo ? (
                    <div className="border-t border-slate-200 pt-4 text-slate-700">
                      <span className="text-sm font-semibold text-slate-500">
                        {isRTL ? "طريقة التقديم" : "How to Apply"}:
                      </span>{" "}
                      {applyInfo}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
