import { CheckCircle, BookOpen, Users, Award, Target, TrendingUp, X } from 'lucide-react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import RichText from '../RichText';

const fallbackCenterData = {
  en: {
    features: [
      { title: 'Specialized Curriculum', desc: 'Training programs tailored to Syrian context', color: '#f7c20e' },
      { title: 'Local Experts', desc: 'Experienced trainers and advisors', color: '#1c3944' },
      { title: 'Certified Programs', desc: 'Internationally recognized certificates', color: '#2c1d5f' },
      { title: 'Practical Application', desc: 'Real-world exercises and case studies', color: '#0d9488' },
    ],
    stats: [
      { value: '500+', label: 'Trainees' },
      { value: '50+', label: 'Programs' },
      { value: '100%', label: 'Satisfaction' },
    ],
    curriculumItems: [
      {
        id: 1,
        name: 'Human Rights Law',
        description:
          'A comprehensive program covering international human rights law, frameworks, and conventions. Participants will learn about the Universal Declaration of Human Rights, regional human rights systems, and how to apply these principles in the Syrian context. The course includes case studies, practical exercises, and interactive discussions with experienced legal practitioners.',
      },
      {
        id: 2,
        name: 'Transitional Justice',
        description:
          'An in-depth exploration of transitional justice mechanisms including truth commissions, reparations, institutional reform, and guarantees of non-recurrence. This program examines international experiences and adapts best practices to the Syrian transition context. Participants will develop practical skills in documentation, victim-centered approaches, and accountability mechanisms.',
      },
      {
        id: 3,
        name: "Women's Rights",
        description:
          "A focused program on gender justice, women's rights frameworks, and feminist legal theory. Topics include CEDAW, UN Security Council Resolution 1325, gender-based violence, women's political participation, and economic empowerment. The course emphasizes the crucial role of women in peacebuilding and democratic transitions, with specific attention to Syrian women's experiences.",
      },
      {
        id: 4,
        name: 'Advocacy',
        description:
          'A practical training on advocacy strategies, campaign design, stakeholder engagement, and strategic communication. Participants will learn how to develop advocacy plans, build coalitions, engage with media, and leverage national and international mechanisms for human rights protection. The program includes hands-on exercises in public speaking, policy brief writing, and digital advocacy.',
      },
    ],
    detailsLabel: 'Details',
    programLabel: 'Training Program',
    participationPrompt: 'Interested in participating in this program?',
    contactCta: 'Contact Us',
  },
  ar: {
    features: [
      { title: 'مناهج متخصصة', desc: 'برامج تدريبية مصممة للسياق السوري', color: '#f7c20e' },
      { title: 'خبراء محليون', desc: 'مدربون ومستشارون من ذوي الخبرة', color: '#1c3944' },
      { title: 'شهادات معتمدة', desc: 'شهادات معترف بها دولياً', color: '#2c1d5f' },
      { title: 'تطبيق عملي', desc: 'تمارين وحالات دراسية واقعية', color: '#0d9488' },
    ],
    stats: [
      { value: '500+', label: 'متدرب' },
      { value: '50+', label: 'برنامج' },
      { value: '100%', label: 'رضا المتدربين' },
    ],
    curriculumItems: [
      {
        id: 1,
        name: 'قانون حقوق الإنسان',
        description:
          'برنامج شامل يغطي القانون الدولي لحقوق الإنسان والأطر والاتفاقيات. سيتعلم المشاركون عن الإعلان العالمي لحقوق الإنسان، وأنظمة حقوق الإنسان الإقليمية، وكيفية تطبيق هذه المبادئ في السياق السوري. يتضمن الدورة دراسات حالة، وتمارين عملية، ومناقشات تفاعلية مع ممارسين قانونيين ذوي خبرة.',
      },
      {
        id: 2,
        name: 'العدالة الانتقالية',
        description:
          'استكشاف متعمق لآليات العدالة الانتقالية بما في ذلك لجان الحقيقة، والتعويضات، والإصلاح المؤسسي، وضمانات عدم التكرار. يدرس هذا البرنامج التجارب الدولية ويكيف أفضل الممارسات مع سياق الانتقال السوري. سيطور المشاركون مهارات عملية في التوثيق، والنهج المتمحور حول الضحايا، وآليات المساءلة.',
      },
      {
        id: 3,
        name: 'حقوق المرأة',
        description:
          'برنامج مركز على العدالة الجندرية، وأطر حقوق المرأة، والنظرية القانونية النسوية. تشمل المواضيع اتفاقية القضاء على جميع أشكال التمييز ضد المرأة، وقرار مجلس الأمن رقم 1325، والعنف القائم على النوع الاجتماعي، والمشاركة السياسية للمرأة، والتمكين الاقتصادي. تركز الدورة على الدور الحاسم للمرأة في بناء السلام والانتقالات الديمقراطية، مع اهتمام خاص بتجارب النساء السوريات.',
      },
      {
        id: 4,
        name: 'المناصرة والدفاع',
        description:
          'تدريب عملي على استراتيجيات المناصرة، وتصميم الحملات، والتواصل مع أصحاب المصلحة، والتواصل الاستراتيجي. سيتعلم المشاركون كيفية تطوير خطط المناصرة، وبناء التحالفات، والتعامل مع وسائل الإعلام، والاستفادة من الآليات الوطنية والدولية لحماية حقوق الإنسان. يتضمن البرنامج تمارين عملية في الخطابة العامة، وكتابة ملخصات السياسات، والمناصرة الرقمية.',
      },
    ],
    detailsLabel: 'التفاصيل',
    programLabel: 'برنامج تدريبي',
    participationPrompt: 'هل أنت مهتم بالمشاركة في هذا البرنامج؟',
    contactCta: 'تواصل معنا',
  },
};

