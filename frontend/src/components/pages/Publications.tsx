import { ChevronRight, ChevronLeft, ArrowRight, ArrowLeft } from 'lucide-react';

export default function Publications({ lang, content }) {
  const t = content[lang];
  const isRTL = lang === 'ar';
  const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="py-24 bg-[#1c3944] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
          <div>
            <h2 className={`text-4xl ${t.serif} mb-2`}>{t.nav.publications}</h2>
            <p className="text-slate-400">{t.publications.latest.subtitle}</p>
          </div>
          <div className="hidden md:flex items-center text-[#f7c20e] hover:text-white transition-colors text-sm uppercase tracking-widest font-bold cursor-pointer">
            {t.publications.latest.viewAll} <ChevronIcon className="mx-1" size={16} />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.publications.items.map((item, i) => (
            <div key={i} className="bg-[#254b59] p-8 border-t-4 border-[#f7c20e] hover:bg-[#2c5a6b] transition-colors group cursor-pointer">
              <div className="flex justify-between items-center mb-4 text-xs uppercase tracking-wider text-slate-300">
                <span className="text-[#f7c20e] font-bold">{item.cat}</span>
                <span>{item.date}</span>
              </div>
              <h3 className={`text-xl ${t.serif} mb-3 leading-snug group-hover:text-[#f7c20e] transition-colors`}>{item.title}</h3>
              <p className="text-slate-300 text-sm mb-6 line-clamp-3">{item.desc}</p>
              <div className="flex items-center gap-2 text-sm font-bold text-[#f7c20e]">
                {t.publications.latest.readMore} <ArrowIcon size={14} />
              </div>
            </div>
          ))}
          {/* Mock extra items to fill the page */}
          <div className="bg-[#254b59] p-8 border-t-4 border-slate-600 hover:bg-[#2c5a6b] transition-colors group cursor-pointer opacity-75">
             <div className="flex justify-between items-center mb-4 text-xs uppercase tracking-wider text-slate-300">
                <span className="text-slate-400 font-bold">{lang === 'ar' ? 'أرشيف' : 'Archive'}</span>
                <span>2023</span>
             </div>
             <h3 className={`text-xl ${t.serif} mb-3 leading-snug group-hover:text-[#f7c20e] transition-colors`}>
               {lang === 'ar' ? 'تقرير حقوق الإنسان السنوي 2023' : 'Annual Human Rights Report 2023'}
             </h3>
             <p className="text-slate-300 text-sm mb-6 line-clamp-3">
               {lang === 'ar' ? 'تحميل التقرير الكامل بصيغة PDF' : 'Download full report in PDF format.'}
             </p>
             <div className="flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-[#f7c20e]">
                {t.publications.latest.readMore} <ArrowIcon size={14} />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
