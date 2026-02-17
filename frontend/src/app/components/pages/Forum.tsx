import { Calendar, MessageSquare, Users, Video, Globe, Camera, FileText, UserCheck, X } from 'lucide-react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export default function Forum({ lang, content }) {
  const t = content[lang];
  const isRTL = lang === 'ar';
  const [activeTab, setActiveTab] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  const upcomingEvents = [
    {
      date: lang === 'ar' ? 'يناير 2025' : 'January 2025',
      title: lang === 'ar' ? 'الجلسة 45: دور الشباب في الحكم المحلي' : 'Session 45: Youth Role in Local Governance',
      type: lang === 'ar' ? 'عبر الإنترنت' : 'Online',
      icon: Video
    },
    {
      date: lang === 'ar' ? 'فبراير 2025' : 'February 2025',
      title: lang === 'ar' ? 'ورشة عمل: بناء السلام المجتمعي' : 'Workshop: Community Peacebuilding',
      type: lang === 'ar' ? 'حضوري' : 'In-Person',
      icon: Users
    },
    {
      date: lang === 'ar' ? 'مارس 2025' : 'March 2025',
      title: lang === 'ar' ? 'حوار مفتوح: المرأة والإصلاح الدستوري' : 'Open Dialogue: Women and Constitutional Reform',
      type: lang === 'ar' ? 'هجين' : 'Hybrid',
      icon: Globe
    }
  ];

  const memoryPhotos = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      date: lang === 'ar' ? 'مارس 2024' : 'March 2024',
      title: lang === 'ar' ? 'جلسة حول العدالة الانتقالية' : 'Session on Transitional Justice',
      titleAr: 'جلسة حول العدالة الانتقالية',
      description: 'A powerful dialogue session featuring civil society activists, lawyers, and survivors discussing pathways to accountability and reconciliation. Over 50 participants engaged in meaningful conversations about truth, justice, and guarantees of non-recurrence.',
      descriptionAr: 'جلسة حوار قوية ضمت ناشطين من المجتمع المدني ومحامين وناجين لمناقشة مسارات المساءلة والمصالحة. شارك أكثر من 50 مشاركاً في محادثات هادفة حول الحقيقة والعدالة وضمانات عدم التكرار.'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1560523159-4a9692d222ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      date: lang === 'ar' ? 'يناير 2024' : 'January 2024',
      title: lang === 'ar' ? 'ورشة عمل: دور المرأة في باء السلام' : 'Workshop: Women\'s Role in Peacebuilding',
      titleAr: 'ورشة عمل: دور المرأة في بناء السلام',
      description: 'An intensive workshop bringing together women leaders and activists to discuss strategies for inclusive political participation and constitutional reform. The event emphasized the critical role of women in Syria\'s democratic transition.',
      descriptionAr: 'ورشة عمل مكثفة جمعت قائدات وناشطات لمناقشة استراتيجيات المشاركة السياسية الشاملة والإصلاح الدستوري. أكد الحدث على الدور الحاسم للمرأة في الانتقال الديمقراطي في سوريا.'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      date: lang === 'ar' ? 'نوفمبر 2023' : 'November 2023',
      title: lang === 'ar' ? 'لقاء مع خبراء دوليين' : 'Meeting with International Experts',
      titleAr: 'لقاء مع خبراء دوليين',
      description: 'Forum members met with international experts on democratic transitions and human rights to exchange experiences and learn from best practices in post-conflict contexts around the world.',
      descriptionAr: 'التقى أعضاء المنتدى بخبراء دوليين في الانتقالات الديمقراطية وحقوق الإنسان لتبادل الخبرات والتعلم من أفضل الممارسات في سياقات ما بعد النزاع حول العالم.'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      date: lang === 'ar' ? 'سبتمبر 2023' : 'September 2023',
      title: lang === 'ar' ? 'احتفال الذكرى السنوية الأولى' : 'First Anniversary Celebration',
      titleAr: 'احتفال الذكرى السنوية الأولى',
      description: 'The Forum celebrated its first anniversary with a special event honoring Riad Seif\'s legacy and the Damascus Spring. Prominent civil society figures and activists gathered to reflect on achievements and plan future initiatives.',
      descriptionAr: 'احتفل المنتدى بذكراه السنوية الأولى بحدث خاص لتكريم إرث رياض سيف وربيع دمشق. اجتمع شخصيات بارزة من المجتمع المدني والناشطين للتفكير في الإنجازات والتخطيط للمبادرات المستقبلية.'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      date: lang === 'ar' ? 'يوليو 2023' : 'July 2023',
      title: lang === 'ar' ? 'حلقة نقاش: الحكم المحلي والإصلاح' : 'Panel: Local Governance and Reform',
      titleAr: 'حلقة نقاش: الحكم المحلي والإصلاح',
      description: 'A panel discussion exploring models of local governance, decentralization, and civic participation. Experts and community leaders shared insights on building accountable institutions from the ground up.',
      descriptionAr: 'حلقة نقاش استكشفت نماذج الحكم المحلي واللامركزية والمشاركة المدنية. شارك الخبراء وقادة المجتمع رؤاهم حول بناء مؤسسات خاضعة للمساءلة من القاعدة.'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      date: lang === 'ar' ? 'مايو 2023' : 'May 2023',
      title: lang === 'ar' ? 'جلسة الشباب: بناء المستقبل' : 'Youth Session: Building the Future',
      titleAr: 'جلسة الشباب: بناء المستقبل',
      description: 'A special session dedicated to young activists and students, focusing on youth leadership, civic education, and intergenerational dialogue. The event emphasized the vital role of young people in shaping Syria\'s democratic future.',
      descriptionAr: 'جلسة خاصة مخصصة للناشطين الشباب والطلاب، تركز على قيادة الشباب والتربية المدنية والحوار بين الأجيال. أكد الحدث على الدور الحيوي للشباب في تشكيل مستقبل سوريا الديمقراطي.'
    }
  ];

  const archiveItems = [
    {
      id: 1,
      type: lang === 'ar' ? 'مقال' : 'Article',
      title: lang === 'ar' ? 'منتدى رياض سيف: إحياء روح ربيع دمشق' : 'Riad Seif Forum: Reviving the Spirit of Damascus Spring',
      titleAr: 'منتدى رياض سيف: إحياء روح ربيع دمشق',
      source: lang === 'ar' ? 'الشرق الأوسط' : 'Al-Sharq Al-Awsat',
      date: lang === 'ar' ? 'ديسمبر 2024' : 'December 2024',
      excerpt: 'An in-depth analysis of how the Forum for National Dialogue continues the legacy of the Damascus Spring movement and its relevance to contemporary Syrian civil society.',
      excerptAr: 'تحليل متعمق لكيفية استمرار منتدى الحوار الوطني في إرث حركة ربيع دمشق وأهميته للمجتمع المدني السوري المعاصر.'
    },
    {
      id: 2,
      type: lang === 'ar' ? 'بحث' : 'Research',
      title: lang === 'ar' ? 'دور منتديات الحوار في الانتقالات الديمقراطية' : 'The Role of Dialogue Forums in Democratic Transitions',
      titleAr: 'دور منتديات الحوار في الانتقالات الديمقراطية',
      source: lang === 'ar' ? 'مركز دراسات الديمقراطية' : 'Center for Democracy Studies',
      date: lang === 'ar' ? 'أكتوبر 2024' : 'October 2024',
      excerpt: 'Academic research examining the impact of civil dialogue forums on democratic transitions, with case studies including the Riad Seif Forum.',
      excerptAr: 'بحث أكاديمي يدرس تأثير منتديات الحوار المدني على الانتقالات الديمقراطية، مع دراسات حالة تشمل منتدى رياض سيف.'
    },
    {
      id: 3,
      type: lang === 'ar' ? 'كتاب' : 'Book',
      title: lang === 'ar' ? 'أصوات التغيير: المجتمع المدني السوري' : 'Voices of Change: Syrian Civil Society',
      titleAr: 'أصوات التغيير: المجتمع المدني السوري',
      source: lang === 'ar' ? 'دار النشر الأكاديمية' : 'Academic Press',
      date: lang === 'ar' ? 'سبتمبر 2024' : 'September 2024',
      excerpt: 'A comprehensive book featuring chapters on the Forum for National Dialogue and its contributions to civic discourse and democratic reform in Syria.',
      excerptAr: 'كتاب شام يتضمن فصولاً عن منتدى الحوار الوطني ومساهماته في الخطاب المدني والإصلاح الديمقراطي في سوريا.'
    },
    {
      id: 4,
      type: lang === 'ar' ? 'تقرير' : 'Report',
      title: lang === 'ar' ? 'تقييم أنشطة المنتدى 2023-2024' : 'Forum Activities Assessment 2023-2024',
      titleAr: 'تقييم أنشطة المنتدى 2023-2024',
      source: lang === 'ar' ? 'مؤسسة رياض سيف لحقوق الإنسان' : 'Riad Seif Foundation for Human Rights',
      date: lang === 'ar' ? 'يناير 2025' : 'January 2025',
      excerpt: 'Annual report documenting the Forum\'s activities, impact, and key achievements in promoting dialogue and democratic participation.',
      excerptAr: 'تقرير سنوي يوثق أنشطة المنتدى وتأثيره والإنجازات الرئيسية في تعزيز الحوار والمشاركة الديمقراطية.'
    }
  ];

  const managementTeam = [
    {
      id: 1,
      name: 'Dr. Karim Al-Deeb',
      nameAr: 'د. كريم الديب',
      role: 'Forum Coordinator',
      roleAr: 'منسق المنتدى',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      bio: 'Political scientist specializing in democratic transitions and civil society development.',
      bioAr: 'عالم سيا��ي متخصص في الانتقالات الديمقراطية وتنمية المجتمع المدني.',
      detailedBio: 'Dr. Karim Al-Deeb is a political scientist with over 15 years of experience in democratic transitions and civil society development. He holds a PhD in Political Science from the Sorbonne University and has worked extensively with civil society organizations across the Middle East. As Forum Coordinator, he oversees all dialogue sessions, manages partnerships with local and international organizations, and ensures the Forum remains a safe and inclusive space for democratic discourse. His research focuses on transitional justice, civic participation, and the role of civil forums in post-conflict societies.',
      detailedBioAr: 'الدكتور كريم الديب عالم سياسي يتمتع بخبرة تزيد عن 15 عاماً في الانتقالات الديمقراطية وتنمية المجتمع المدني. حاصل على درجة الدكتوراه في العلوم السياسية من جامعة السوربون وعمل بشكل مكثف مع منظمات المجتمع المدني في جميع أنحاء الشرق الأوسط. بصفته منسق المنتدى، يشرف على جميع جلسات الحوار، ويدير الشراكات مع المنظمات المحلية والدولية، ويضمن بقاء المنتدى مساحة آمنة وشاملة للخطاب الديمقراطي. يركز بحثه على العدالة الانتقالية والمشاركة المدنية ودور المنتديات المدنية في مجتمعات ما بعد النزاع.'
    },
    {
      id: 2,
      name: 'Layla Kassem',
      nameAr: 'ليلى قاسم',
      role: 'Communications Director',
      roleAr: 'مديرة الاتصالات',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      bio: 'Media specialist and advocate for freedom of expression and civic engagement.',
      bioAr: 'أخصائية إعلام ومدافعة عن حرية التعبير والمشاركة المدنية.',
      detailedBio: 'Layla Kassem is an experienced media specialist and communications strategist with a background in journalism and public relations. She has worked with numerous Syrian civil society organizations, helping them amplify their voices and reach wider audiences. As Communications Director, Layla manages the Forum\'s media presence, coordinates outreach efforts, and ensures transparent communication with participants and the public. She is passionate about freedom of expression, digital rights, and the power of storytelling in democratic movements.',
      detailedBioAr: 'ليلى قاسم أخصائية علام ذات خبرة واستراتيجية اتصالات بخلفية في الصحافة والعلاقات العامة. عملت مع العديد من منظمات المجتمع المدني السوري، مساعدتها على تضخيم أصواتها والوصول إلى جماهير أوسع. بصفتها مديرة الاتصالات، تدير ليلى الحضور الإعلامي للمنتدى، وتنسق جهود التوعية، وتضمن التواصل الشفاف مع المشاركين والجمهور. إنها شغوفة بحرية التعبير والحقوق الرقمية وقوة سرد القصص في الحركات الديمقراطية.'
    },
    {
      id: 3,
      name: 'Omar Haddad',
      nameAr: 'عمر حداد',
      role: 'Events Manager',
      roleAr: 'مدير الفعاليات',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      bio: 'Event planner with expertise in facilitating large-scale public dialogues and workshops.',
      bioAr: 'مخطط فعاليات ذو خبرة في تسهيل الحوارات العامة وورش العمل واسعة النطاق.',
      detailedBio: 'Omar Haddad brings extensive experience in event management and facilitation to the Forum. With a background in conflict resolution and community organizing, he ensures that every dialogue session is well-organized, accessible, and productive. Omar coordinates logistics, manages venues, and works closely with facilitators to create engaging and meaningful experiences for participants. He is committed to making the Forum a welcoming space where diverse voices can come together for constructive dialogue.',
      detailedBioAr: 'يجلب عمر حداد خبرة واسعة في إدارة الفعاليات والتيسير إلى المنتدى. بخلفية في حل النزاعات وتنظيم المجتمع، يضمن أن كل جلسة حوار منظمة جيداً ومتاحة ومنتجة. ينسق عمر اللوجستيات، ويدير الأماكن، ويعمل عن كثب مع الميسرين لخلق تجارب جذابة وذات مغزى للمشاركين. إنه ملتزم بجعل المنتدى مساحة ترحيبية حيث يمكن للأصوات المتنوعة أن تجتمع لحوار بناء.'
    }
  ];
  
  return (
    <div className="bg-white">
       {/* Header */}
       <div className="relative bg-[#1c3944] text-white py-20 lg:py-32 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-20"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          >
               <img src="https://images.unsplash.com/photo-1733688767526-df72724ff24b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" className="w-full h-full object-cover" alt="" />
          </motion.div>

          {/* Animated Circles */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border-2 border-[#f7c20e] opacity-20"
              style={{
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                left: `${30 + i * 5}%`,
                top: `${20 + i * 3}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.2,
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
               {t.nav.forum}
             </motion.span>
             <motion.h1
               className={`text-4xl lg:text-5xl ${t.serif} mb-6`}
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
             >
               {t.nav.forum}
             </motion.h1>
             <motion.p
               className="text-xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed"
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
             >
                 {t.forum.history.text}
             </motion.p>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
           
           {/* Tab Navigation */}
           <motion.div
             className="flex flex-wrap justify-center gap-3 mb-16"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5 }}
           >
             {[
               { label: lang === 'ar' ? 'التاريخ' : 'History', icon: Calendar },
               { label: lang === 'ar' ? 'الجلسات' : 'Sessions', icon: MessageSquare },
               { label: lang === 'ar' ? 'الفعاليات' : 'Events', icon: Users },
               { label: lang === 'ar' ? 'الذاكرة' : 'Memory', icon: Camera },
               { label: lang === 'ar' ? 'الأرشيف' : 'Archive', icon: FileText },
               { label: lang === 'ar' ? 'الادارة' : 'Management', icon: UserCheck }
             ].map((tab, idx) => (
               <motion.button
                 key={idx}
                 className={`px-5 py-3 rounded-lg font-semibold transition-all ${
                   activeTab === idx
                     ? 'bg-[#1c3944] text-white shadow-lg'
                     : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                 }`}
                 onClick={() => setActiveTab(idx)}
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
               >
                 <div className="flex items-center gap-2">
                   <tab.icon size={18} />
                   <span className="text-sm md:text-base">{tab.label}</span>
                 </div>
               </motion.button>
             ))}
           </motion.div>

           {/* Content Based on Active Tab */}
           <motion.div
             key={activeTab}
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -20 }}
             transition={{ duration: 0.3 }}
           >
             {activeTab === 0 && (
               <div className="mb-20 grid md:grid-cols-2 gap-12 items-center">
                   <motion.div
                     initial={{ opacity: 0, x: -30 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.2 }}
                   >
                       <h2 className={`text-3xl text-[#1c3944] mb-6 ${t.serif}`}>{t.forum.history.title}</h2>
                       <div className="prose prose-lg text-slate-600">
                           <p>{t.forum.history.text}</p>
                       </div>
                   </motion.div>
                   <motion.div
                     className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 border-l-4 border-[#f7c20e] italic text-slate-700 text-lg rounded-xl shadow-lg"
                     initial={{ opacity: 0, x: 30 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.3 }}
                     whileHover={{ scale: 1.02 }}
                   >
                       "{lang === 'ar' 
                         ? 'لطالما كان منتدى الحوار الوطني رمزاً للتوق الديمقراطي في سوريا. اليوم، نعيد إحياءه.' 
                         : 'The Forum for National Dialogue has long been a symbol of democratic aspiration in Syria. Today, we revive it.'}"
                   </motion.div>
               </div>
             )}

             {activeTab === 1 && (
               <div>
                   <h3 className={`text-2xl text-[#1c3944] mb-6 ${t.serif}`}>{t.forum.activities.title}</h3>
                   <p className="text-slate-600 text-lg leading-relaxed mb-6">
                       {t.forum.activities.text}
                   </p>
                   <div className="grid md:grid-cols-3 gap-6">
                       {[1, 2, 3].map((i) => (
                           <motion.div
                             key={i}
                             className="p-6 bg-slate-50 rounded-xl border-2 border-slate-200 hover:border-[#f7c20e] transition-all"
                             initial={{ opacity: 0, y: 30 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ delay: i * 0.1 }}
                             whileHover={{ y: -5, scale: 1.02 }}
                           >
                               <MessageSquare className="text-[#2c1d5f] mb-4" size={32} />
                               <h4 className={`text-lg ${t.serif} font-bold text-[#1c3944] mb-2`}>
                                 {lang === 'ar' ? `نشاط ${i}` : `Activity ${i}`}
                               </h4>
                               <p className="text-slate-700">
                                   {lang === 'ar' ? 'جلسة حوار شهرية حول موضوعات الانتقال' : 'Monthly dialogue session on transition themes'}
                               </p>
                           </motion.div>
                       ))}
                   </div>
               </div>
             )}

             {activeTab === 2 && (
               <div className="grid md:grid-cols-2 gap-12">
                   <div>
                     <h3 className={`text-2xl text-[#1c3944] mb-6 ${t.serif}`}>{t.forum.events.title}</h3>
                     <p className="text-slate-600 mb-8 font-light">
                         {t.forum.events.text}
                     </p>

                     {/* Event List */}
                     <div className="space-y-4">
                       {upcomingEvents.map((event, idx) => (
                         <motion.div
                           key={idx}
                           className="bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-[#f7c20e] transition-all cursor-pointer"
                           initial={{ opacity: 0, x: -30 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: idx * 0.1 }}
                           whileHover={{ x: 5, scale: 1.02 }}
                         >
                           <div className="flex items-start gap-4">
                             <motion.div
                               className="w-12 h-12 rounded-full bg-[#f7c20e] bg-opacity-20 flex items-center justify-center shrink-0"
                               whileHover={{ rotate: 360 }}
                               transition={{ duration: 0.6 }}
                             >
                               <event.icon className="text-[#1c3944]" size={24} />
                             </motion.div>
                             <div className="flex-1">
                               <div className="text-[#f7c20e] text-sm font-bold uppercase mb-1">
                                 {event.date}
                               </div>
                               <div className="font-bold text-lg mb-2 text-[#1c3944]">
                                 {event.title}
                               </div>
                               <div className="text-sm text-slate-500">
                                 {event.type}
                               </div>
                             </div>
                           </div>
                         </motion.div>
                       ))}
                     </div>
                   </div>

                   {/* CTA Card */}
                   <motion.div
                     className="bg-gradient-to-br from-[#2c1d5f] to-[#1c3944] text-white p-10 rounded-2xl relative overflow-hidden"
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: 0.4 }}
                   >
                     <motion.div
                       className="absolute top-0 right-0 w-64 h-64 bg-[#f7c20e] opacity-10 rounded-full blur-3xl"
                       animate={{
                         scale: [1, 1.2, 1],
                         opacity: [0.1, 0.2, 0.1],
                       }}
                       transition={{ duration: 4, repeat: Infinity }}
                     />

                     <div className="relative z-10">
                       <h3 className={`text-3xl mb-6 ${t.serif} flex items-center gap-3`}>
                           <Calendar className="text-[#f7c20e]" /> {t.forum.events.title}
                       </h3>
                       <p className="text-slate-300 mb-8 font-light text-lg leading-relaxed">
                           {lang === 'ar'
                             ? 'كن جزءاً من الحوار. شارك في فعالياتنا القادمة وساهم في بناء مستقبل سوريا.'
                             : 'Be part of the dialogue. Join our upcoming events and contribute to building Syria\'s future.'}
                       </p>

                       <Link href="/contact">
                           <motion.span
                             className="block w-full text-center bg-[#f7c20e] text-[#1c3944] py-4 font-bold mt-6 transition-colors cursor-pointer rounded-xl"
                             whileHover={{ backgroundColor: '#ffffff', scale: 1.05 }}
                             whileTap={{ scale: 0.95 }}
                           >
                               {lang === 'ar' ? 'تواصل معنا للحضور' : 'Contact Us to Attend'}
                           </motion.span>
                       </Link>
                     </div>
                   </motion.div>
               </div>
             )}

             {activeTab === 3 && (
                <div>
                    <div className="text-center mb-12">
                      <h3 className={`text-3xl text-[#1c3944] mb-4 ${t.serif}`}>{t.forum.memory.title}</h3>
                      <p className="text-slate-600 max-w-2xl mx-auto font-light">
                          {t.forum.memory.text}
                      </p>
                    </div>

                    {/* Photo Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {memoryPhotos.map((photo, idx) => (
                        <motion.div
                          key={photo.id}
                          className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer bg-slate-100"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ y: -8, scale: 1.02 }}
                          onClick={() => setSelectedPhoto(photo)}
                        >
                          {/* Photo */}
                          <div className="relative h-64 overflow-hidden">
                            <motion.img
                              src={photo.image}
                              alt={lang === 'ar' ? photo.titleAr : photo.title}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                            
                            {/* Golden Accent Bar */}
                            <motion.div
                              className="absolute bottom-0 left-0 right-0 h-1 bg-[#f7c20e]"
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: idx * 0.1 }}
                            />
                          </div>

                          {/* Info Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <div className="text-[#f7c20e] text-xs font-bold uppercase mb-1 flex items-center gap-2">
                              <Camera size={14} />
                              {photo.date}
                            </div>
                            <h4 className="font-bold text-base mb-1 line-clamp-2">
                              {lang === 'ar' ? photo.titleAr : photo.title}
                            </h4>
                            <p className="text-xs text-slate-300 line-clamp-2">
                              {lang === 'ar' ? photo.descriptionAr : photo.description}
                            </p>
                          </div>

                          {/* Hover Icon */}
                          <motion.div
                            className="absolute top-4 right-4 w-10 h-10 bg-[#f7c20e] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.4 }}
                          >
                            <Camera className="text-[#1c3944]" size={20} />
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                </div>
              )}

             {activeTab === 4 && (
               <div className="grid md:grid-cols-2 gap-12">
                   <div>
                     <h3 className={`text-2xl text-[#1c3944] mb-6 ${t.serif}`}>{t.forum.archive.title}</h3>
                     <p className="text-slate-600 mb-8 font-light">
                         {t.forum.archive.text}
                     </p>

                     {/* Archive Items */}
                     <div className="space-y-4">
                       {archiveItems.map((item, idx) => (
                         <motion.div
                           key={idx}
                           className="bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-[#f7c20e] transition-all cursor-pointer"
                           initial={{ opacity: 0, x: -30 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: idx * 0.1 }}
                           whileHover={{ x: 5, scale: 1.02 }}
                         >
                           <div className="flex items-start gap-4">
                             <motion.div
                               className="w-12 h-12 rounded-full bg-[#f7c20e] bg-opacity-20 flex items-center justify-center shrink-0"
                               whileHover={{ rotate: 360 }}
                               transition={{ duration: 0.6 }}
                             >
                               <FileText className="text-[#1c3944]" size={24} />
                             </motion.div>
                             <div className="flex-1">
                               <div className="text-[#f7c20e] text-sm font-bold uppercase mb-1">
                                 {item.date}
                               </div>
                               <div className="font-bold text-lg mb-2 text-[#1c3944]">
                                 {item.title}
                               </div>
                               <div className="text-sm text-slate-500">
                                 {item.description}
                               </div>
                             </div>
                           </div>
                         </motion.div>
                       ))}
                     </div>
                   </div>

                   {/* CTA Card */}
                   <motion.div
                     className="bg-gradient-to-br from-[#2c1d5f] to-[#1c3944] text-white p-10 rounded-2xl relative overflow-hidden"
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: 0.4 }}
                   >
                     <motion.div
                       className="absolute top-0 right-0 w-64 h-64 bg-[#f7c20e] opacity-10 rounded-full blur-3xl"
                       animate={{
                         scale: [1, 1.2, 1],
                         opacity: [0.1, 0.2, 0.1],
                       }}
                       transition={{ duration: 4, repeat: Infinity }}
                     />

                     <div className="relative z-10">
                       <h3 className={`text-3xl mb-6 ${t.serif} flex items-center gap-3`}>
                           <FileText className="text-[#f7c20e]" /> {t.forum.archive.title}
                       </h3>
                       <p className="text-slate-300 mb-8 font-light text-lg leading-relaxed">
                           {lang === 'ar'
                             ? 'اكتشف أرشيفنا. قم بتحميل المقالات والبحوث والكتب والتقارير ذات الصلة بمنتدى الحوار الوطني.'
                             : 'Discover our archive. Download articles, research, books, and reports related to the Forum for National Dialogue.'}
                       </p>

                       <Link href="/contact">
                           <motion.span
                             className="block w-full text-center bg-[#f7c20e] text-[#1c3944] py-4 font-bold mt-6 transition-colors cursor-pointer rounded-xl"
                             whileHover={{ backgroundColor: '#ffffff', scale: 1.05 }}
                             whileTap={{ scale: 0.95 }}
                           >
                               {lang === 'ar' ? 'تواصل معنا للحصول على الملفات' : 'Contact Us to Get Files'}
                           </motion.span>
                       </Link>
                     </div>
                   </motion.div>
               </div>
             )}

             {activeTab === 5 && (
               <div>
                   <div className="text-center mb-12">
                     <h3 className={`text-3xl text-[#1c3944] mb-4 ${t.serif}`}>{t.forum.management.title}</h3>
                     <p className="text-slate-600 max-w-2xl mx-auto font-light">
                         {t.forum.management.text}
                     </p>
                   </div>

                   {/* Management Team Cards Grid */}
                   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {managementTeam.map((member, idx) => (
                       <motion.div
                         key={member.id}
                         initial={{ opacity: 0, y: 40 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.6, delay: idx * 0.1 }}
                         whileHover={{ y: -8, scale: 1.02 }}
                         onClick={() => setSelectedMember(member)}
                         className="bg-white border border-slate-200 hover:border-[#f7c20e] hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
                       >
                         <div className="relative overflow-hidden h-64">
                           <motion.img
                             src={member.image}
                             alt={lang === 'ar' ? member.nameAr : member.name}
                             className="w-full h-full object-cover"
                             whileHover={{ scale: 1.1 }}
                             transition={{ duration: 0.6 }}
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                         </div>
                         <div className="p-6">
                           <h3 className={`text-xl ${t.serif} font-bold text-[#1c3944] mb-2`}>
                             {lang === 'ar' ? member.nameAr : member.name}
                           </h3>
                           <p className="text-[#f7c20e] font-medium mb-3">
                             {lang === 'ar' ? member.roleAr : member.role}
                           </p>
                           <p className="text-slate-600 text-sm line-clamp-3">
                             {lang === 'ar' ? member.bioAr : member.bio}
                           </p>
                           <motion.div
                             className={`mt-4 text-[#1c3944] font-semibold text-sm flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
                             whileHover={{ x: isRTL ? -5 : 5 }}
                           >
                             <span>{lang === 'ar' ? 'اقرأ المزيد' : 'Read More'}</span>
                             <span className="text-[#f7c20e]">→</span>
                           </motion.div>
                         </div>
                       </motion.div>
                     ))}
                   </div>
               </div>
             )}
           </motion.div>
       </div>

       {/* Photo Detail Modal */}
       <AnimatePresence>
         {selectedPhoto && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
             onClick={() => setSelectedPhoto(null)}
           >
             <motion.div
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
               className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto relative rounded-2xl"
               onClick={(e) => e.stopPropagation()}
             >
               {/* Close Button */}
               <button
                 onClick={() => setSelectedPhoto(null)}
                 className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
               >
                 <X className="text-[#1c3944]" size={20} />
               </button>

               {/* Photo Image */}
               <div className="relative h-96 overflow-hidden rounded-t-2xl">
                 <img
                   src={selectedPhoto.image}
                   alt={lang === 'ar' ? selectedPhoto.titleAr : selectedPhoto.title}
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                 <div className={`absolute bottom-8 ${isRTL ? 'right-8' : 'left-8'} text-white`}>
                   <div className="flex items-center gap-2 text-[#f7c20e] text-sm font-bold uppercase mb-2">
                     <Camera size={16} />
                     {selectedPhoto.date}
                   </div>
                   <h2 className={`text-3xl ${t.serif} font-bold`}>
                     {lang === 'ar' ? selectedPhoto.titleAr : selectedPhoto.title}
                   </h2>
                 </div>
               </div>

               {/* Photo Details */}
               <div className="p-8">
                 <p className="text-slate-700 text-lg leading-relaxed">
                   {lang === 'ar' ? selectedPhoto.descriptionAr : selectedPhoto.description}
                 </p>
               </div>
             </motion.div>
           </motion.div>
         )}
       </AnimatePresence>

       {/* Management Member Detail Modal */}
       <AnimatePresence>
         {selectedMember && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
             onClick={() => setSelectedMember(null)}
           >
             <motion.div
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
               className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto relative rounded-2xl"
               onClick={(e) => e.stopPropagation()}
             >
               {/* Close Button */}
               <button
                 onClick={() => setSelectedMember(null)}
                 className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
               >
                 <X className="text-[#1c3944]" size={20} />
               </button>

               {/* Member Image */}
               <div className="relative h-80 overflow-hidden rounded-t-2xl">
                 <img
                   src={selectedMember.image}
                   alt={lang === 'ar' ? selectedMember.nameAr : selectedMember.name}
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                 <div className={`absolute bottom-8 ${isRTL ? 'right-8' : 'left-8'} text-white`}>
                   <h2 className={`text-3xl ${t.serif} font-bold mb-2`}>
                     {lang === 'ar' ? selectedMember.nameAr : selectedMember.name}
                   </h2>
                   <p className="text-[#f7c20e] text-lg font-medium">
                     {lang === 'ar' ? selectedMember.roleAr : selectedMember.role}
                   </p>
                 </div>
               </div>

               {/* Member Details */}
               <div className="p-8">
                 <p className="text-slate-700 text-lg leading-relaxed">
                   {lang === 'ar' ? selectedMember.detailedBioAr : selectedMember.detailedBio}
                 </p>
               </div>
             </motion.div>
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
}