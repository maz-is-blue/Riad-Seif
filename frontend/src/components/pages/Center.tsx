import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'wouter';

export default function Center({ lang, content }) {
  const t = content[lang];
  const isRTL = lang === 'ar';
  
  return (
    <div className="bg-white">
       {/* Header */}
       <div className="relative bg-[#2c1d5f] text-white py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
               <img src="https://images.unsplash.com/photo-1581592717535-7f3e001bfa7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" className="w-full h-full object-cover" />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
             <span className="text-[#f7c20e] font-bold uppercase tracking-widest text-sm mb-4 block">{t.nav.center}</span>
             <h1 className={`text-4xl lg:text-5xl ${t.serif} mb-6`}>{t.center.intro.title}</h1>
             <p className="text-xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed">
                 {t.center.intro.text}
             </p>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          
          {/* Main Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
             
             {/* Left Column: Curriculum & Training */}
             <div className="space-y-12">
                 <div>
                     <h3 className={`text-3xl text-[#1c3944] mb-6 ${t.serif}`}>{t.center.curriculum.title}</h3>
                     <p className="text-slate-600 text-lg leading-relaxed mb-6">
                         {t.center.curriculum.text}
                     </p>
                     <ul className="space-y-3">
                         {['Human Rights Law', 'Transitional Justice', 'Women\'s Rights', 'Advocacy'].map((item, i) => (
                             <li key={i} className="flex items-center gap-3 text-slate-700">
                                 <CheckCircle size={18} className="text-[#f7c20e]" />
                                 <span>{lang === 'ar' ? 'موضوع تدريبي' : item}</span>
                             </li>
                         ))}
                     </ul>
                 </div>

                 <div className="bg-slate-50 p-8 rounded-lg">
                     <h3 className={`text-2xl text-[#1c3944] mb-4 ${t.serif}`}>{t.center.training.title}</h3>
                     <p className="text-slate-600 leading-relaxed">
                         {t.center.training.text}
                     </p>
                 </div>
             </div>

             {/* Right Column: Mentoring & Networking */}
             <div className="space-y-12">
                 <div>
                     <h3 className={`text-3xl text-[#1c3944] mb-6 ${t.serif}`}>{t.center.mentoring.title}</h3>
                     <p className="text-slate-600 text-lg leading-relaxed">
                         {t.center.mentoring.text}
                     </p>
                 </div>

                 <div className="border-t-4 border-[#1c3944] pt-8">
                     <h3 className={`text-3xl text-[#1c3944] mb-6 ${t.serif}`}>{t.center.networking.title}</h3>
                     <p className="text-slate-600 text-lg leading-relaxed mb-8">
                         {t.center.networking.text}
                     </p>
                     <Link href="/contact">
                        <span className="bg-[#1c3944] text-white px-8 py-3 font-bold hover:bg-[#2c1d5f] transition-colors cursor-pointer inline-block">
                            {lang === 'ar' ? 'تقدم بطلب للمشاركة' : 'Apply for Participation'}
                        </span>
                     </Link>
                 </div>
             </div>
          </div>
       </div>
    </div>
  );
}
