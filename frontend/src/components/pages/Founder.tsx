export default function Founder({ lang, content }) {
  const t = content[lang];
  const isRTL = lang === 'ar';
  
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[#1c3944] py-16 lg:py-24 text-center text-white">
         <div className="max-w-4xl mx-auto px-6">
            <span className="text-[#f7c20e] font-bold uppercase tracking-widest text-sm mb-4 block">{t.nav.founder}</span>
            <h1 className={`text-4xl lg:text-5xl ${t.serif} mb-8`}>{t.founder.title}</h1>
         </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20">
         {/* Introduction / Bio */}
         <div className="prose prose-lg prose-slate mx-auto text-justify mb-16">
            <div className={`float-end ms-8 mb-6 w-64 bg-slate-100 p-2 border border-slate-200 ${isRTL ? '-rotate-1' : 'rotate-1'} shadow-lg`}>
              <div className="aspect-[3/4] bg-slate-200 relative overflow-hidden">
                  {/* Placeholder for Riad Seif Portrait */}
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">Portrait</div>
              </div>
              <div className="text-center text-xs text-slate-500 mt-2 italic">{isRTL ? 'رياض سيف، المؤسس' : 'Riad Seif, Founder'}</div>
            </div>
            
            <p className="lead text-xl font-light text-[#1c3944] mb-8">
                {t.home.founderSection.text}
            </p>
         </div>

         {/* Detailed Sections */}
         <div className="space-y-12">
             {t.founder.sections.map((section, i) => (
                 <div key={i} className="grid md:grid-cols-12 gap-6">
                     <div className="md:col-span-4">
                         <h3 className={`text-2xl ${t.serif} text-[#1c3944] border-l-4 border-[#f7c20e] pl-4 ${isRTL ? 'border-l-0 border-r-4 pr-4 pl-0' : ''}`}>
                             {section.title}
                         </h3>
                     </div>
                     <div className="md:col-span-8 text-slate-600 text-lg leading-relaxed">
                         <p>{section.text}</p>
                     </div>
                 </div>
             ))}
         </div>
      </div>
    </div>
  );
}
