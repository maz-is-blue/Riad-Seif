import { ArrowRight, ArrowLeft, BookOpen, Users, MessageSquare } from 'lucide-react';
import { Link } from 'wouter';
import { motion } from 'motion/react';

export default function Home({ lang, content }) {
  const t = content[lang];
  const isRTL = lang === 'ar';
  
  return (
    <>
      {/* Hero Section - Full Width Background */}
      <section 
        id="home" 
        className="relative min-h-[80vh] lg:min-h-[90vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1584649503706-3ec8e0b13e92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxvbGQlMjBkYW1hc2N1cyUyMHN5cmlhfGVufDB8fHx8MTczNjE4Nzk1Nnww&ixlib=rb-4.1.0&q=80&w=2400')"
        }}
      >
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: isRTL 
              ? 'linear-gradient(to left, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.5) 40%, transparent 100%)'
              : 'linear-gradient(to right, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.5) 40%, transparent 100%)'
          }}
        ></div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 min-h-[80vh] lg:min-h-[90vh] flex items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`text-white w-full lg:w-1/2 ${isRTL ? 'lg:mr-auto' : 'lg:ml-auto'} text-${isRTL ? 'right' : 'left'} py-8 lg:py-12`}
          >
            <h1 className={`text-4xl lg:text-5xl xl:text-5xl ${t.serif} font-bold leading-tight mb-6 drop-shadow-lg`}>
              {t.hero.titleStart} <span className="text-[#f7c20e]">{t.hero.titleEnd}</span>
            </h1>
            <p className="text-base lg:text-lg text-white mb-8 leading-relaxed font-light drop-shadow-lg max-w-2xl opacity-95">
              {t.hero.description}
            </p>
            <div className={`flex flex-wrap gap-4 ${isRTL ? 'justify-end lg:justify-start' : ''}`}>
              <Link href="/center">
                <span className="bg-[#f7c20e] text-[#1c3944] px-8 py-3 text-sm font-semibold hover:bg-opacity-90 transition-all duration-300 cursor-pointer inline-block text-center shadow-lg hover:shadow-xl">
                  {t.hero.btnCenter}
                </span>
              </Link>
              <Link href="/forum">
                <span className="border-2 border-white text-white px-8 py-3 text-sm font-semibold hover:bg-white hover:text-[#1c3944] transition-all duration-300 cursor-pointer inline-block text-center shadow-lg">
                  {t.hero.btnForum}
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24 lg:py-32 xl:py-40 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20 xl:mb-24">
            <h2 className={`text-3xl lg:text-4xl ${t.serif} font-bold text-[#1c3944] mb-4`}>
              {lang === 'ar' ? 'البرامج' : 'Programs'}
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              {lang === 'ar' 
                ? 'نسعى عبر برامجنا وأنشطتنا لدعم الانتقال الديمقراطي وحقوق الإنسان في سوريا' 
                : 'Through our programs and activities, we support democratic transition and human rights in Syria'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
            {/* Human Rights Center Card */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="/center">
                <div className="bg-white p-8 rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-t-4 border-[#f7c20e]">
                  <div className="w-14 h-14 bg-[#f7c20e] bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                    <BookOpen className="text-[#f7c20e]" size={28} />
                  </div>
                  <h3 className={`text-xl ${t.serif} font-bold text-[#1c3944] mb-4`}>{t.nav.center}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {lang === 'ar' 
                      ? 'برامج تدريبية شاملة في مجال حقوق الإنسان والديمقراطية والعدالة الانتقالية'
                      : 'Comprehensive training programs in human rights, democracy, and transitional justice'}
                  </p>
                  <span className={`text-[#f7c20e] font-semibold flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {lang === 'ar' ? 'قراءة المزيد' : 'Read More'}
                    {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Dialogue Forum Card */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="/forum">
                <div className="bg-white p-8 rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-t-4 border-[#1c3944]">
                  <div className="w-14 h-14 bg-[#1c3944] bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                    <MessageSquare className="text-[#1c3944]" size={28} />
                  </div>
                  <h3 className={`text-xl ${t.serif} font-bold text-[#1c3944] mb-4`}>{t.nav.forum}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {lang === 'ar' 
                      ? 'منصة للحوار المفتوح والبناء حول قضايا المجتمع المدني والديمقراطية'
                      : 'Platform for open and constructive dialogue on civil society and democracy issues'}
                  </p>
                  <span className={`text-[#1c3944] font-semibold flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {lang === 'ar' ? 'قراءة المزيد' : 'Read More'}
                    {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* About/Founder Card */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="/founder">
                <div className="bg-white p-8 rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-t-4 border-[#2c1d5f]">
                  <div className="w-14 h-14 bg-[#2c1d5f] bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                    <Users className="text-[#2c1d5f]" size={28} />
                  </div>
                  <h3 className={`text-xl ${t.serif} font-bold text-[#1c3944] mb-4`}>{t.nav.founder}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {lang === 'ar' 
                      ? 'تعرف على رياض سيف، رائد الإصلاح الديمقراطي والمدافع عن حقوق الإنسان'
                      : 'Learn about Riad Seif, pioneer of democratic reform and human rights advocate'}
                  </p>
                  <span className={`text-[#2c1d5f] font-semibold flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {lang === 'ar' ? 'قراءة المزيد' : 'Read More'}
                    {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section className="py-24 lg:py-32 xl:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16 lg:mb-20">
            <div>
              <h2 className={`text-3xl lg:text-4xl ${t.serif} font-bold text-[#1c3944] mb-3`}>
                {t.home.newsSection.title}
              </h2>
              <p className="text-slate-600 text-lg">{t.home.newsSection.subtitle}</p>
            </div>
            <Link href="/publications">
              <span className={`hidden md:flex items-center gap-2 text-[#1c3944] hover:text-[#f7c20e] transition-colors text-sm font-semibold cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                {t.publications.access.title}
                {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              </span>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
            {t.publications.items.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border border-slate-200 hover:border-[#f7c20e]"
              >
                <div className="text-xs font-semibold text-[#f7c20e] mb-3 uppercase tracking-wide">{item.type}</div>
                <h4 className={`text-lg ${t.serif} font-bold mb-3 text-[#1c3944] leading-snug`}>{item.title}</h4>
                <div className="text-slate-500 text-sm">{item.date}</div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16 lg:mt-20">
            <Link href="/publications">
              <span className="inline-block bg-[#1c3944] text-white px-8 py-3 text-sm font-semibold hover:bg-[#f7c20e] hover:text-[#1c3944] transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg">
                {lang === 'ar' ? 'عرض كل الإصدارات' : 'View All Publications'}
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
