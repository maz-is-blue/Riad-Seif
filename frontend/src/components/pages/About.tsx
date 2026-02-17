import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

export default function About({ lang, content }) {
  const t = content[lang];
  const isRTL = lang === 'ar';
  
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-slate-50 py-16 lg:py-24 text-center">
         <div className="max-w-4xl mx-auto px-6">
            <span className="text-[#f7c20e] font-bold uppercase tracking-widest text-sm mb-4 block">{t.nav.about}</span>
            <h1 className={`text-4xl lg:text-5xl ${t.serif} text-[#1c3944] mb-8`}>{t.about.whoWeAre.title}</h1>
            <p className="text-xl text-slate-600 leading-relaxed font-light">
                {t.about.whoWeAre.text}
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        
        {/* Mission & Vision Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="bg-[#1c3944] text-white p-10 rounded-sm">
                <h3 className={`text-3xl ${t.serif} text-[#f7c20e] mb-6`}>{t.about.vision.title}</h3>
                <p className="text-lg leading-relaxed font-light text-slate-200">
                    {t.about.vision.text}
                </p>
            </div>
            <div className="bg-[#2c1d5f] text-white p-10 rounded-sm">
                <h3 className={`text-3xl ${t.serif} text-[#f7c20e] mb-6`}>{t.about.mission.title}</h3>
                <p className="text-lg leading-relaxed font-light text-slate-200">
                    {t.about.mission.text}
                </p>
            </div>
        </div>

        {/* Our Story */}
        <div className="max-w-4xl mx-auto mb-20">
            <h2 className={`text-3xl ${t.serif} text-[#1c3944] mb-6`}>{t.about.ourStory.title}</h2>
            <div className="prose prose-lg text-slate-600">
                <p>{t.about.ourStory.text}</p>
            </div>
        </div>

        {/* Approach / Pillars */}
        <div>
            <h2 className={`text-3xl ${t.serif} text-[#1c3944] mb-12 text-center`}>{t.about.approach.title}</h2>
            <div className="grid md:grid-cols-2 gap-8">
                {t.about.approach.pillars.map((pillar, i) => (
                    <div key={i} className="border-t-4 border-[#f7c20e] bg-slate-50 p-8 hover:shadow-md transition-shadow">
                        <h4 className={`text-xl ${t.serif} text-[#1c3944] mb-4 font-bold`}>{pillar.title}</h4>
                        <p className="text-slate-600">{pillar.desc}</p>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
}
