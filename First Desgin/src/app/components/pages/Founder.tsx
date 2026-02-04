import { motion } from 'motion/react';
import { Calendar, Award, Users, Heart } from 'lucide-react';

export default function Founder({ lang, content }) {
  const t = content[lang];
  const isRTL = lang === 'ar';

  const timelineIcons = [Calendar, Award, Users, Heart, Award];
  
  return (
    <div className="bg-white">
      {/* Header */}
      <motion.div
        className="bg-[#1c3944] py-16 lg:py-24 text-center text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
         {/* Animated Background Pattern */}
         <div className="absolute inset-0 opacity-10">
           {[...Array(20)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute w-2 h-2 bg-[#f7c20e] rounded-full"
               style={{
                 left: `${Math.random() * 100}%`,
                 top: `${Math.random() * 100}%`,
               }}
               animate={{
                 scale: [1, 1.5, 1],
                 opacity: [0.3, 0.6, 0.3],
               }}
               transition={{
                 duration: 2 + Math.random() * 2,
                 repeat: Infinity,
                 delay: Math.random() * 2,
               }}
             />
           ))}
         </div>

         <div className="max-w-4xl mx-auto px-6 relative z-10">
            <motion.span
              className="text-[#f7c20e] font-bold uppercase tracking-widest text-sm mb-4 block"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {t.nav.founder}
            </motion.span>
            <motion.h1
              className={`text-4xl lg:text-5xl ${t.serif} mb-8`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {t.founder.title}
            </motion.h1>
         </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
         {/* Introduction / Bio */}
         <motion.div
           className="prose prose-lg prose-slate mx-auto text-justify mb-20"
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4 }}
         >
            <motion.div
              className={`float-end ms-8 mb-6 w-64 bg-slate-100 p-2 border border-slate-200 ${isRTL ? '-rotate-1' : 'rotate-1'} shadow-lg relative z-10`}
              whileHover={{ rotate: 0, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-slate-200 to-slate-300 relative overflow-hidden">
                  {/* Placeholder for Riad Seif Portrait */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Portrait
                  </motion.div>
              </div>
              <div className="text-center text-xs text-slate-500 mt-2 italic">
                {isRTL ? 'رياض سيف' : 'Riad Seif'}
              </div>
            </motion.div>
            
            <motion.p
              className="lead text-xl font-light text-[#1c3944] mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
                {t.home.founderSection.text}
            </motion.p>
         </motion.div>

         {/* Animated Timeline */}
         <div className="relative">
           {/* Vertical Line */}
           <motion.div
             className="absolute left-8 top-0 w-1 bg-gradient-to-b from-[#f7c20e] to-[#1c3944] rounded-full"
             initial={{ height: 0 }}
             whileInView={{ height: '100%' }}
             viewport={{ once: true }}
             transition={{ duration: 1.5, ease: "easeInOut" }}
           />

           <div className="space-y-16">
             {t.founder.sections.map((section, i) => {
               const Icon = timelineIcons[i];
               const isEven = i % 2 === 0;
               
               return (
                 <motion.div
                   key={i}
                   className="relative"
                   initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 0.6, delay: i * 0.1 }}
                 >
                   <div className="flex items-start gap-8">
                     {/* Timeline Icon */}
                     <motion.div
                       className="relative z-10"
                       initial={{ scale: 0 }}
                       whileInView={{ scale: 1 }}
                       viewport={{ once: true }}
                       transition={{ delay: i * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                     >
                       <motion.div
                         className="w-16 h-16 rounded-full bg-[#f7c20e] flex items-center justify-center shadow-lg"
                         whileHover={{ scale: 1.2, rotate: 360 }}
                         transition={{ duration: 0.6 }}
                       >
                         <Icon className="text-[#1c3944]" size={28} />
                       </motion.div>
                     </motion.div>

                     {/* Content */}
                     <motion.div
                       className="flex-1 bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
                       style={{ borderWidth: '2px', borderStyle: 'solid' }}
                       whileHover={{ y: -5 }}
                       animate={{ borderColor: '#e2e8f0' }}
                       transition={{ type: "spring", stiffness: 300 }}
                     >
                       <div className="flex items-start justify-between mb-4">
                         <h3 className={`text-2xl ${t.serif} text-[#1c3944] ${isRTL ? 'text-right' : 'text-left'}`}>
                             {section.title}
                         </h3>
                         <motion.div
                           className="w-8 h-8 rounded-full bg-[#1c3944] text-white flex items-center justify-center text-sm font-bold"
                           initial={{ opacity: 0, scale: 0 }}
                           whileInView={{ opacity: 1, scale: 1 }}
                           viewport={{ once: true }}
                           transition={{ delay: i * 0.1 + 0.4 }}
                         >
                           {i + 1}
                         </motion.div>
                       </div>
                       <motion.p
                         className="text-slate-600 text-lg leading-relaxed"
                         initial={{ opacity: 0 }}
                         whileInView={{ opacity: 1 }}
                         viewport={{ once: true }}
                         transition={{ delay: i * 0.1 + 0.5 }}
                       >
                         {section.text}
                       </motion.p>
                     </motion.div>
                   </div>
                 </motion.div>
               );
             })}
           </div>
         </div>

         {/* Legacy Quote */}
         <motion.div
           className="mt-20 p-12 bg-gradient-to-br from-[#1c3944] to-[#0f242c] rounded-2xl text-white text-center relative overflow-hidden"
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
         >
           {/* Decorative Elements */}
           <motion.div
             className="absolute top-0 right-0 w-64 h-64 bg-[#f7c20e] opacity-10 rounded-full blur-3xl"
             animate={{
               scale: [1, 1.2, 1],
               opacity: [0.1, 0.15, 0.1],
             }}
             transition={{ duration: 4, repeat: Infinity }}
           />
           
           <motion.div
             className="relative z-10"
             initial={{ scale: 0.9 }}
             whileInView={{ scale: 1 }}
             viewport={{ once: true }}
           >
             <h3 className={`text-3xl ${t.serif} text-[#f7c20e] mb-4`}>
               {lang === 'ar' ? 'إرث من الشجاعة والإصلاح' : 'A Legacy of Courage and Reform'}
             </h3>
             <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
               {lang === 'ar'
                 ? 'رياض سيف يبقى رمزاً للمعارضة المبدئية والشجاعة المدنية، ملهماً للأجيال الساعية نحو العدالة والإصلاح في سوريا.'
                 : 'Riad Seif remains a symbol of principled dissent and civic courage, inspiring generations striving for justice and reform in Syria.'}
             </p>
           </motion.div>
         </motion.div>
      </div>
    </div>
  );
}