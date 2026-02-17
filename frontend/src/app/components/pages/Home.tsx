import { ArrowRight, ArrowLeft, BookOpen, Users, MessageSquare, Scale, Heart, Shield, Quote, Bird } from 'lucide-react';
import { Link } from 'wouter';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export default function Home({ lang, content }) {
  const t = content[lang];
  const isRTL = lang === 'ar';
  
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slider content
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1643276500881-281d554a72e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      titleAr: 'بناء سوريا عادلة وديموقراطية',
      titleEn: 'Building a Just and Democratic Syria',
      descAr: 'مؤسسة رياض سيف لحقوق الإنسان - منظمة غير حكومية وغير ربحية مقرها دمشق تعمل على تعزيز العدالة وحقوق الإنسان والإصلاح الديمقراطي',
      descEn: 'Riad Seif Foundation for Human Rights - A non-governmental, non-profit organization based in Damascus promoting justice, human rights, and democratic reform',
      icon: Heart,
      link: '/about',
      color: '#f7c20e'
    },
    {
      image: 'https://images.unsplash.com/photo-1719159381916-062fa9f435a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      titleAr: 'مركز حقوق الإنسان',
      titleEn: 'Human Rights Center',
      descAr: 'برامج تدريبية متخصصة في حقوق الإنسان والعدالة الانتقالية والديمقراطية',
      descEn: 'Specialized training programs in human rights, transitional justice, and democracy',
      icon: BookOpen,
      link: '/center',
      color: '#f7c20e'
    },
    {
      image: 'https://images.unsplash.com/photo-1695891835429-04bb13f65196?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      titleAr: 'منتدى الحوار الوطني',
      titleEn: 'National Dialogue Forum',
      descAr: 'منصة للحوار البناء وتعزيز ثقافة النقاش الديمقراطي والتفاهم',
      descEn: 'Platform for constructive dialogue promoting democratic discussion culture',
      icon: MessageSquare,
      link: '/forum',
      color: '#f7c20e'
    },
    {
      image: 'https://images.unsplash.com/photo-1734278095046-f31918334855?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      titleAr: 'رياض سيف',
      titleEn: 'Riad Seif',
      descAr: 'رائد الإصلاح الديمقراطي والمدافع الشجاع عن حقوق الإنسان في سوريا',
      descEn: 'Pioneer of democratic reform and courageous human rights advocate in Syria',
      icon: Users,
      link: '/founder',
      color: '#f7c20e'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };
  
  return (
    <>
      {/* Hero Section */}
      <section 
        id="home" 
        className="relative overflow-hidden"
        style={{ height: '92vh' }}
      >
        {/* Background Photo Slider */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: currentSlide === index ? 1 : 0,
                scale: currentSlide === index ? 1 : 1.1,
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <img
                src={slide.image}
                alt={lang === 'ar' ? slide.titleAr : slide.titleEn}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Black Gradient Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `
              linear-gradient(
                to ${isRTL ? 'left' : 'right'},
                rgba(0, 0, 0, 0.75) 0%,
                rgba(0, 0, 0, 0.55) 40%,
                rgba(0, 0, 0, 0.3) 65%,
                rgba(0, 0, 0, 0.15) 100%
              )
            `,
          }}
        ></div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 flex items-start pt-32 lg:pt-40" style={{ height: '92vh' }}>
          <div className="relative w-full lg:w-2/3 xl:w-3/5">
            {slides.map((slide, index) => (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={false}
                animate={{
                  opacity: currentSlide === index ? 1 : 0,
                  y: currentSlide === index ? 0 : 30,
                  pointerEvents: currentSlide === index ? 'auto' : 'none'
                }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              >
                <div className={`text-white ${isRTL ? 'text-right' : 'text-left'} px-[10px] py-[0px]`}>
                  <motion.h1
                    className={`text-4xl lg:text-5xl xl:text-6xl ${t.serif} font-bold leading-tight mb-6 drop-shadow-2xl text-white px-[10px] py-[0px]`}
                    style={{ whiteSpace: 'nowrap' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: currentSlide === index ? 1 : 0,
                      y: currentSlide === index ? 0 : 20
                    }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {lang === 'ar' ? slide.titleAr : slide.titleEn}
                  </motion.h1>
                  
                  <motion.p
                    className="text-lg lg:text-xl text-white/95 leading-relaxed font-light drop-shadow-xl mb-8 px-[10px] py-[0px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: currentSlide === index ? 1 : 0,
                      y: currentSlide === index ? 0 : 20
                    }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    {lang === 'ar' ? slide.descAr : slide.descEn}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: currentSlide === index ? 1 : 0,
                      y: currentSlide === index ? 0 : 20
                    }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <Link href={slide.link}>
                      <motion.span
                        className={`inline-flex items-center gap-3 text-[#f7c20e] font-bold text-xl cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}
                        whileHover={{ scale: 1.05, x: isRTL ? -5 : 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>{lang === 'ar' ? 'اقرأ المزيد' : 'Read More'}</span>
                        {isRTL ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
                      </motion.span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 lg:left-8 z-30 opacity-0 pointer-events-none">
          <motion.button
            onClick={goToPrevSlide}
            className="w-14 h-14 lg:w-16 lg:h-16 bg-white/10 hover:bg-[#f7c20e] backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:text-[#1c3944] transition-all duration-300 border-2 border-white/30 hover:border-[#f7c20e] shadow-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft size={28} />
          </motion.button>
        </div>
        
        <div className="absolute top-1/2 -translate-y-1/2 right-4 lg:right-8 z-30 opacity-0 pointer-events-none">
          <motion.button
            onClick={goToNextSlide}
            className="w-14 h-14 lg:w-16 lg:h-16 bg-white/10 hover:bg-[#f7c20e] backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:text-[#1c3944] transition-all duration-300 border-2 border-white/30 hover:border-[#f7c20e] shadow-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowRight size={28} />
          </motion.button>
        </div>

        {/* Slider Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 shadow-lg ${
                currentSlide === index
                  ? 'w-12 h-3 bg-[#f7c20e]'
                  : 'w-3 h-3 bg-white/50 hover:bg-white/80'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </section>

      {/* Publications Section */}
      <section className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-16 right-16 w-44 h-44 bg-[#f7c20e] opacity-4 rounded-full blur-3xl"></div>
        <div className="absolute bottom-16 left-16 w-32 h-32 bg-[#1c3944] opacity-4 rounded-full blur-2xl"></div>
        
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
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24 lg:py-32 xl:py-40 relative overflow-hidden">
        <div className="absolute top-24 left-12 w-40 h-40 bg-[#f7c20e] opacity-4 rounded-full blur-3xl"></div>
        <div className="absolute bottom-24 right-12 w-36 h-36 bg-[#1c3944] opacity-4 rounded-full blur-2xl"></div>
        
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

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16"
          >
            {/* Human Rights Center Card */}
            <motion.div
              variants={cardVariants}
              className="bg-white p-8 rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-t-4 border-[#f7c20e]"
            >
              <Link href="/center">
                <div>
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
              variants={cardVariants}
              className="bg-white p-8 rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-t-4 border-[#1c3944]"
            >
              <Link href="/forum">
                <div>
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
              variants={cardVariants}
              className="bg-white p-8 rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-t-4 border-[#2c1d5f]"
            >
              <Link href="/founder">
                <div>
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
          </motion.div>
        </div>
      </section>

      {/* Human Rights Center Section */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#f7c20e] opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#1c3944] opacity-5 rounded-full translate-x-1/2 translate-y-1/2"></div>
        
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
                {lang === 'ar' ? 'برنامجنا الرئيسي' : 'Our Main Program'}
              </span>
              <h2 className={`text-4xl lg:text-5xl ${t.serif} font-bold text-[#1c3944] mb-6`}>
                {t.center.title}
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                {t.center.intro.text}
              </p>
              
              <div className="space-y-4 mb-8">
                <motion.div 
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className={isRTL ? 'text-right' : 'text-left'} style={{ flex: 1 }}>
                    <h4 className="font-semibold text-[#1c3944] mb-1">
                      {lang === 'ar' ? 'التدريب المتخصص' : 'Specialized Training'}
                    </h4>
                    <p className="text-slate-600 text-sm">
                      {lang === 'ar' 
                        ? 'برامج تدريبية مصممة خصيصاً للسياق السوري في مجال حقوق الإنسان والعدالة الانتقالية'
                        : 'Training programs specifically designed for the Syrian context in human rights and transitional justice'}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-[#f7c20e] bg-opacity-10 rounded-full flex items-center justify-center shrink-0">
                    <BookOpen className="text-[#f7c20e]" size={20} />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex flex-row-reverse items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="w-10 h-10 bg-[#f7c20e] bg-opacity-10 rounded-full flex items-center justify-center shrink-0">
                    <Users className="text-[#f7c20e]" size={20} />
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <h4 className="font-semibold text-[#1c3944] mb-1">
                      {lang === 'ar' ? 'بناء القيادات' : 'Leadership Building'}
                    </h4>
                    <p className="text-slate-600 text-sm">
                      {lang === 'ar' 
                        ? 'إعداد جيل جديد من المحامين والمدافعين عن حقوق الإنسان من خلال التوجيه والتشبيك'
                        : 'Preparing a new generation of lawyers and human rights defenders through mentorship and networking'}
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex flex-row-reverse items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="w-10 h-10 bg-[#f7c20e] bg-opacity-10 rounded-full flex items-center justify-center shrink-0">
                    <Scale className="text-[#f7c20e]" size={20} />
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <h4 className="font-semibold text-[#1c3944] mb-1">
                      {lang === 'ar' ? 'العدالة الانتقالية' : 'Transitional Justice'}
                    </h4>
                    <p className="text-slate-600 text-sm">
                      {lang === 'ar' 
                        ? 'التركيز على الحقيقة والعدالة وجبر الضرر وضمان عدم التكرار'
                        : 'Focus on truth, justice, reparations, and guarantees of non-recurrence'}
                    </p>
                  </div>
                </motion.div>
              </div>
              
              <Link href="/center">
                <motion.div 
                  whileHover={{ x: isRTL ? -5 : 5 }}
                  className={`flex items-center gap-3 text-[#f7c20e] font-semibold cursor-pointer w-fit ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <span>{lang === 'ar' ? 'اكتشف المزيد عن المركز' : 'Discover More About the Center'}</span>
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
              <div className="relative">
                <motion.div 
                  className="aspect-[4/3] bg-gradient-to-br from-[#1c3944] to-[#0f242c] rounded-lg overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    alt={lang === 'ar' ? 'مركز حقوق النسان' : 'Human Rights Center'}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c3944] via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="text-white"
                    >
                      <h3 className={`text-2xl ${t.serif} font-bold mb-2`}>
                        {t.center.intro.title}
                      </h3>
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* Decorative Element */}
                <motion.div
                  className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#f7c20e] rounded-lg -z-10"
                  animate={{ 
                    rotate: [0, 5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About the Foundation Section */}
      <section className="py-24 lg:py-32 bg-[#1c3944] relative overflow-hidden">
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
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 bg-[#f7c20e] rounded-full flex items-center justify-center">
                    <Bird className="text-[#1c3944]" size={22} />
                  </div>
                  <span className="text-white font-medium">{lang === 'ar' ? 'الحرية' : 'Freedom'}</span>
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
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#f7c20e] opacity-5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#1c3944] opacity-5 rounded-full blur-2xl"></div>
        
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
              {lang === 'ar' ? 'رائد الإصلاح الديمقراطي' : 'Democratic Reform Pioneer'}
            </p>
            
            <div style={{ marginTop: '1.5rem' }}>
              <Link href="/founder">
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="inline-block bg-[#1c3944] text-white px-8 py-3 text-sm font-semibold hover:bg-[#f7c20e] hover:text-[#1c3944] transition-all duration-300 cursor-pointer"
                >
                  {lang === 'ar' ? 'تعرف على رياض سيف' : 'Meet Riad Seif'}
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}