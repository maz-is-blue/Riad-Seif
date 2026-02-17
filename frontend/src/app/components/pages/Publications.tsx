import { ChevronRight, ChevronLeft, ArrowRight, ArrowLeft, FileText, Download, Eye, Filter } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function Publications({ lang, content }) {
  const t = content[lang];
  const isRTL = lang === 'ar';
  const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const [filter, setFilter] = useState('all');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const categories = ['all', 'Report', 'Policy Brief', 'Manual', 'Archive'];
  const categoryLabels = {
    'all': lang === 'ar' ? 'الكل' : 'All',
    'Report': lang === 'ar' ? 'تقرير' : 'Report',
    'Policy Brief': lang === 'ar' ? 'ورقة سياسات' : 'Policy Brief',
    'Manual': lang === 'ar' ? 'دليل' : 'Manual',
    'Archive': lang === 'ar' ? 'أرشيف' : 'Archive'
  };

  // Filter publications based on selected category
  const filteredPublications = filter === 'all' 
    ? t.publications.items 
    : t.publications.items.filter(item => item.type === filter || item.cat === filter);

  return (
    <section className="py-24 bg-gradient-to-b from-[#1c3944] via-[#254b59] to-[#1c3944] text-white min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#f7c20e] rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/10 pb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FileText className="text-[#f7c20e]" size={32} />
              <h2 className={`text-4xl ${t.serif}`}>{t.nav.publications}</h2>
            </motion.div>
            <motion.p
              className="text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {t.publications.latest.subtitle}
            </motion.p>
          </div>
          
          <motion.div
            className="hidden md:flex items-center text-[#f7c20e] hover:text-white transition-colors text-sm uppercase tracking-widest font-bold cursor-pointer mt-4 md:mt-0"
            whileHover={{ x: 5 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {t.publications.latest.viewAll} <ChevronIcon className="mx-1" size={16} />
          </motion.div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex flex-wrap gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Filter className="text-[#f7c20e]" size={20} />
          {categories.map((cat) => (
            <motion.button
              key={cat}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === cat
                  ? 'bg-[#f7c20e] text-[#1c3944]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {categoryLabels[cat]}
            </motion.button>
          ))}
        </motion.div>

        {/* Publications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPublications.map((item, i) => (
            <motion.div
              key={i}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <motion.div
                className="bg-[#254b59] p-8 border-t-4 border-[#f7c20e] hover:bg-[#2c5a6b] transition-all cursor-pointer h-full rounded-lg overflow-hidden relative"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#f7c20e]/20 to-transparent opacity-0"
                  animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <motion.span
                        className="text-xs uppercase tracking-wider text-[#f7c20e] font-bold block mb-2"
                        animate={{ x: hoveredIndex === i ? 5 : 0 }}
                      >
                        {item.cat}
                      </motion.span>
                      <span className="text-xs text-slate-300">{item.date}</span>
                    </div>
                    
                    {/* Action Icons */}
                    <motion.div
                      className="flex gap-2"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: hoveredIndex === i ? 1 : 0, x: hoveredIndex === i ? 0 : 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.button
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#f7c20e] flex items-center justify-center transition-colors"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Eye size={16} />
                      </motion.button>
                      <motion.button
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#f7c20e] flex items-center justify-center transition-colors"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Download size={16} />
                      </motion.button>
                    </motion.div>
                  </div>

                  <h3 className={`text-xl ${t.serif} mb-3 leading-snug group-hover:text-[#f7c20e] transition-colors`}>
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-sm mb-6 line-clamp-3">{item.desc}</p>
                  
                  <motion.div
                    className="flex items-center gap-2 text-sm font-bold text-[#f7c20e]"
                    animate={{ x: hoveredIndex === i ? 5 : 0 }}
                  >
                    {t.publications.latest.readMore} <ArrowIcon size={14} />
                  </motion.div>
                </div>

                {/* Corner Decoration */}
                <motion.div
                  className="absolute bottom-0 right-0 w-24 h-24 bg-[#f7c20e] opacity-5 rounded-tl-full"
                  animate={{
                    scale: hoveredIndex === i ? 1.5 : 1,
                    opacity: hoveredIndex === i ? 0.1 : 0.05,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}

          {/* Archive Card */}
          <motion.div
            className="group relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            onHoverStart={() => setHoveredIndex(999)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <motion.div
              className="bg-[#254b59] p-8 border-t-4 hover:bg-[#2c5a6b] transition-all cursor-pointer opacity-75 hover:opacity-100 h-full rounded-lg"
              style={{ borderTopColor: '#475569' }}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
               <div className="flex justify-between items-center mb-4 text-xs uppercase tracking-wider text-slate-300">
                  <span className="text-slate-400 font-bold">{lang === 'ar' ? 'أرشيف' : 'Archive'}</span>
                  <span>2023</span>
               </div>
               <h3 className={`text-xl ${t.serif} mb-3 leading-snug group-hover:text-[#f7c20e] transition-colors`}>
                 {lang === 'ar' ? 'تقرير حقوق الإنسان السنوي 2023' : 'Annual Human Rights Report 2023'}
               </h3>
               <p className="text-slate-300 text-sm mb-6 line-clamp-3">
                 {lang === 'ar' ? 'تحميل التقرير الكامل بصيغة PDF' : 'Download full report in PDF format.'}
               </p>
               <motion.div
                 className="flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-[#f7c20e]"
                 animate={{ x: hoveredIndex === 999 ? 5 : 0 }}
               >
                  {t.publications.latest.readMore} <ArrowIcon size={14} />
               </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Load More Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <motion.button
            className="px-8 py-4 bg-white/10 hover:bg-[#f7c20e] text-white hover:text-[#1c3944] border-2 border-white/20 hover:border-[#f7c20e] rounded-lg font-bold transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {lang === 'ar' ? 'تحميل المزيد' : 'Load More'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}