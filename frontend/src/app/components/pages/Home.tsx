import { ArrowRight, ArrowLeft, BookOpen, Users, MessageSquare, Scale, Heart, ShieldCheck, Landmark, Quote, X } from 'lucide-react';
import { Link } from 'wouter';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { fetchNewsUpdates, type NewsUpdate } from '../../utils/api';
import RichText from '../RichText';

export default function Home({ lang, content }) {
  const t = content[lang];
  const isRTL = lang === 'ar';
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [newsItems, setNewsItems] = useState<NewsUpdate[]>([]);
  const [newsStartIndex, setNewsStartIndex] = useState(0);
  const [selectedNews, setSelectedNews] = useState<null | {
    title: string;
    summary: string;
    content?: string;
    date?: string;
    image?: string | null;
  }>(null);

  // Slider content
  const defaultSlides = [
    {
      image: 'https://images.unsplash.com/photo-1643276500881-281d554a72e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      titleAr: '\u0628\u0646\u0627\u0621 \u0633\u0648\u0631\u064a\u0627 \u0639\u0627\u062f\u0644\u0629 \u0648\u062f\u064a\u0645\u0648\u0642\u0631\u0627\u0637\u064a\u0629',
      titleEn: 'Building a Just and Democratic Syria',
      descAr: '\u0645\u0624\u0633\u0633\u0629 \u0631\u064a\u0627\u0636 \u0633\u064a\u0641 \u0644\u062d\u0642\u0648\u0642 \u0627\u0644\u0625\u0646\u0633\u0627\u0646 - \u0645\u0646\u0638\u0645\u0629 \u063a\u064a\u0631 \u062d\u0643\u0648\u0645\u064a\u0629 \u0648\u063a\u064a\u0631 \u0631\u0628\u062d\u064a\u0629 \u0645\u0642\u0631\u0647\u0627 \u062f\u0645\u0634\u0642 \u062a\u0639\u0645\u0644 \u0639\u0644\u0649 \u062a\u0639\u0632\u064a\u0632 \u0627\u0644\u0639\u062f\u0627\u0644\u0629 \u0648\u062d\u0642\u0648\u0642 \u0627\u0644\u0625\u0646\u0633\u0627\u0646 \u0648\u0627\u0644\u0625\u0635\u0644\u0627\u062d \u0627\u0644\u062f\u064a\u0645\u0642\u0631\u0627\u0637\u064a',
      descEn: 'Riad Seif Foundation for Human Rights - A non-governmental, non-profit organization based in Damascus promoting justice, human rights, and democratic reform',
      icon: Heart,
      link: '/about',
      color: '#f7c20e'
    },
    {
      image: 'https://images.unsplash.com/photo-1719159381916-062fa9f435a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      titleAr: '\u0645\u0631\u0643\u0632 \u062d\u0642\u0648\u0642 \u0627\u0644\u0625\u0646\u0633\u0627\u0646',
      titleEn: 'Human Rights Center',
      descAr: '\u0628\u0631\u0627\u0645\u062c \u062a\u062f\u0631\u064a\u0628\u064a\u0629 \u0645\u062a\u062e\u0635\u0635\u0629 \u0641\u064a \u062d\u0642\u0648\u0642 \u0627\u0644\u0625\u0646\u0633\u0627\u0646 \u0648\u0627\u0644\u0639\u062f\u0627\u0644\u0629 \u0627\u0644\u0627\u0646\u062a\u0642\u0627\u0644\u064a\u0629 \u0648\u0627\u0644\u062f\u064a\u0645\u0642\u0631\u0627\u0637\u064a\u0629',
      descEn: 'Specialized training programs in human rights, transitional justice, and democracy',
      icon: BookOpen,
      link: '/center',
      color: '#f7c20e'
    },
    {
      image: 'https://images.unsplash.com/photo-1695891835429-04bb13f65196?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      titleAr: '\u0645\u0646\u062a\u062f\u0649 \u0627\u0644\u062d\u0648\u0627\u0631 \u0627\u0644\u0648\u0637\u0646\u064a',
      titleEn: 'National Dialogue Forum',
      descAr: '\u0645\u0646\u0635\u0629 \u0644\u0644\u062d\u0648\u0627\u0631 \u0627\u0644\u0628\u0646\u0627\u0621 \u0648\u062a\u0639\u0632\u064a\u0632 \u062b\u0642\u0627\u0641\u0629 \u0627\u0644\u0646\u0642\u0627\u0634 \u0627\u0644\u062f\u064a\u0645\u0642\u0631\u0627\u0637\u064a \u0648\u0627\u0644\u062a\u0641\u0627\u0647\u0645',
      descEn: 'Platform for constructive dialogue promoting democratic discussion culture',
      icon: MessageSquare,
      link: '/forum',
      color: '#f7c20e'
    },
    {
      image: 'https://images.unsplash.com/photo-1734278095046-f31918334855?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      titleAr: '\u0631\u064a\u0627\u0636 \u0633\u064a\u0641',
      titleEn: 'Riad Seif',
      descAr: '\u0631\u0627\u0626\u062f \u0627\u0644\u0625\u0635\u0644\u0627\u062d \u0627\u0644\u062f\u064a\u0645\u0642\u0631\u0627\u0637\u064a \u0648\u0627\u0644\u0645\u062f\u0627\u0641\u0639 \u0627\u0644\u0634\u062c\u0627\u0639 \u0639\u0646 \u062d\u0642\u0648\u0642 \u0627\u0644\u0625\u0646\u0633\u0627\u0646 \u0641\u064a \u0633\u0648\u0631\u064a\u0627',
      descEn: 'Pioneer of democratic reform and courageous human rights advocate in Syria',
      icon: Users,
      link: '/founder',
      color: '#f7c20e'
    }
  ];

  const baseSlides = Array.isArray(t.home?.heroSlides) && t.home.heroSlides.length
    ? t.home.heroSlides
    : defaultSlides;

  const textValue = (value: unknown) => {
    if (typeof value === "string") return value.trim();
    if (typeof value === "number") return String(value);
    return "";
  };

  const firstText = (...values: unknown[]) => {
    for (const value of values) {
      const next = textValue(value);
      if (next) return next;
    }
    return "";
  };

  const slides = baseSlides.map((slide, index) => {
    const fallback = defaultSlides[index % defaultSlides.length];
    const titleAr = firstText(
      slide?.titleAr,
      slide?.title_ar,
      slide?.title?.ar,
      slide?.title?.arabic,
      slide?.headingAr,
      slide?.heading_ar,
      slide?.headlineAr,
      slide?.headline_ar,
      typeof slide?.title === "string" ? slide.title : "",
    );
    const titleEn = firstText(
      slide?.titleEn,
      slide?.title_en,
      slide?.title?.en,
      slide?.title?.english,
      slide?.headingEn,
      slide?.heading_en,
      slide?.headlineEn,
      slide?.headline_en,
      typeof slide?.title === "string" ? slide.title : "",
    );
    const descAr = firstText(
      slide?.descAr,
      slide?.desc_ar,
      slide?.descriptionAr,
      slide?.description_ar,
      slide?.description?.ar,
      slide?.description?.arabic,
      slide?.textAr,
      slide?.text_ar,
      slide?.subtitleAr,
      slide?.subtitle_ar,
      slide?.summaryAr,
      slide?.summary_ar,
      typeof slide?.desc === "string" ? slide.desc : "",
      typeof slide?.description === "string" ? slide.description : "",
    );
    const descEn = firstText(
      slide?.descEn,
      slide?.desc_en,
      slide?.descriptionEn,
      slide?.description_en,
      slide?.description?.en,
      slide?.description?.english,
      slide?.textEn,
      slide?.text_en,
      slide?.subtitleEn,
      slide?.subtitle_en,
      slide?.summaryEn,
      slide?.summary_en,
      typeof slide?.desc === "string" ? slide.desc : "",
      typeof slide?.description === "string" ? slide.description : "",
    );

    const hasHtml = (value: unknown) => typeof value === "string" && /<[^>]+>/.test(value);
    const resolvedDescAr = hasHtml(descAr)
      ? descAr
      : hasHtml(slide?.desc)
      ? String(slide.desc)
      : descAr || slide?.desc || fallback.descAr || fallback.descEn;
    const resolvedDescEn = hasHtml(descEn)
      ? descEn
      : hasHtml(slide?.desc)
      ? String(slide.desc)
      : descEn || slide?.desc || fallback.descEn || fallback.descAr;

    return {
      ...fallback,
      ...slide,
      image: firstText(slide?.image, slide?.image_url, slide?.photo, slide?.cover) || fallback.image,
      link: firstText(slide?.link, slide?.url, slide?.path) || fallback.link,
      titleAr: titleAr || titleEn || fallback.titleAr,
      titleEn: titleEn || titleAr || fallback.titleEn,
      descAr: resolvedDescAr,
      descEn: resolvedDescEn,
      color: firstText(slide?.color, slide?.textColor) || fallback.color,
      icon: slide?.icon || fallback.icon,
    };
  });

  const programsSection = t.home?.programsSection;
  const centerSection = t.home?.centerSection;
  const aboutFoundationSection = t.home?.aboutFoundationSection;
  const founderQuote = t.home?.founderQuote;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchNewsUpdates()
      .then((items) => {
        setNewsItems(items ?? []);
      })
      .catch(() => {
        setNewsItems([]);
      });
  }, []);

  const normalizedNewsCards = newsItems.length
    ? newsItems.map((item) => ({
        type: lang === 'ar' ? item.summary_ar : item.summary_en,
        title: lang === 'ar' ? item.title_ar : item.title_en,
        date: item.published_date,
        summary: lang === 'ar' ? item.summary_ar : item.summary_en,
        content: lang === 'ar' ? item.content_ar : item.content_en,
        image: item.image_url ?? null,
      }))
    : t.publications.items.map((item) => ({
        type: item.type,
        title: item.title,
        date: item.date,
        summary: item.type,
        content: '',
        image: null,
      }));

  const visibleNewsCards = normalizedNewsCards.length <= 3
    ? normalizedNewsCards
    : [0, 1, 2].map((offset) => normalizedNewsCards[(newsStartIndex + offset) % normalizedNewsCards.length]);

  useEffect(() => {
    if (normalizedNewsCards.length <= 3) return;
    const interval = setInterval(() => {
      setNewsStartIndex((prev) => (prev + 1) % normalizedNewsCards.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [normalizedNewsCards.length]);

  useEffect(() => {
    setNewsStartIndex(0);
  }, [lang, newsItems.length]);

  const nextNewsSlide = () => {
    if (normalizedNewsCards.length <= 3) return;
    setNewsStartIndex((prev) => (prev + 1) % normalizedNewsCards.length);
  };

  const prevNewsSlide = () => {
    if (normalizedNewsCards.length <= 3) return;
    setNewsStartIndex((prev) => (prev - 1 + normalizedNewsCards.length) % normalizedNewsCards.length);
  };

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
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 flex items-start pt-24 sm:pt-28 lg:pt-40" style={{ height: '92vh' }}>
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
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: currentSlide === index ? 1 : 0,
                      y: currentSlide === index ? 0 : 20
                    }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <RichText
                      as="div"
                      value={lang === 'ar' ? slide.titleAr : slide.titleEn}
                      className={`hero-rich-title text-3xl sm:text-4xl lg:text-5xl xl:text-6xl ${t.serif} font-bold leading-snug lg:leading-tight mb-5 lg:mb-6 drop-shadow-2xl text-white px-[10px] py-[0px] break-words`}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: currentSlide === index ? 1 : 0,
                      y: currentSlide === index ? 0 : 20
                    }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <RichText
                      as="div"
                      value={lang === 'ar' ? slide.descAr : slide.descEn}
                      className="hero-rich-desc text-base sm:text-lg lg:text-xl text-white/95 leading-relaxed font-light drop-shadow-xl mb-7 lg:mb-8 px-[10px] py-[0px] max-w-2xl"
                    />
                  </motion.div>
                  
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
              <RichText
                as="h2"
                value={t.home.newsSection.title}
                className={`text-3xl lg:text-4xl ${t.serif} font-bold text-[#1c3944] mb-3`}
              />
              <RichText as="p" value={t.home.newsSection.subtitle} className="text-slate-600 text-lg" />
            </div>
            <Link href="/publications">
              <span className={`hidden md:flex items-center gap-2 text-[#1c3944] hover:text-[#f7c20e] transition-colors text-sm font-semibold cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                {t.publications.access.title}
                {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              </span>
            </Link>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-slate-500">
              {normalizedNewsCards.length > 3
                ? (isRTL ? 'اسحب لمشاهدة المزيد من الأخبار' : 'Slide to see more news')
                : ' '}
            </div>
            {normalizedNewsCards.length > 3 ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevNewsSlide}
                  className="h-9 w-9 rounded-full border border-slate-300 text-slate-600 hover:border-[#f7c20e] hover:text-[#f7c20e]"
                  aria-label={isRTL ? 'السابق' : 'Previous'}
                >
                  {isRTL ? <ArrowRight size={16} className="mx-auto" /> : <ArrowLeft size={16} className="mx-auto" />}
                </button>
                <button
                  type="button"
                  onClick={nextNewsSlide}
                  className="h-9 w-9 rounded-full border border-slate-300 text-slate-600 hover:border-[#f7c20e] hover:text-[#f7c20e]"
                  aria-label={isRTL ? 'التالي' : 'Next'}
                >
                  {isRTL ? <ArrowLeft size={16} className="mx-auto" /> : <ArrowRight size={16} className="mx-auto" />}
                </button>
              </div>
            ) : null}
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
            {visibleNewsCards.map((item, i) => (
              <motion.div
                key={`${item.title}-${newsStartIndex}-${i}`}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border border-slate-200 hover:border-[#f7c20e]"
                onClick={() =>
                  setSelectedNews({
                    title: item.title,
                    summary: item.summary,
                    content: item.content,
                    date: item.date,
                    image: item.image,
                  })
                }
              >
                <div className="text-xs font-semibold text-[#f7c20e] mb-3 uppercase tracking-wide">{item.type}</div>
                <RichText
                  as="h4"
                  value={item.title}
                  className={`text-lg ${t.serif} font-bold mb-3 text-[#1c3944] leading-snug`}
                />
                <div className="text-slate-500 text-sm">{item.date}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {selectedNews ? (
        <div
          className="fixed inset-0 z-[70] bg-black/55 flex items-center justify-center px-4"
          onClick={() => setSelectedNews(null)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-2xl p-6 lg:p-8 max-h-[85vh] overflow-y-auto"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 className={`text-2xl ${t.serif} text-[#1c3944]`}>{selectedNews.title}</h3>
              <button
                type="button"
                className="h-9 w-9 rounded-full border border-slate-300 text-slate-500 hover:text-slate-800"
                onClick={() => setSelectedNews(null)}
                aria-label={isRTL ? 'إغلاق' : 'Close'}
              >
                <X size={16} className="mx-auto" />
              </button>
            </div>
            {selectedNews.image ? (
              <img
                src={selectedNews.image}
                alt={selectedNews.title}
                className="w-full h-64 object-cover rounded-xl mb-4"
              />
            ) : null}
            {selectedNews.date ? <div className="text-sm text-slate-500 mb-4">{selectedNews.date}</div> : null}
            <p className="text-slate-700 leading-8 mb-4">{selectedNews.summary}</p>
            {selectedNews.content ? (
              <div
                className="prose max-w-none text-slate-700"
                dangerouslySetInnerHTML={{ __html: selectedNews.content }}
              />
            ) : null}
          </div>
        </div>
      ) : null}

      {/* Programs Section */}
      <section className="py-24 lg:py-32 xl:py-40 relative overflow-hidden">
        <div className="absolute top-24 left-12 w-40 h-40 bg-[#f7c20e] opacity-4 rounded-full blur-3xl"></div>
        <div className="absolute bottom-24 right-12 w-36 h-36 bg-[#1c3944] opacity-4 rounded-full blur-2xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 lg:mb-20 xl:mb-24">
            <RichText as="h2" value={programsSection?.title ?? (lang === 'ar' ? 'البرامج' : 'Programs')} className={`text-4xl lg:text-5xl ${t.serif} font-bold text-[#1c3944] mb-4`} />
            <RichText as="p" value={programsSection?.subtitle ??
                (lang === 'ar'
                  ? 'نسعى عبر برامجنا وأنشطتنا لدعم الانتقال الديمقراطي وحقوق الإنسان في سوريا'
                  : 'Through our programs and activities, we support democratic transition and human rights in Syria')} className="text-slate-600 text-lg max-w-2xl mx-auto" />
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
              <Link href={programsSection?.cards?.[0]?.link ?? "/center"}>
                <div>
                  <div className="w-14 h-14 bg-[#f7c20e] bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                    <BookOpen className="text-[#f7c20e]" size={28} />
                  </div>
                  <RichText as="h3" value={programsSection?.cards?.[0]?.title ?? t.nav.center} className={`text-xl ${t.serif} font-bold text-[#1c3944] mb-4`} />
                  <RichText as="p" value={programsSection?.cards?.[0]?.text ??
                      (lang === 'ar'
                        ? 'برامج تدريبية شاملة في مجال حقوق الإنسان والديمقراطية والعدالة الانتقالية'
                        : 'Comprehensive training programs in human rights, democracy, and transitional justice')} className="text-slate-600 leading-relaxed mb-6" />
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
              <Link href={programsSection?.cards?.[1]?.link ?? "/forum"}>
                <div>
                  <div className="w-14 h-14 bg-[#1c3944] bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                    <MessageSquare className="text-[#1c3944]" size={28} />
                  </div>
                  <RichText as="h3" value={programsSection?.cards?.[1]?.title ?? t.nav.forum} className={`text-xl ${t.serif} font-bold text-[#1c3944] mb-4`} />
                  <RichText as="p" value={programsSection?.cards?.[1]?.text ??
                      (lang === 'ar'
                        ? 'منصة للحوار المفتوح والبناء حول قضايا المجتمع المدني والديمقراطية'
                        : 'Platform for open and constructive dialogue on civil society and democracy issues')} className="text-slate-600 leading-relaxed mb-6" />
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
              <Link href={programsSection?.cards?.[2]?.link ?? "/founder"}>
                <div>
                  <div className="w-14 h-14 bg-[#2c1d5f] bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                    <Users className="text-[#2c1d5f]" size={28} />
                  </div>
                  <RichText as="h3" value={programsSection?.cards?.[2]?.title ?? t.nav.founder} className={`text-xl ${t.serif} font-bold text-[#1c3944] mb-4`} />
                  <RichText as="p" value={programsSection?.cards?.[2]?.text ??
                      (lang === 'ar'
                        ? 'تعرف على رياض سيف، رائد الإصلاح الديمقراطي والمدافع عن حقوق الإنسان'
                        : 'Learn about Riad Seif, pioneer of democratic reform and human rights advocate')} className="text-slate-600 leading-relaxed mb-6" />
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
              <RichText
                as="span"
                value={centerSection?.tagline ?? (lang === 'ar' ? 'برنامجنا الرئيسي' : 'Our Main Program')}
                className="text-[#f7c20e] text-sm font-semibold uppercase tracking-widest mb-4 block"
              />
              <RichText as="h2" value={centerSection?.title ?? t.center.title} className={`text-4xl lg:text-5xl ${t.serif} font-bold text-[#1c3944] mb-6`} />
              <RichText as="p" value={centerSection?.description ?? t.center.intro.text} className="text-slate-600 text-lg leading-relaxed mb-6" />
              
              <div className="space-y-4 mb-8">
                <motion.div 
                  className="grid grid-cols-[40px_1fr] items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-10 h-10 bg-[#f7c20e] bg-opacity-10 rounded-full flex items-center justify-center shrink-0">
                    <BookOpen className="text-[#f7c20e]" size={20} />
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <RichText
                      as="h4"
                      value={centerSection?.bullets?.[0]?.title ?? (lang === 'ar' ? 'التدريب المتخصص' : 'Specialized Training')}
                      className="font-semibold text-[#1c3944] mb-1"
                    />
                    <RichText as="p" value={centerSection?.bullets?.[0]?.text ??
                        (lang === 'ar'
                          ? 'برامج تدريبية مصممة خصيصاً للسياق السوري في مجال حقوق الإنسان والعدالة الانتقالية'
                          : 'Training programs specifically designed for the Syrian context in human rights and transitional justice')} className="text-slate-600 text-sm" />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="grid grid-cols-[40px_1fr] items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="w-10 h-10 bg-[#f7c20e] bg-opacity-10 rounded-full flex items-center justify-center shrink-0">
                    <Users className="text-[#f7c20e]" size={20} />
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <RichText
                      as="h4"
                      value={centerSection?.bullets?.[1]?.title ?? (lang === 'ar' ? 'بناء القيادات' : 'Leadership Building')}
                      className="font-semibold text-[#1c3944] mb-1"
                    />
                    <RichText as="p" value={centerSection?.bullets?.[1]?.text ??
                        (lang === 'ar'
                          ? 'إعداد جيل جديد من المحامين والمدافعين عن حقوق الإنسان من خلال التوجيه والتشبيك'
                          : 'Preparing a new generation of lawyers and human rights defenders through mentorship and networking')} className="text-slate-600 text-sm" />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="grid grid-cols-[40px_1fr] items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="w-10 h-10 bg-[#f7c20e] bg-opacity-10 rounded-full flex items-center justify-center shrink-0">
                    <Scale className="text-[#f7c20e]" size={20} />
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <RichText
                      as="h4"
                      value={centerSection?.bullets?.[2]?.title ?? (lang === 'ar' ? 'العدالة الانتقالية' : 'Transitional Justice')}
                      className="font-semibold text-[#1c3944] mb-1"
                    />
                    <RichText as="p" value={centerSection?.bullets?.[2]?.text ??
                        (lang === 'ar'
                          ? 'التركيز على الحقيقة والعدالة وجبر الضرر وضمان عدم التكرار'
                          : 'Focus on truth, justice, reparations, and guarantees of non-recurrence')} className="text-slate-600 text-sm" />
                  </div>
                </motion.div>
              </div>
              
              <Link href="/center">
                <motion.div 
                  whileHover={{ x: isRTL ? -5 : 5 }}
                  className={`flex items-center gap-3 text-[#f7c20e] font-semibold cursor-pointer w-fit ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <RichText as="span" value={centerSection?.cta ?? (lang === 'ar' ? 'اكتشف المزيد عن المركز' : 'Discover More About the Center')} />
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
                    src={centerSection?.image ?? "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"}
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
              <RichText
                as="span"
                value={aboutFoundationSection?.tagline ?? (lang === 'ar' ? 'من نحن' : 'Who We Are')}
                className="text-[#f7c20e] text-sm font-semibold uppercase tracking-widest mb-4 block"
              />
              <RichText as="h2" value={aboutFoundationSection?.title ?? (lang === 'ar' ? 'عن المؤسسة' : 'About the Foundation')} className={`text-4xl lg:text-5xl ${t.serif} font-bold text-white mb-6`} />
              <RichText as="p" value={aboutFoundationSection?.description ??
                  (lang === 'ar'
                    ? 'مؤسسة رياض سيف لحقوق الإنسان هي منظمة غير حكومية وغير ربحية تأسست لتكريم إرث المناضل رياض سيف. نعمل على تعزيز قيم الديمقراطية والعدالة وحقوق الإنسان في سوريا من خلال برامج تدريبية ومبادرات حوارية.'
                    : 'The Riad Seif Foundation for Human Rights is a non-governmental, non-profit organization founded to honor the legacy of activist Riad Seif. We work to promote democracy, justice, and human rights in Syria through training programs and dialogue initiatives.')} className="text-slate-300 text-lg leading-relaxed mb-6" />
              <div className="flex flex-wrap gap-8 mt-8">
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 bg-[#f7c20e] rounded-full flex items-center justify-center">
                    <Scale className="text-[#1c3944]" size={22} />
                  </div>
                  <span className="text-white font-medium">{lang === 'ar' ? 'العدالة' : 'Justice'}</span>
                </div>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 bg-[#f7c20e] rounded-full flex items-center justify-center">
                    <ShieldCheck className="text-[#1c3944]" size={22} />
                  </div>
                  <span className="text-white font-medium">{lang === 'ar' ? 'المساءلة' : 'Accountability'}</span>
                </div>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 bg-[#f7c20e] rounded-full flex items-center justify-center">
                    <Landmark className="text-[#1c3944]" size={22} />
                  </div>
                  <span className="text-white font-medium">{lang === 'ar' ? 'الديموقراطية' : 'Democracy'}</span>
                </div>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 bg-[#f7c20e] rounded-full flex items-center justify-center">
                    <MessageSquare className="text-[#1c3944]" size={22} />
                  </div>
                  <span className="text-white font-medium">{lang === 'ar' ? 'الحوار' : 'Dialogue'}</span>
                </div>
              </div>
              
              <Link href="/about" className="block" style={{ marginTop: '4rem' }}>
                <motion.div 
                  whileHover={{ x: isRTL ? -5 : 5 }}
                  className={`flex items-center gap-3 text-[#f7c20e] font-semibold cursor-pointer w-fit ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <RichText as="span" value={aboutFoundationSection?.cta ?? (lang === 'ar' ? 'اكتشف المزيد' : 'Discover More')} />
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
                  <div className="text-4xl font-bold text-[#f7c20e] mb-2">
                    {aboutFoundationSection?.stats?.[0]?.value ?? '15+'}
                  </div>
                  <div className="text-slate-300 text-sm">
                    {aboutFoundationSection?.stats?.[0]?.label ?? (lang === 'ar' ? 'سنوات من العمل' : 'Years of Work')}
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg border border-white border-opacity-10 mt-8"
                >
                  <div className="text-4xl font-bold text-[#f7c20e] mb-2">
                    {aboutFoundationSection?.stats?.[1]?.value ?? '500+'}
                  </div>
                  <div className="text-slate-300 text-sm">
                    {aboutFoundationSection?.stats?.[1]?.label ?? (lang === 'ar' ? 'مستفيد' : 'Beneficiaries')}
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg border border-white border-opacity-10"
                >
                  <div className="text-4xl font-bold text-[#f7c20e] mb-2">
                    {aboutFoundationSection?.stats?.[2]?.value ?? '50+'}
                  </div>
                  <div className="text-slate-300 text-sm">
                    {aboutFoundationSection?.stats?.[2]?.label ?? (lang === 'ar' ? 'برنامج تدريبي' : 'Training Programs')}
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg border border-white border-opacity-10 mt-8"
                >
                  <div className="text-4xl font-bold text-[#f7c20e] mb-2">
                    {aboutFoundationSection?.stats?.[3]?.value ?? '100+'}
                  </div>
                  <div className="text-slate-300 text-sm">
                    {aboutFoundationSection?.stats?.[3]?.label ?? (lang === 'ar' ? 'شريك' : 'Partners')}
                  </div>
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
            <RichText as="blockquote" value={founderQuote?.quote ??
                (lang === 'ar'
                  ? '"الديمقراطية ليست مجرد نظام حكم، بل هي ثقافة حياة تقوم على احترام الإنسان وكرامته وحقوقه الأساسية."'
                  : '"Democracy is not just a system of governance, but a culture of life based on respect for human dignity and fundamental rights."')} className={`text-2xl lg:text-3xl ${t.serif} text-[#1c3944] leading-relaxed mb-8 font-medium`} />
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-1 bg-[#f7c20e]"></div>
              <RichText
                as="span"
                value={founderQuote?.author ?? (lang === 'ar' ? 'رياض سيف' : 'Riad Seif')}
                className={`${t.serif} text-lg text-[#1c3944] font-semibold`}
              />
              <div className="w-16 h-1 bg-[#f7c20e]"></div>
            </div>
            <RichText as="p" value={founderQuote?.role ?? (lang === 'ar' ? 'رائد الإصلاح الديمقراطي' : 'Democratic Reform Pioneer')} className="text-slate-500 text-sm" style={{ marginTop: '2rem' }} />
            
            <div style={{ marginTop: '1.5rem' }}>
              <Link href="/founder">
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="inline-block bg-[#1c3944] text-white px-8 py-3 text-sm font-semibold hover:bg-[#f7c20e] hover:text-[#1c3944] transition-all duration-300 cursor-pointer"
                >
                  <RichText as="span" value={founderQuote?.cta ?? (lang === 'ar' ? 'تعرف على رياض سيف' : 'Meet Riad Seif')} />
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

