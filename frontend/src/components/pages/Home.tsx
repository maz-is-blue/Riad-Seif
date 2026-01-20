import { ArrowRight, ArrowLeft, BookOpen, Users, MessageSquare, Scale, Heart, Shield, Mic2, FileText, Quote } from 'lucide-react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef, useMemo } from 'react';
import hero1 from '../../assets/hero1.jpg';
import hero2 from '../../assets/hero2.jpg';
import hero3 from '../../assets/hero3.jpg';

function ForumSlider({ lang, t, isRTL, forumCards }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);
  const [slideW, setSlideW] = useState(0);

  useEffect(() => {
    const calc = () => {
      if (!trackRef.current) return;
      setSlideW(trackRef.current.clientWidth);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const goNext = () => setActive((p) => (p + 1) % forumCards.length);
  const goPrev = () => setActive((p) => (p - 1 + forumCards.length) % forumCards.length);

  // RTL: translate direction flips
  const x = isRTL ? active * slideW : -active * slideW;

  return (
    <div className="relative">
      {/* controls */}
      <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className="text-white/70 text-sm">
          {lang === 'ar' ? 'اسحب للتنقل' : 'Drag to navigate'} • {active + 1}/{forumCards.length}
        </div>

        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <button
            onClick={goPrev}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 flex items-center justify-center transition"
            aria-label="Previous"
          >
            {isRTL ? <ArrowRight size={18} className="text-white" /> : <ArrowLeft size={18} className="text-white" />}
          </button>
          <button
            onClick={goNext}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 flex items-center justify-center transition"
            aria-label="Next"
          >
            {isRTL ? <ArrowLeft size={18} className="text-white" /> : <ArrowRight size={18} className="text-white" />}
          </button>
        </div>
      </div>

      {/* viewport */}
      <div
        ref={trackRef}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
      >
        <motion.div
          className={`flex ${isRTL ? 'flex-row-reverse' : ''}`}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x > 90) (isRTL ? goNext() : goPrev());
            if (info.offset.x < -90) (isRTL ? goPrev() : goNext());
          }}
          animate={{ x }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          style={{ width: slideW ? slideW * forumCards.length : 'auto' }}
        >
          {forumCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className="shrink-0" style={{ width: slideW || '100%' }}>
                <div className="p-8 lg:p-12 grid lg:grid-cols-12 gap-8 items-center">
                  {/* text */}
                  <div className={`lg:col-span-7 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-flex items-center gap-3 mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center border"
                        style={{
                          background: `linear-gradient(135deg, ${card.color}33, ${card.color}12)`,
                          borderColor: `${card.color}55`,
                          boxShadow: `0 16px 40px ${card.color}22`,
                        }}
                      >
                        <Icon size={26} style={{ color: '#fff' }} />
                      </div>
                      <span className="text-white/70 text-sm">{lang === 'ar' ? 'ميزة' : 'Feature'}</span>
                    </div>

                    <h3 className={`text-3xl lg:text-4xl ${t.serif} font-bold text-white mb-4`}>
                      {card.title}
                    </h3>
                    <p className="text-white/80 text-lg leading-relaxed mb-7 max-w-xl">
                      {card.description}
                    </p>

                    <div className={`flex flex-wrap gap-3 ${isRTL ? 'justify-end' : ''}`}>
                      <span className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/85 text-sm">
                        {lang === 'ar' ? 'حوار آمن' : 'Safe dialogue'}
                      </span>
                      <span className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/85 text-sm">
                        {lang === 'ar' ? 'تبادل خبرات' : 'Knowledge exchange'}
                      </span>
                      <span className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/85 text-sm">
                        {lang === 'ar' ? 'مخرجات واضحة' : 'Clear outcomes'}
                      </span>
                    </div>
                  </div>

                  {/* side card */}
                  <div className="lg:col-span-5">
                    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 p-8 overflow-hidden">
                      <div
                        className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl opacity-40"
                        style={{ backgroundColor: card.color }}
                      />
                      <div className="relative">
                        <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span className="text-white font-semibold">{lang === 'ar' ? 'لمحة سريعة' : 'Quick view'}</span>
                          <span className="text-white/60 text-sm">{lang === 'ar' ? 'تفاعلي' : 'Interactive'}</span>
                        </div>

                        <div className="space-y-3">
                          {[
                            lang === 'ar' ? 'أسئلة موجّهة للنقاش' : 'Guided prompts',
                            lang === 'ar' ? 'مُيسّرون وخبراء' : 'Experts & moderators',
                            lang === 'ar' ? 'مخرجات قابلة للنشر' : 'Publishable outcomes',
                          ].map((txt, idx) => (
                            <div
                              key={idx}
                              className={`flex items-center gap-3 text-white/85 bg-white/10 border border-white/10 rounded-2xl px-4 py-3 ${isRTL ? 'flex-row-reverse' : ''}`}
                            >
                              <span className="w-2 h-2 rounded-full bg-[#f7c20e]" />
                              <span className="text-sm">{txt}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-8">
                          <Link href="/forum">
                            <span className="inline-flex items-center justify-center w-full bg-[#f7c20e] text-[#1c3944] px-6 py-3 text-sm font-semibold hover:bg-white transition-all duration-300 cursor-pointer rounded-2xl">
                              {lang === 'ar' ? 'انضم إلى الحوار' : 'Join the Dialogue'}
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* dots */}
      <div className={`flex items-center justify-center gap-2 mt-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {forumCards.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === active ? 'w-10 bg-[#f7c20e]' : 'w-2.5 bg-white/30 hover:bg-white/45'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function ForumStory({ lang, t }) {
  const isRTL = lang === "ar";

  const items = useMemo(() => ([
    {
      id: "sessions",
      icon: MessageSquare,
      tone: "#f7c20e",
      title: lang === "ar" ? "جلسات حوارية" : "Dialogue Sessions",
      description: lang === "ar"
        ? "نفتح دائرة الحوار حول القضايا الراهنة. نسمع، نناقش، ثم نخرج بفكرة يمكن تحويلها إلى فعل."
        : "We open a dialogue circle around current issues. We listen, discuss, then leave with an idea you can turn into action.",
      cta: lang === "ar" ? "انضم إلى جلسة" : "Join a session",
      href: "/forum",
    },
    {
      id: "workshops",
      icon: Users,
      tone: "#1c3944",
      title: lang === "ar" ? "ورشة عمل تفاعلية" : "Interactive Workshop",
      description: lang === "ar"
        ? "الحوار هنا لا يبقى كلامًا. نحوّل الفكرة إلى تمرين… ثم إلى مخرَج بصري بسيط يمكن مشاركته."
        : "Here, dialogue doesn't stay as talk. We turn the idea into an exercise… then into a simple sharable output.",
      cta: lang === "ar" ? "استكشف الورش" : "Explore workshops",
      href: "/forum",
    },
    {
      id: "platform",
      icon: Mic2,
      tone: "#2c1d5f",
      title: lang === "ar" ? "منصّة رقمية للنقاش" : "Digital Discussion Platform",
      description: lang === "ar"
        ? "مساحة آمنة على الإنترنت. مشاركة محترمة، نقاش منظم، وأفكار تتلاقح بدون ضجيج."
        : "A safe online space. Respectful participation, structured discussion, and ideas that meet without noise.",
      cta: lang === "ar" ? "ادخل المنصة" : "Enter the platform",
      href: "/forum",
    },
  ]), [lang]);

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50" />
      <div className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full bg-[#f7c20e] opacity-10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-[520px] h-[520px] rounded-full bg-[#1c3944] opacity-10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14 lg:mb-16">
          <h2 className={`text-4xl lg:text-5xl ${t.serif} font-bold text-[#1c3944] mb-4`}>
            {lang === "ar" ? "منتدى الحوار" : "Dialogue Forum"}
          </h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed mb-12">
            {lang === "ar"
              ? "اختر طريقة الحوار التي تناسبك… وشاهد الفكرة تتحرك أمامك."
              : "Choose your way of dialogue… and watch the idea come alive."}
          </p>
        </div>

        {/* Three rectangular cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                style={{ direction: isRTL ? "rtl" : "ltr" }}
              >
                {/* Top accent bar */}
                <div className="h-1" style={{ backgroundColor: item.tone }} />

                <div className="p-6 lg:p-8 flex flex-col h-full">
                  {/* Icon */}
                  <div className="mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${item.tone}14` }}
                    >
                      <Icon size={28} style={{ color: item.tone }} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl lg:text-2xl ${t.serif} font-bold text-[#1c3944] mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-slate-600 text-base leading-relaxed mb-6 flex-grow ${isRTL ? "text-right" : "text-left"}`}>
                    {item.description}
                  </p>

                  {/* CTA */}
                  <div className={`mt-auto ${isRTL ? "text-right" : "text-left"}`}>
                    <Link href={item.href}>
                      <motion.span
                        whileHover={{ y: -2 }}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#1c3944] hover:text-[#f7c20e] transition-colors cursor-pointer"
                        style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
                      >
                        {item.cta}
                        {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                      </motion.span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Home({ lang, content }) {
  const t = content[lang];
  const isRTL = lang === 'ar';
  
  const heroImages = [hero1, hero2, hero3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const forumCards = [
    {
      icon: MessageSquare,
      title: lang === 'ar' ? 'جلسات حوارية شهرية' : 'Monthly Dialogue Sessions',
      description: lang === 'ar' 
        ? 'لقاءات دورية تجمع النشطاء والخبراء لمناقشة القضايا الراهنة'
        : 'Regular meetings bringing together activists and experts to discuss current issues',
      color: '#f7c20e'
    },
    {
      icon: Users,
      title: lang === 'ar' ? 'ندوات وورش عمل تفاعلية' : 'Interactive Seminars & Workshops',
      description: lang === 'ar'
        ? 'برامج تدريبية عملية لبناء القدرات وتعزيز المهارات'
        : 'Practical training programs to build capacity and enhance skills',
      color: '#1c3944'
    },
    {
      icon: Mic2,
      title: lang === 'ar' ? 'منصة رقمية للنقاش' : 'Digital Discussion Platform',
      description: lang === 'ar'
        ? 'مساحة آمنة للتواصل والتبادل الفكري عبر الإنترنت'
        : 'A safe space for communication and intellectual exchange online',
      color: '#2c1d5f'
    },
  ];
  
  return (
    <>
      {/* Hero Section - Full Width Background */}
      <section 
        id="home" 
        className="relative overflow-hidden"
        style={{ 
          height: '92vh',
          backgroundImage: `url(${heroImages[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Animated Background Images */}
        <AnimatePresence initial={false}>
          <motion.img
            key={currentImageIndex}
            src={heroImages[currentImageIndex]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            loading="lazy"
          />
        </AnimatePresence>

        {/* Gradient Shadow Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `
              linear-gradient(
                to ${isRTL ? 'left' : 'right'},
                rgba(0, 0, 0, 0.65) 0%,
                rgba(0, 0, 0, 0.45) 40%,
                rgba(0, 0, 0, 0.2) 65%,
                rgba(0, 0, 0, 0.1) 100%
              )
            `,
          }}
        ></div>
        
        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 flex items-center" style={{ height: '92vh' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`text-white w-full lg:w-1/2 ${isRTL ? 'lg:mr-auto' : 'lg:ml-auto'} text-${isRTL ? 'right' : 'left'} py-8 lg:py-12`}
          >
            <h1 className={`text-4xl lg:text-5xl xl:text-5xl ${t.serif} font-bold leading-tight mb-6 drop-shadow-lg`}>
              {t.hero.titleStart} <span className="text-[#f7c20e]">{t.hero.titleEnd}</span>
            </h1>
            <p className="text-base lg:text-lg text-white leading-relaxed font-light drop-shadow-lg max-w-2xl opacity-95">
              مؤسسة رياض سيف لحقوق الإنسان هي منظمة غير حكومية وغير ربحية مقرها دمشق وتنشط في جميع أنحاء سوريا
            </p>
            <p className="mt-2 text-base lg:text-lg text-white leading-relaxed font-light drop-shadow-lg max-w-2xl opacity-90">
              تأسست المؤسسة لتكريم إرث رياض سيف من خلال تعزيز العدالة وحقوق الإنسان والإصلاح الديمقراطي الشامل.
            </p>
            <div
              className={`flex flex-wrap gap-4 ${
                isRTL ? 'justify-end lg:justify-start' : ''
              }`}
              style={{ marginTop: '4rem' }}
            >
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
      <section className="py-24 lg:py-32 xl:py-40 relative overflow-hidden">
        {/* Decorative floating elements */}
        <div className="absolute top-24 left-12 w-40 h-40 bg-[#f7c20e] opacity-4 rounded-full blur-3xl"></div>
        <div className="absolute bottom-24 right-12 w-36 h-36 bg-[#1c3944] opacity-4 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-[#2c1d5f] opacity-3 rounded-full blur-xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 lg:mb-20 xl:mb-24">
            <h2 className={`text-4xl lg:text-5xl ${t.serif} font-bold text-[#1c3944] mb-4`}>
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

      {/* About the Foundation Section */}
      <section className="py-24 lg:py-32 bg-[#1c3944] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f7c20e] opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f7c20e] opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={isRTL ? 'lg:order-2' : ''}
            >
              <span className="text-[#f7c20e] text-sm font-semibold uppercase tracking-widest mb-4 block">
                {lang === 'ar' ? 'من نحن' : 'Who We Are'}
              </span>
              <h2 className={`text-4xl lg:text-5xl ${t.serif} font-bold text-white mb-6`}>
                {lang === 'ar' ? 'عن المؤسسة' : 'About the Foundation'}
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                {lang === 'ar' 
                  ? 'مؤسسة رياض سيف لحقوق الإنسان هي منظمة غير حكومية وغير ربحية تأسست لتكريم إرث المناضل رياض سيف. نعمل على تعزيز قيم الديمقراطية والعدالة وحقوق الإنسان في سوريا من خلال برامج تدريبية ومبادرات حوارية.'
                  : 'The Riad Seif Foundation for Human Rights is a non-governmental, non-profit organization founded to honor the legacy of activist Riad Seif. We work to promote democracy, justice, and human rights in Syria through training programs and dialogue initiatives.'}
              </p>
              <div className="flex flex-wrap gap-8 mt-8">
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 bg-[#f7c20e] rounded-full flex items-center justify-center">
                    <Scale className="text-[#1c3944]" size={22} />
                  </div>
                  <span className="text-white font-medium">{lang === 'ar' ? 'العدالة' : 'Justice'}</span>
                </div>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 bg-[#f7c20e] rounded-full flex items-center justify-center">
                    <Heart className="text-[#1c3944]" size={22} />
                  </div>
                  <span className="text-white font-medium">{lang === 'ar' ? 'الإنسانية' : 'Humanity'}</span>
                </div>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 bg-[#f7c20e] rounded-full flex items-center justify-center">
                    <Shield className="text-[#1c3944]" size={22} />
                  </div>
                  <span className="text-white font-medium">{lang === 'ar' ? 'الحماية' : 'Protection'}</span>
                </div>
              </div>
              
              <Link href="/about" className="block" style={{ marginTop: '4rem' }}>
                <motion.div 
                  whileHover={{ x: isRTL ? -5 : 5 }}
                  className={`flex items-center gap-3 text-[#f7c20e] font-semibold cursor-pointer w-fit ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <span>{lang === 'ar' ? 'اكتشف المزيد' : 'Discover More'}</span>
                  {isRTL ? <ArrowLeft size={18} className="shrink-0" /> : <ArrowRight size={18} className="shrink-0" />}
                </motion.div>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`relative ${isRTL ? 'lg:order-1' : ''}`}
            >
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg border border-white border-opacity-10"
                >
                  <div className="text-4xl font-bold text-[#f7c20e] mb-2">15+</div>
                  <div className="text-slate-300 text-sm">{lang === 'ar' ? 'سنوات من العمل' : 'Years of Work'}</div>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg border border-white border-opacity-10 mt-8"
                >
                  <div className="text-4xl font-bold text-[#f7c20e] mb-2">500+</div>
                  <div className="text-slate-300 text-sm">{lang === 'ar' ? 'مستفيد' : 'Beneficiaries'}</div>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg border border-white border-opacity-10"
                >
                  <div className="text-4xl font-bold text-[#f7c20e] mb-2">50+</div>
                  <div className="text-slate-300 text-sm">{lang === 'ar' ? 'برنامج تدريبي' : 'Training Programs'}</div>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg border border-white border-opacity-10 mt-8"
                >
                  <div className="text-4xl font-bold text-[#f7c20e] mb-2">100+</div>
                  <div className="text-slate-300 text-sm">{lang === 'ar' ? 'شريك' : 'Partners'}</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Tribute Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        {/* Decorative floating elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#f7c20e] opacity-5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#1c3944] opacity-5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#2c1d5f] opacity-5 rounded-full blur-xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Quote className="text-[#f7c20e] mx-auto mb-8 opacity-50" size={48} />
            <blockquote className={`text-2xl lg:text-3xl ${t.serif} text-[#1c3944] leading-relaxed mb-8 font-medium`}>
              {lang === 'ar' 
                ? '"الديمقراطية ليست مجرد نظام حكم، بل هي ثقافة حياة تقوم على احترام الإنسان وكرامته وحقوقه الأساسية."'
                : '"Democracy is not just a system of governance, but a culture of life based on respect for human dignity and fundamental rights."'}
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-1 bg-[#f7c20e]"></div>
              <span className={`${t.serif} text-lg text-[#1c3944] font-semibold`}>
                {lang === 'ar' ? 'رياض سيف' : 'Riad Seif'}
              </span>
              <div className="w-16 h-1 bg-[#f7c20e]"></div>
            </div>
            <p className="text-slate-500 text-sm" style={{ marginTop: '2rem' }}>
              {lang === 'ar' ? 'مؤسس المؤسسة ورائد الإصلاح الديمقراطي' : 'Founder & Democratic Reform Pioneer'}
            </p>
            
            <div style={{ marginTop: '1.5rem' }}>
              <Link href="/founder">
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="inline-block bg-[#1c3944] text-white px-8 py-3 text-sm font-semibold hover:bg-[#f7c20e] hover:text-[#1c3944] transition-all duration-300 cursor-pointer"
                >
                  {lang === 'ar' ? 'تعرف على المؤسس' : 'Meet the Founder'}
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Human Rights Center Section */}
      <section className="pt-12 pb-24 lg:pt-16 lg:pb-32 bg-white relative overflow-hidden">
        {/* Decorative floating elements */}
        <div className="absolute top-10 right-20 w-36 h-36 bg-[#f7c20e] opacity-4 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-20 w-28 h-28 bg-[#1c3944] opacity-4 rounded-full blur-xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-4xl lg:text-5xl ${t.serif} font-bold text-[#1c3944] mb-4`}>
                {lang === 'ar' ? 'مركز حقوق الإنسان' : 'Human Rights Center'}
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                {lang === 'ar' 
                  ? 'نقدم برامج تدريبية متخصصة لبناء القدرات في مجال حقوق الإنسان والعدالة الانتقالية'
                  : 'We offer specialized training programs to build capacity in human rights and transitional justice'}
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Scale, title: lang === 'ar' ? 'العدالة الانتقالية' : 'Transitional Justice', color: '#f7c20e' },
              { icon: Shield, title: lang === 'ar' ? 'حماية الحقوق' : 'Rights Protection', color: '#1c3944' },
              { icon: Users, title: lang === 'ar' ? 'بناء القدرات' : 'Capacity Building', color: '#2c1d5f' },
              { icon: BookOpen, title: lang === 'ar' ? 'التوعية القانونية' : 'Legal Awareness', color: '#0d9488' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                className="bg-slate-50 p-8 text-center rounded-lg cursor-pointer transition-all duration-300 group"
              >
                <div 
                  className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <item.icon style={{ color: item.color }} size={28} />
                </div>
                <h3 className={`${t.serif} font-bold text-[#1c3944] text-lg`}>{item.title}</h3>
              </motion.div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '4rem' }}>
            <Link href="/center">
              <span className="inline-flex items-center text-[#1c3944] font-semibold cursor-pointer hover:text-[#f7c20e] transition-colors" style={{ gap: '1.5rem', flexDirection: isRTL ? 'row-reverse' : 'row', lineHeight: '1', verticalAlign: 'middle' }}>
                <span style={{ lineHeight: '1', verticalAlign: 'middle' }}>{lang === 'ar' ? 'استكشف جميع البرامج' : 'Explore All Programs'}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', lineHeight: '1', verticalAlign: 'middle' }}>
                  {isRTL ? <ArrowLeft size={18} style={{ verticalAlign: 'middle' }} /> : <ArrowRight size={18} style={{ verticalAlign: 'middle' }} />}
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Dialogue Forum Section */}
      <ForumStory lang={lang} t={t} />

      {/* Publications Section */}
      <section className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
        {/* Decorative floating elements */}
        <div className="absolute top-16 right-16 w-44 h-44 bg-[#f7c20e] opacity-4 rounded-full blur-3xl"></div>
        <div className="absolute bottom-16 left-16 w-32 h-32 bg-[#1c3944] opacity-4 rounded-full blur-2xl"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-[#0d9488] opacity-3 rounded-full blur-xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
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
                className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border border-slate-200 hover:border-[#f7c20e]"
              >
                <div className="text-xs font-semibold text-[#f7c20e] mb-3 uppercase tracking-wide">{item.type}</div>
                <h4 className={`text-lg ${t.serif} font-bold mb-3 text-[#1c3944] leading-snug`}>{item.title}</h4>
                <div className="text-slate-500 text-sm">{item.date}</div>
              </motion.div>
            ))}
          </div>

          {/* Spacer */}
          <div className="mt-16 lg:mt-20 mb-16"></div>
        </div>
      </section>
    </>
  );
}
