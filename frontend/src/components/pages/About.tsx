import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { motion } from 'motion/react';
import aboutImage from '../../assets/Cover-Riad-Seif-780x470.jpg';

export default function About({ lang, content }) {
  const t = content[lang];
  const isRTL = lang === 'ar';
  
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="relative py-16 lg:py-24 text-center overflow-hidden min-h-[400px] lg:min-h-[500px]">
        {/* Background Image */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <img 
            src={aboutImage} 
            alt="Riad Seif" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(17, 40, 53, 0.75) 0%, rgba(17, 40, 53, 0.6) 25%, rgba(17, 40, 53, 0.4) 50%, rgba(0, 0, 0, 0.5) 100%)'
          }}
        ></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#f7c20e] font-bold uppercase tracking-widest text-sm mb-4 block"
            >
              {t.nav.about}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`text-4xl lg:text-5xl ${t.serif} text-white mb-8 drop-shadow-lg`}
            >
              {t.about.whoWeAre.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl text-white leading-relaxed font-light drop-shadow-md"
            >
                {t.about.whoWeAre.text}
            </motion.p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        
        {/* Mission & Vision Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-[#1c3944] text-white p-10 rounded-sm"
            >
                <h3 className={`text-3xl ${t.serif} text-[#f7c20e] mb-6`}>{t.about.vision.title}</h3>
                <p className="text-lg leading-relaxed font-light text-slate-200">
                    {t.about.vision.text}
                </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-[#1c3944] text-white p-10 rounded-sm"
            >
                <h3 className={`text-3xl ${t.serif} text-[#f7c20e] mb-6`}>{t.about.mission.title}</h3>
                <p className="text-lg leading-relaxed font-light text-slate-200">
                    {t.about.mission.text}
                </p>
            </motion.div>
        </div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-20"
        >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-3xl ${t.serif} text-[#1c3944] mb-6`}
            >
              {t.about.ourStory.title}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="prose prose-lg text-slate-600"
            >
                <p>{t.about.ourStory.text}</p>
            </motion.div>
        </motion.div>

        {/* Approach / Pillars */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`text-3xl ${t.serif} text-[#1c3944] mb-12 text-center`}
            >
              {t.about.approach.title}
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
                {t.about.approach.pillars.map((pillar, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.15 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="border-t-4 border-[#f7c20e] bg-slate-50 p-8 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                        <h4 className={`text-xl ${t.serif} text-[#1c3944] mb-4 font-bold`}>{pillar.title}</h4>
                        <p className="text-slate-600">{pillar.desc}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>

      </div>
    </div>
  );
}
