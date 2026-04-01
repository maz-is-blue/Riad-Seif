import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Mail, Download } from 'lucide-react';
import { motion } from 'motion/react';
// content from props, lang-specific
import { useLocation } from 'wouter';

interface Job {
  id: number;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  requirements_en: string;
  requirements_ar: string;
  apply_info_en: string;
  apply_info_ar: string;
  is_active: boolean;
  created_at: string;
}

interface Props {
  lang: 'en' | 'ar';
  content: any;
}

const JoinUs: React.FC<Props> = ({ lang, content }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const isRTL = lang === 'ar';
  const t = content[lang] || content.en;

  useEffect(() => {
    fetch('/api/jobs/')
      .then((res) => res.json())
      .then((data: Job[]) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch jobs:', err);
        setError('Failed to load job opportunities.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1c3944] mx-auto mb-4"></div>
          <p className="text-slate-600">{isRTL ? 'جاري التحميل...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-20 px-6 ${isRTL ? 'font-cairo' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#1c3944] to-slate-800 bg-clip-text text-transparent mb-6`}>
            {isRTL ? 'انضم إلينا' : 'Join Us'}
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {isRTL ? 'ابحث عن فرص عمل مثيرة في مؤسسة رياض سيف لحقوق الإنسان.' : 'Explore exciting career opportunities at the Riad Seif Foundation for Human Rights.'}
          </p>
        </motion.div>

        {error ? (
          <div className="text-center py-20">
            <p className="text-slate-600 text-lg">{error}</p>
          </div>
        ) : jobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32"
          >
            <div className="inline-block p-8 bg-slate-100 rounded-2xl mb-8">
              <svg className="w-24 h-24 text-slate-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-6l-3 3-3-3" />
              </svg>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                {t.joinUs?.noJobsTitle || (isRTL ? 'لا توجد فرص حالياً' : 'No Opportunities at the Moment')}
              </h3>
              <p className="text-lg text-slate-600 max-w-md mx-auto leading-relaxed">
                {t.joinUs?.noJobs || (isRTL ? 'تابعونا على وسائل التواصل الاجتماعي للحصول على فرص العمل المستقبلية.' : 'Follow us on social media for future opportunities.')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <a href="https://facebook.com/riadseiflb" target="_blank" rel="noopener" className="bg-[#1c3944] text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors flex items-center gap-2">
                {isRTL ? 'تابع على فيسبوك' : 'Follow on Facebook'}
              </a>
              <a href="https://linkedin.com/company/riadseiflb" target="_blank" rel="noopener" className="bg-[#1c3944] text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors flex items-center gap-2">
                {isRTL ? 'تابع على لينكدإن' : 'Follow on LinkedIn'}
              </a>
            </div>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {jobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: job.id * 0.1 }}
              >
                <Card className="h-full border border-slate-200 hover:shadow-xl transition-shadow overflow-hidden group hover:border-[#f7c20e]">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-[#1c3944] hover:bg-slate-800">{isRTL ? job.title_ar : job.title_en}</Badge>
                      <span className="text-sm text-slate-500 font-medium">
                        Posted {new Date(job.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6 pb-8">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
                        {isRTL ? job.title_ar : job.title_en}
                      </h3>
                      <p className="text-slate-600 leading-relaxed mb-6">
                        {isRTL ? job.description_ar : job.description_en}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                          <span>📋</span> {isRTL ? 'المتطلبات' : 'Requirements'}
                        </h4>
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <ul className={`text-sm space-y-1 ${isRTL ? 'text-right' : ''}`}>
                            {isRTL 
                              ? job.requirements_ar.split('.').filter(Boolean).map((req, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                                    {req.trim()}
                                  </li>
                                ))
                              : job.requirements_en.split('.').filter(Boolean).map((req, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                                    {req.trim()}
                                  </li>
                                ))
                            }
                          </ul>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {isRTL ? 'كيفية التقديم' : 'How to Apply'}
                        </h4>
                        <div className="bg-gradient-to-r from-[#1c3944] to-slate-800 text-white p-6 rounded-xl group-hover:shadow-lg transition-all">
                          <p className={`leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                            {isRTL ? job.apply_info_ar : job.apply_info_en}
                          </p>
                        </div>
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

