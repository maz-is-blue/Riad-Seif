import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

export default function Home({ lang, content }) {
  const t = content[lang];
  const isRTL = lang === 'ar';
  
  return (
    <>
      {/* Hero Section - Split Layout */}
      <section id="home" className="grid lg:grid-cols-2 min-h-[600px]">
        <div className="bg-[#1c3944] text-white flex flex-col justify-center px-8 py-20 lg:px-20 xl:px-32">
          <div className="w-16 h-1 bg-[#f7c20e] mb-8"></div>
          <h1 className={`text-4xl lg:text-5xl xl:text-6xl ${t.serif} font-bold leading-tight mb-8`}>
            {t.hero.titleStart} <span className="text-[#f7c20e]">{t.hero.titleEnd}</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-300 mb-10 leading-relaxed max-w-lg font-light">
            {t.hero.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/center">
              <span className="bg-[#f7c20e] text-[#1c3944] px-6 py-3 uppercase tracking-widest text-sm font-bold hover:bg-white transition-colors cursor-pointer inline-block text-center">
                {t.hero.btnCenter}
              </span>
            </Link>
            <Link href="/forum">
              <span className="border border-white text-white px-6 py-3 uppercase tracking-widest text-sm font-bold hover:bg-white hover:text-[#1c3944] transition-colors cursor-pointer inline-block text-center">
                {t.hero.btnForum}
              </span>
            </Link>
          </div>
        </div>
        <div className="relative h-64 lg:h-auto order-first lg:order-last">
          <img 
            src="https://images.unsplash.com/photo-1737275853879-731f24015ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTeXJpYW4lMjBhcmNoaXRlY3R1cmUlMjBoaXN0b3JpY2FsJTIwZGFtYXNjdXN8ZW58MXx8fHwxNzY1MDQwNTI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
            alt="Damascus Architecture" 
            className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-multiply opacity-80 bg-[#2c1d5f]"
          />
          <div className={`absolute inset-0 bg-gradient-to-r from-[#1c3944] to-transparent lg:bg-gradient-to-t lg:from-transparent lg:to-transparent ${isRTL ? 'bg-gradient-to-l' : ''}`}></div>
        </div>
      </section>

      {/* Intro Sections */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <div className="grid md:grid-cols-2 gap-16">
              {/* About Foundation Intro */}
              <div>
                  <h3 className={`text-3xl text-[#1c3944] mb-6 ${t.serif}`}>{t.home.aboutSection.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                      {t.home.aboutSection.text}
                  </p>
                  <Link href="/about">
                      <span className="text-[#2c1d5f] font-bold uppercase tracking-wider text-sm hover:text-[#f7c20e] transition-colors flex items-center gap-2 cursor-pointer">
                          {t.home.aboutSection.link} {isRTL ? <ArrowLeft size={16}/> : <ArrowRight size={16}/>}
                      </span>
                  </Link>
              </div>
              
              {/* Founder Intro */}
              <div className="bg-slate-50 p-8 border-l-4 border-[#f7c20e]">
                  <h3 className={`text-3xl text-[#1c3944] mb-6 ${t.serif}`}>{t.home.founderSection.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                      {t.home.founderSection.text}
                  </p>
                  <Link href="/founder">
                      <span className="text-[#2c1d5f] font-bold uppercase tracking-wider text-sm hover:text-[#f7c20e] transition-colors flex items-center gap-2 cursor-pointer">
                          {t.home.founderSection.link} {isRTL ? <ArrowLeft size={16}/> : <ArrowRight size={16}/>}
                      </span>
                  </Link>
              </div>
           </div>
        </div>
      </section>

      {/* Highlights / News */}
      <section className="py-20 bg-[#1c3944] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
                <div>
                    <h2 className={`text-3xl ${t.serif} mb-2`}>{t.home.newsSection.title}</h2>
                    <p className="text-slate-400">{t.home.newsSection.subtitle}</p>
                </div>
                <Link href="/publications">
                    <span className="hidden md:flex items-center text-[#f7c20e] hover:text-white transition-colors text-sm uppercase tracking-widest font-bold cursor-pointer">
                         {t.publications.access.title} {isRTL ? <ArrowLeft size={16}/> : <ArrowRight size={16}/>}
                    </span>
                </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {t.publications.items.map((item, i) => (
                    <div key={i} className="bg-[#254b59] p-6 hover:bg-[#2c5a6b] transition-colors group cursor-pointer">
                        <div className="text-xs uppercase tracking-wider text-[#f7c20e] mb-2">{item.type}</div>
                        <h4 className={`text-lg ${t.serif} mb-2 group-hover:text-[#f7c20e] transition-colors`}>{item.title}</h4>
                        <div className="text-slate-400 text-sm">{item.date}</div>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </>
  );
}
