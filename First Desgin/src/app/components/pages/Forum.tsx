import { Calendar, MessageSquare, Users, Video, Globe } from 'lucide-react';
import { Link } from 'wouter';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function Forum({ lang, content }) {
  const t = content[lang];
  const isRTL = lang === 'ar';
  const [activeTab, setActiveTab] = useState(0);

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
             className="flex justify-center gap-4 mb-16"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5 }}
           >
             {[
               { label: lang === 'ar' ? 'التاريخ' : 'History', icon: Calendar },
               { label: lang === 'ar' ? 'الأنشطة' : 'Activities', icon: MessageSquare },
               { label: lang === 'ar' ? 'الفعاليات' : 'Events', icon: Users }
             ].map((tab, idx) => (
               <motion.button
                 key={idx}
                 className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                   activeTab === idx
                     ? 'bg-[#1c3944] text-white'
                     : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                 }`}
                 onClick={() => setActiveTab(idx)}
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
               >
                 <div className="flex items-center gap-2">
                   <tab.icon size={18} />
                   {tab.label}
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
           </motion.div>
       </div>
    </div>
  );
}
