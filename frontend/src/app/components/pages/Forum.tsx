import { Calendar, MessageSquare, Users, Video, Globe, Camera, FileText, UserCheck, X } from 'lucide-react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useMemo } from 'react';
import {
  fetchMemoryPhotos,
  fetchArchiveItems,
  fetchForumEvents,
  type MemoryPhoto,
  type ArchiveItem,
  type ForumEvent,
} from '../../utils/api';

export default function Forum({ lang, content }) {
  const t = content[lang];
  const isRTL = lang === 'ar';
  const [activeTab, setActiveTab] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [eventFilter, setEventFilter] = useState('all');
  const [apiMemory, setApiMemory] = useState<MemoryPhoto[]>([]);
  const [apiArchive, setApiArchive] = useState<ArchiveItem[]>([]);
  const [apiEvents, setApiEvents] = useState<ForumEvent[]>([]);

  useEffect(() => {
    fetchMemoryPhotos()
      .then((items) => setApiMemory(items ?? []))
      .catch(() => setApiMemory([]));
    fetchArchiveItems()
      .then((items) => setApiArchive(items ?? []))
      .catch(() => setApiArchive([]));
    fetchForumEvents()
      .then((items) => setApiEvents(items ?? []))
      .catch(() => setApiEvents([]));
  }, []);

  const formatDate = (value?: string | null) => {
    if (!value) return '';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    return parsed.toLocaleDateString(lang === 'ar' ? 'ar' : 'en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  const resolveEventType = (event: ForumEvent) => {
    const raw = `${event.event_type ?? ''}`.toLowerCase();
    if (event.is_online || raw.includes('online')) {
      return { key: 'online', label: lang === 'ar' ? 'عبر الإنترنت' : 'Online', icon: Video };
    }
    if (raw.includes('hybrid')) {
      return { key: 'hybrid', label: lang === 'ar' ? 'هجيني' : 'Hybrid', icon: Globe };
    }
    if (raw.includes('person') || raw.includes('in-person') || raw.includes('in person')) {
      return { key: 'in_person', label: lang === 'ar' ? 'حضوري' : 'In-Person', icon: Users };
    }
    return { key: raw || 'event', label: lang === 'ar' ? 'فعالية' : 'Event', icon: Users };
  };

  const upcomingEvents = apiEvents.map((event) => {
    const type = resolveEventType(event);
    return {
      key: type.key,
      date: formatDate(event.date),
      title: lang === 'ar' ? event.title_ar : event.title_en,
      type: type.label,
      icon: type.icon,
    };
  });

  const eventFilterOptions = useMemo(() => {
    const keys = Array.from(new Set(upcomingEvents.map((event) => event.key)));
    return ['all', ...keys];
  }, [upcomingEvents]);

  const filteredEvents = eventFilter === 'all'
    ? upcomingEvents
    : upcomingEvents.filter((event) => event.key === eventFilter);

  const memoryPhotos = apiMemory.map((photo) => ({
    id: photo.id,
    image: photo.image_url,
    date: photo.date,
    title: photo.title_en,
    titleAr: photo.title_ar,
    description: photo.description_en,
    descriptionAr: photo.description_ar,
  }));

  const archiveItems = apiArchive.map((item) => ({
    id: item.id,
    title: lang === 'ar' ? item.title_ar : item.title_en,
    titleAr: item.title_ar,
    description: lang === 'ar' ? item.description_ar : item.description_en,
    descriptionAr: item.description_ar,
    date: item.date,
    link: item.external_link,
  }));

  const managementTeam =
    Array.isArray(t.forum?.managementTeam) && t.forum.managementTeam.length > 0
      ? t.forum.managementTeam
      : [];

  const getMemberValue = (member: any, key: string) => {
    const arKey = `${key}Ar`;
    const enKey = `${key}En`;
    if (lang === 'ar') {
      return member?.[arKey] ?? member?.[key] ?? member?.[enKey];
    }
    return member?.[key] ?? member?.[enKey] ?? member?.[arKey];
  };
  
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
               {t.forum?.title ?? t.nav.forum}
             </motion.span>
             <motion.h1
               className={`text-4xl lg:text-5xl ${t.serif} mb-6`}
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
             >
               {t.forum?.title ?? t.nav.forum}
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
               { label: lang === 'ar' ? 'الإدارة' : 'Management', icon: UserCheck }
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
                         ? 'لطالما كان منتدى الحوار الوطني رمزاً للتطلع الديمقراطي في سوريا. واليوم نعيد إحياءه.' 
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

                     <div className="flex flex-wrap gap-2 mb-6">
                       {eventFilterOptions.map((key) => {
                         const sample = upcomingEvents.find((event) => event.key === key);
                         const label = key === 'all' ? (lang === 'ar' ? 'الكل' : 'All') : sample?.type ?? key;
                         const active = eventFilter === key;
                         return (
                           <button
                             key={key}
                             type="button"
                             className={`rounded-full px-4 py-2 text-sm border transition-colors ${
                               active
                                 ? 'bg-[#1c3944] text-white border-[#1c3944]'
                                 : 'bg-white text-slate-700 border-slate-300 hover:border-[#f7c20e]'
                             }`}
                             onClick={() => setEventFilter(key)}
                           >
                             {label}
                           </button>
                         );
                       })}
                     </div>

                     {/* Event List */}
                     <div className="space-y-4">
                       {filteredEvents.map((event, idx) => (
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
                       {filteredEvents.length === 0 && (
                         <div className="text-slate-500 text-sm">
                           {lang === 'ar' ? 'لا توجد فعاليات حالياً.' : 'No events available yet.'}
                         </div>
                       )}
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
                      {memoryPhotos.length === 0 && (
                        <div className="col-span-full text-center text-slate-500 py-10">
                          {lang === 'ar' ? 'لا توجد صور في الذاكرة حالياً.' : 'No memory photos available yet.'}
                        </div>
                      )}
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
                       {archiveItems.length === 0 && (
                         <div className="text-slate-500 text-sm">
                           {lang === 'ar' ? 'لا توجد عناصر في الأرشيف حالياً.' : 'No archive items available yet.'}
                         </div>
                       )}
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
                             ? 'اكتشف أرشيفنا. حمّل المقالات والأبحاث والكتب والتقارير ذات الصلة بمنتدى الحوار الوطني.'
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
                             alt={getMemberValue(member, 'name')}
                             className="w-full h-full object-cover"
                             whileHover={{ scale: 1.1 }}
                             transition={{ duration: 0.6 }}
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                         </div>
                         <div className="p-6">
                           <h3 className={`text-xl ${t.serif} font-bold text-[#1c3944] mb-2`}>
                             {getMemberValue(member, 'name')}
                           </h3>
                           <p className="text-[#f7c20e] font-medium mb-3">
                             {getMemberValue(member, 'role')}
                           </p>
                           <p className="text-slate-600 text-sm line-clamp-3">
                             {getMemberValue(member, 'bio')}
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
                     {managementTeam.length === 0 && (
                       <div className="col-span-full text-center text-slate-500 py-10">
                         {lang === 'ar' ? 'لا توجد بيانات لإدارة المنتدى حالياً.' : 'No management team data available yet.'}
                       </div>
                     )}
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
               <div className="relative h-96 overflow-hidden rounded-t-2xl bg-slate-900 flex items-center justify-center">
                 <img
                   src={selectedPhoto.image}
                   alt={lang === 'ar' ? selectedPhoto.titleAr : selectedPhoto.title}
                   className="w-full h-full object-contain"
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
               <div className="relative h-80 overflow-hidden rounded-t-2xl bg-slate-900 flex items-center justify-center">
                 <img
                   src={selectedMember.image}
                   alt={getMemberValue(selectedMember, 'name')}
                   className="w-full h-full object-contain"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                 <div className={`absolute bottom-8 ${isRTL ? 'right-8' : 'left-8'} text-white`}>
                   <h2 className={`text-3xl ${t.serif} font-bold mb-2`}>
                     {getMemberValue(selectedMember, 'name')}
                   </h2>
                   <p className="text-[#f7c20e] text-lg font-medium">
                     {getMemberValue(selectedMember, 'role')}
                   </p>
                 </div>
               </div>

               {/* Member Details */}
               <div className="p-8">
                 <p className="text-slate-700 text-lg leading-relaxed">
                   {getMemberValue(selectedMember, 'detailedBio')}
                 </p>
               </div>
             </motion.div>
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
}