export default function Center({ lang, content }) {
  const t = content[lang];
  const isRTL = lang === 'ar';
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const localeFallback = fallbackCenterData[lang] ?? fallbackCenterData.en;
  const iconSet = [BookOpen, Users, Award, Target];

  const features =
    Array.isArray(t?.center?.features) && t.center.features.length > 0
      ? t.center.features.map((feature: any, idx: number) => ({
          icon: iconSet[idx % iconSet.length],
          title: feature?.title ?? '',
          desc: feature?.desc ?? '',
          color: feature?.color ?? '#1c3944',
        }))
      : localeFallback.features.map((feature, idx) => ({
          ...feature,
          icon: iconSet[idx % iconSet.length],
        }));

  const stats =
    Array.isArray(t?.center?.stats) && t.center.stats.length > 0
      ? t.center.stats.map((stat: any, idx: number) => ({
          value: stat?.value ?? '',
          label: stat?.label ?? '',
          delay: 0.2 + idx * 0.2,
        }))
      : localeFallback.stats.map((stat, idx) => ({
          ...stat,
          delay: 0.2 + idx * 0.2,
        }));

  const trainingPrograms =
    Array.isArray(t?.center?.curriculum?.items) && t.center.curriculum.items.length > 0
      ? t.center.curriculum.items.map((program: any, idx: number) => ({
          id: program?.id ?? idx + 1,
          name: program?.name ?? '',
          description: program?.description ?? '',
        }))
      : localeFallback.curriculumItems;

  const detailsLabel = t?.center?.curriculum?.detailsLabel ?? localeFallback.detailsLabel;
  const programLabel = t?.center?.curriculum?.programLabel ?? localeFallback.programLabel;
  const participationPrompt =
    t?.center?.curriculum?.participationPrompt ?? localeFallback.participationPrompt;
  const contactCta = t?.center?.curriculum?.contactCta ?? localeFallback.contactCta;
  
  return (
    <div className="bg-white">
       {/* Header */}
       <div className="relative bg-[#2c1d5f] text-white py-20 lg:py-32 overflow-hidden">
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1758368290024-3c2ce0f11b62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              className="w-full h-full object-cover"
              alt=""
            />
          </motion.div>

          {/* Floating Elements */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-[#f7c20e] rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
             <motion.span
               className="text-[#f7c20e] font-bold uppercase tracking-widest text-sm mb-4 block"
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
             >
               {t.nav.center}
             </motion.span>
             <motion.div
               className="mb-6"
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
             >
               <RichText as="h1" value={t.center.intro.title} className={`text-4xl lg:text-5xl ${t.serif}`} />
             </motion.div>
             <motion.div
               className="text-xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed"
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
             >
               <RichText as="p" value={t.center.intro.text} />
             </motion.div>
          </div>
       </div>

       {/* Stats Section */}
       <div className="bg-white py-16 border-b border-slate-200">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <div className="grid md:grid-cols-3 gap-8">
             {stats.map((stat, idx) => (
               <motion.div
                 key={idx}
                 className="bg-white border-2 border-slate-200 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl hover:border-[#f7c20e] transition-all duration-300"
                 initial={{ opacity: 0, scale: 0.5 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: stat.delay, type: "spring", stiffness: 200 }}
                 whileHover={{ y: -5 }}
               >
                 <motion.div
                   className="text-5xl lg:text-6xl font-bold text-[#1c3944] mb-2"
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   viewport={{ once: true }}
                 >
                   {stat.value}
                 </motion.div>
                 <div className="text-slate-600 text-sm uppercase tracking-wide font-medium">{stat.label}</div>
                 <div className="mt-4 w-16 h-1 bg-[#f7c20e] mx-auto rounded-full"></div>
               </motion.div>
             ))}
           </div>
         </div>
       </div>

       <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          
          {/* Features Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="relative p-6 rounded-2xl bg-white cursor-pointer overflow-hidden"
                style={{ borderWidth: '2px', borderStyle: 'solid', borderColor: '#e2e8f0' }}
                onHoverStart={() => setHoveredCard(idx)}
                onHoverEnd={() => setHoveredCard(null)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
              >
                {/* Background Gradient on Hover */}
                <motion.div
                  className="absolute inset-0 opacity-0"
                  style={{ background: `linear-gradient(135deg, ${feature.color}10, ${feature.color}05)` }}
                  animate={{ opacity: hoveredCard === idx ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10">
                  <motion.div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${feature.color}20` }}
                    animate={{
                      scale: hoveredCard === idx ? 1.1 : 1,
                      rotate: hoveredCard === idx ? 5 : 0,
                    }}
                  >
                    <feature.icon size={32} style={{ color: feature.color }} />
                  </motion.div>
                  <RichText
                    as="h4"
                    value={feature.title}
                    className={`text-lg ${t.serif} font-bold text-[#1c3944] mb-2`}
                  />
                  <RichText as="p" value={feature.desc} className="text-slate-600 text-sm" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Content Sections - Vertical Flow */}
          <div className="max-w-4xl mx-auto space-y-20">
              
              {/* Curriculum Section */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                  <RichText
                    as="h3"
                    value={t.center.curriculum.title}
                    className={`text-3xl lg:text-4xl text-[#1c3944] mb-6 ${t.serif}`}
                  />
                  <RichText as="p" value={t.center.curriculum.text} className="text-slate-600 text-lg leading-relaxed mb-8" />
                  <ul className="space-y-3">
                      {trainingPrograms.map((program, i) => (
                          <motion.li
                            key={program.id}
                            className="flex items-center justify-between gap-3 text-slate-700 p-4 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border-2 border-transparent hover:border-[#f7c20e]"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ x: 5 }}
                            onClick={() => setSelectedProgram(program)}
                          >
                              <div className="flex items-center gap-3">
                                <motion.div
                                  whileHover={{ scale: 1.2, rotate: 360 }}
                                  transition={{ duration: 0.4 }}
                                >
                                  <CheckCircle size={18} className="text-[#f7c20e]" />
                                </motion.div>
                                <RichText as="span" value={program.name} className="font-medium" />
                              </div>
                              <motion.span 
                                className="text-[#f7c20e] text-sm font-semibold"
                                whileHover={{ x: isRTL ? -3 : 3 }}
                              >
                                {isRTL ? `← ${detailsLabel}` : `${detailsLabel} →`}
                              </motion.span>
                          </motion.li>
                      ))}
                  </ul>
              </motion.div>

              {/* Training Section */}
              <motion.div
                className="relative bg-white p-8 lg:p-12 rounded-2xl border-2 border-slate-200 hover:border-[#f7c20e] overflow-hidden transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                whileHover={{ y: -5 }}
              >
                  {/* Golden accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-[#f7c20e] to-[#e5b000]"></div>
                  
                  {/* Decorative floating circles */}
                  <motion.div
                    className="absolute -left-12 -bottom-12 w-48 h-48 bg-[#f7c20e] opacity-5 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 0]
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute -left-8 -bottom-8 w-32 h-32 bg-[#1c3944] opacity-5 rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, -90, 0]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Icon badge */}
                  <motion.div
                    className="absolute top-8 right-8 w-16 h-16 bg-[#f7c20e] bg-opacity-10 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <BookOpen className="text-[#f7c20e]" size={28} />
                  </motion.div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <RichText as="h3" value={t.center.training.title} className={`text-3xl lg:text-4xl text-[#1c3944] mb-6 ${t.serif}`} />
                    <RichText as="p" value={t.center.training.text} className="text-slate-600 text-lg leading-relaxed" />
                  </div>
              </motion.div>

              {/* Mentoring Section */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                  <RichText as="h3" value={t.center.mentoring.title} className={`text-3xl lg:text-4xl text-[#1c3944] mb-6 ${t.serif}`} />
                  <RichText as="p" value={t.center.mentoring.text} className="text-slate-600 text-lg leading-relaxed" />
              </motion.div>

              {/* Networking Section */}
              <motion.div
                className="border-t-4 border-[#1c3944] pt-8 bg-white p-8 lg:p-12 rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                whileHover={{ y: -5 }}
              >
                  <RichText as="h3" value={t.center.networking.title} className={`text-3xl lg:text-4xl text-[#1c3944] mb-6 ${t.serif}`} />
                  <RichText as="p" value={t.center.networking.text} className="text-slate-600 text-lg leading-relaxed mb-8" />
                  <Link href="/contact">
                     <motion.span
                       className="bg-[#1c3944] text-white px-8 py-3 font-bold transition-colors cursor-pointer inline-flex items-center gap-2 rounded-lg"
                       whileHover={{ backgroundColor: '#f7c20e', color: '#1c3944', scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                     >
                         <TrendingUp size={20} />
                         {lang === 'ar' ? 'استمارة المشاركة' : 'Apply for Participation'}
                     </motion.span>
                  </Link>
              </motion.div>
          </div>
       </div>

       {/* Program Detail Modal */}
       <AnimatePresence>
         {selectedProgram && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
             onClick={() => setSelectedProgram(null)}
           >
             <motion.div
               initial={{ scale: 0.9, opacity: 0, y: 50 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 50 }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
               className="bg-white max-w-3xl w-full max-h-[85vh] overflow-y-auto relative rounded-2xl shadow-2xl"
               onClick={(e) => e.stopPropagation()}
             >
               {/* Close Button */}
               <button
                 onClick={() => setSelectedProgram(null)}
                 className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/90 hover:bg-[#f7c20e] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:rotate-90 group"
               >
                 <X className="text-[#1c3944] group-hover:text-white" size={24} />
               </button>

               {/* Header with decorative elements */}
               <div className="relative bg-gradient-to-br from-[#1c3944] to-[#2c4a5a] text-white p-10 overflow-hidden">
                 {/* Decorative circles */}
                 <motion.div
                   className="absolute -right-8 -top-8 w-40 h-40 bg-[#f7c20e] opacity-10 rounded-full"
                   animate={{
                     scale: [1, 1.2, 1],
                     rotate: [0, 180, 360]
                   }}
                   transition={{
                     duration: 10,
                     repeat: Infinity,
                     ease: "linear"
                   }}
                 />
                 <motion.div
                   className="absolute -left-8 -bottom-8 w-32 h-32 bg-[#f7c20e] opacity-10 rounded-full"
                   animate={{
                     scale: [1.2, 1, 1.2],
                     rotate: [360, 180, 0]
                   }}
                   transition={{
                     duration: 8,
                     repeat: Infinity,
                     ease: "linear"
                   }}
                 />
                 
                 {/* Icon badge */}
                 <motion.div
                   className="w-20 h-20 bg-[#f7c20e] rounded-full flex items-center justify-center mb-6 relative z-10"
                   initial={{ scale: 0, rotate: -180 }}
                   animate={{ scale: 1, rotate: 0 }}
                   transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                 >
                   <BookOpen className="text-white" size={36} />
                 </motion.div>
                 
                  <div className="relative z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mb-2"
                    >
                      <RichText as="p" value={programLabel} className="text-[#f7c20e] font-semibold uppercase tracking-wider text-sm" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className={`text-3xl lg:text-4xl ${t.serif} font-bold`}
                    >
                      <RichText as="h2" value={selectedProgram.name} />
                    </motion.div>
                  </div>
                </div>

               {/* Content */}
               <div className="p-10">
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.5 }}
                   className="relative"
                 >
                   {/* Golden accent line */}
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#f7c20e] rounded-full"></div>
                   
                    <RichText as="div" value={selectedProgram.description} className="text-slate-700 text-lg leading-relaxed pl-6" />
                 </motion.div>

                 {/* Call to action */}
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.6 }}
                   className="mt-10 pt-8 border-t border-slate-200"
                 >
                    <RichText as="p" value={participationPrompt} className="text-slate-600 mb-6 text-center" />
                   <Link href="/contact">
                     <motion.button
                       className="w-full bg-[#1c3944] text-white px-8 py-4 font-bold rounded-lg flex items-center justify-center gap-3"
                       whileHover={{ backgroundColor: '#f7c20e', color: '#1c3944', scale: 1.02 }}
                       whileTap={{ scale: 0.98 }}
                       onClick={() => setSelectedProgram(null)}
                     >
                       <TrendingUp size={20} />
                        <RichText as="span" value={contactCta} />
                      </motion.button>
                    </Link>
                 </motion.div>
               </div>
             </motion.div>
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
}
