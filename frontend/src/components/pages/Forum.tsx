import { ArrowRight, ArrowLeft, Calendar } from 'lucide-react';
import { Link } from 'wouter';

export default function Forum({ lang, content }) {
  const t = content[lang];
  const isRTL = lang === 'ar';
  
  return (
    <div className="bg-white">
       {/* Header */}
       <div className="relative bg-[#1c3944] text-white py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
               <img src="https://images.unsplash.com/photo-1764874299006-bf4266427ec9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" className="w-full h-full object-cover" />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
             <span className="text-[#f7c20e] font-bold uppercase tracking-widest text-sm mb-4 block">{t.nav.forum}</span>
             <h1 className={`text-4xl lg:text-5xl ${t.serif} mb-6`}>{t.nav.forum}</h1>
             <p className="text-xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed">
                 {t.forum.history.text}
             </p>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
           
           {/* History Section */}
           <div className="mb-20 grid md:grid-cols-2 gap-12 items-center">
               <div>
                   <h2 className={`text-3xl text-[#1c3944] mb-6 ${t.serif}`}>{t.forum.history.title}</h2>
                   <div className="prose prose-lg text-slate-600">
                       <p>{t.forum.history.text}</p>
                   </div>
               </div>
               <div className="bg-slate-100 p-8 border-l-4 border-[#f7c20e] italic text-slate-700 text-lg">
                   "{lang === 'ar' 
                     ? 'لطالما كان منتدى الحوار الوطني رمزاً للتوق الديمقراطي في سوريا. اليوم، نعيد إحياءه.' 
                     : 'The Forum for National Dialogue has long been a symbol of democratic aspiration in Syria. Today, we revive it.'}"
               </div>
           </div>

           {/* Current Activities & Events */}
           <div className="grid md:grid-cols-2 gap-12">
               
               {/* Activities */}
               <div>
                   <h3 className={`text-2xl text-[#1c3944] mb-6 ${t.serif}`}>{t.forum.activities.title}</h3>
                   <p className="text-slate-600 text-lg leading-relaxed mb-6">
                       {t.forum.activities.text}
                   </p>
                   <ul className="space-y-4">
                       {[1, 2, 3].map((i) => (
                           <li key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                               <div className="w-2 h-2 mt-2 rounded-full bg-[#2c1d5f] shrink-0"></div>
                               <span className="text-slate-700">
                                   {lang === 'ar' ? 'جلسة حوار شهرية حول موضوعات الانتقال' : 'Monthly dialogue session on transition themes'}
                               </span>
                           </li>
                       ))}
                   </ul>
               </div>

               {/* Events */}
               <div className="bg-[#2c1d5f] text-white p-8 rounded-lg">
                   <h3 className={`text-2xl mb-6 ${t.serif} flex items-center gap-3`}>
                       <Calendar className="text-[#f7c20e]" /> {t.forum.events.title}
                   </h3>
                   <p className="text-slate-300 mb-8 font-light">
                       {t.forum.events.text}
                   </p>
                   
                   {/* Mock Event Item */}
                   <div className="bg-white/10 p-4 rounded mb-4">
                       <div className="text-[#f7c20e] text-sm font-bold uppercase mb-1">
                           {lang === 'ar' ? 'يناير 2025' : 'January 2025'}
                       </div>
                       <div className="font-bold text-lg mb-2">
                           {lang === 'ar' ? 'الجلسة 45: دور الشباب في الحكم المحلي' : 'Session 45: Youth Role in Local Governance'}
                       </div>
                       <div className="text-sm text-slate-300">
                           {lang === 'ar' ? 'عبر الإنترنت - التسجيل مطلوب' : 'Online - Registration Required'}
                       </div>
                   </div>

                   <Link href="/contact">
                       <span className="block w-full text-center bg-[#f7c20e] text-[#1c3944] py-3 font-bold mt-6 hover:bg-white transition-colors cursor-pointer">
                           {lang === 'ar' ? 'تواصل معنا للحضور' : 'Contact Us to Attend'}
                       </span>
                   </Link>
               </div>
           </div>
       </div>
    </div>
  );
}
