import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Mail } from "lucide-react";
import { motion } from "motion/react";

interface JoinJob {
  id: number;
  title_en?: string;
  title_ar?: string;
  description_en?: string;
  description_ar?: string;
  requirements?: string[];
  howToApply_en?: string;
  howToApply_ar?: string;
  image_url?: string;
}

interface Props {
  lang: "en" | "ar";
  content: Record<string, any>;
}

const JoinUs: React.FC<Props> = ({ lang, content }) => {
  const isRTL = lang === "ar";
  const localized = content[lang] ?? content.en;
  const joinData = localized?.joinUs ?? {};
  const jobs: JoinJob[] = Array.isArray(joinData?.jobs) ? joinData.jobs : [];

  const emptyTitle =
    joinData?.noJobsTitle ?? (isRTL ? "لا توجد فرص حالياً" : "No opportunities right now");
  const emptyMessage =
    joinData?.noJobs ?? (isRTL ? "تابعنا للفرص القادمة." : "Follow us for future openings.");

  const renderRequirements = (job: JoinJob) => {
    const requirements = Array.isArray(job.requirements)
      ? job.requirements
      : [];
    if (requirements.length === 0) return null;
    return (
      <div>
        <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
          <span role="img" aria-hidden>
            ✅
          </span>
          {isRTL ? "المتطلبات" : "Requirements"}
        </h4>
        <ul className={`text-sm space-y-1 ${isRTL ? "text-right" : ""}`}>
          {requirements.map((req, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
              {req}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className={`min-h-screen py-20 px-6 ${isRTL ? "font-cairo" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#1c3944] to-slate-800 bg-clip-text text-transparent mb-4">
            {joinData?.title ?? (isRTL ? "انضم إلينا" : "Join Us")}
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {joinData?.intro ??
              (isRTL
                ? "اطلع على فرص العمل الحالية في المؤسسة."
                : "Explore current opportunities at the Foundation.")}
          </p>
        </motion.div>

        {jobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32"
          >
            <div className="inline-block p-8 bg-slate-100 rounded-2xl mb-8">
              <svg
                className="w-24 h-24 text-slate-400 mx-auto mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-6l-3 3-3-3"
                />
              </svg>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">{emptyTitle}</h3>
              <p className="text-lg text-slate-600 max-w-md mx-auto leading-relaxed">{emptyMessage}</p>
            </div>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {jobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: job.id * 0.1 }}
              >
                <Card className="h-full border border-slate-200 hover:shadow-xl transition-shadow overflow-hidden group hover:border-[#f7c20e]">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-[#1c3944] text-white">
                        {isRTL ? job.title_ar ?? job.title_en : job.title_en ?? job.title_ar}
                      </Badge>
                      <span className="text-sm text-slate-500 font-medium">
                        {isRTL ? "فرصة عمل" : "Job Opening"}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6 pb-8">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
                        {isRTL ? job.title_ar ?? job.title_en : job.title_en ?? job.title_ar}
                      </h3>
                      <p className="text-slate-600 leading-relaxed mb-6">
                        {isRTL ? job.description_ar ?? job.description_en : job.description_en ?? job.description_ar}
                      </p>
                    </div>
                    {renderRequirements(job)}
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {isRTL ? "كيف تتقدم" : "How to Apply"}
                      </h4>
                      <div className="bg-gradient-to-r from-[#1c3944] to-slate-800 text-white p-5 rounded-xl">
                        <p className={`leading-relaxed ${isRTL ? "text-right" : ""}`}>
                          {isRTL
                            ? job.howToApply_ar ?? job.howToApply_en
                            : job.howToApply_en ?? job.howToApply_ar}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinUs;
