import { motion, AnimatePresence } from 'motion/react';
import { Users, Target, Lightbulb, Heart, Award, Briefcase, Building2, Globe, X, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { fetchTeamMembers, type TeamMember } from '../../utils/api';
import RichText from '../RichText';

type AboutMember = {
  id: number | string;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  image: string;
  bio: string;
  bioAr: string;
  detailedBio: string;
  detailedBioAr: string;
};

const TEAM_IMAGE_FALLBACK =
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';

const stripHtmlToText = (value: unknown): string => {
  const raw = String(value ?? '');
  if (!raw) return '';
  const withoutScripts = raw.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
  const withBreaks = withoutScripts.replace(/<br\s*\/?>/gi, '\n');
  const withoutTags = withBreaks.replace(/<\/?[^>]+>/g, ' ');
  return withoutTags
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
};

const sanitizeRichValue = (value: unknown): string => String(value ?? '').replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '').trim();

const normalizeMember = (member: Partial<AboutMember>, fallbackId: string): AboutMember => {
  const nameEn = stripHtmlToText(member.name);
  const nameAr = stripHtmlToText(member.nameAr);
  const roleEn = stripHtmlToText(member.role);
  const roleAr = stripHtmlToText(member.roleAr);
  const bioEn = sanitizeRichValue(member.bio);
  const bioAr = sanitizeRichValue(member.bioAr);
  const detailsEn = sanitizeRichValue(member.detailedBio ?? member.bio ?? '');
  const detailsAr = sanitizeRichValue(member.detailedBioAr ?? member.bioAr ?? '');

  return {
    id: member.id ?? fallbackId,
    name: nameEn || nameAr,
    nameAr: nameAr || nameEn,
    role: roleEn || roleAr,
    roleAr: roleAr || roleEn,
    image: String(member.image ?? '').trim() || TEAM_IMAGE_FALLBACK,
    bio: bioEn || bioAr,
    bioAr: bioAr || bioEn,
    detailedBio: detailsEn || bioEn || bioAr,
    detailedBioAr: detailsAr || bioAr || bioEn,
  };
};

const hasMemberIdentity = (member: AboutMember): boolean =>
  Boolean(
    stripHtmlToText(member.name) ||
      stripHtmlToText(member.nameAr) ||
      stripHtmlToText(member.role) ||
      stripHtmlToText(member.roleAr),
  );

export default function About({ lang, content }) {
  const t = content[lang];
  const isRTL = lang === 'ar';
  const [selectedMember, setSelectedMember] = useState(null);
  const [apiTeam, setApiTeam] = useState<TeamMember[]>([]);
  const [, setLocation] = useLocation();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  
  useEffect(() => {
    fetchTeamMembers()
      .then((items) => setApiTeam(items ?? []))
      .catch(() => setApiTeam([]));
  }, []);

  const fallbackTeamRaw = Array.isArray(t?.about?.team?.members) ? t.about.team.members : [];
  const fallbackTeam: AboutMember[] = fallbackTeamRaw.map((member, index) =>
    normalizeMember(member, `fallback-${index}`),
  );

  const apiMappedTeam: AboutMember[] = apiTeam.map((member, index) =>
    normalizeMember(
      {
        id: member.id,
        name: member.name_en,
        nameAr: member.name_ar,
        role: member.role_en,
        roleAr: member.role_ar,
        image: member.photo_url || '',
        bio: member.bio_en,
        bioAr: member.bio_ar,
        detailedBio: member.bio_en,
        detailedBioAr: member.bio_ar,
      },
      `api-${index}`,
    ),
  );

  const mappedTeam: AboutMember[] = (apiMappedTeam.length ? apiMappedTeam : fallbackTeam).filter(hasMemberIdentity);

  // Separate Joumana from board members (by role/name first, then fallback).
  const jumana = mappedTeam.find((member) => {
    const roleAr = String(member?.roleAr ?? '');
    const roleEn = String(member?.role ?? '').toLowerCase();
    const nameAr = String(member?.nameAr ?? '');
    const nameEn = String(member?.name ?? '').toLowerCase();
    return (
      roleAr.includes('\u0627\u0644\u0645\u062f\u064a\u0631\u0629 \u0627\u0644\u062a\u0646\u0641\u064a\u0630\u064a\u0629') ||
      roleAr.includes('المديرة التنفيذية') ||
      roleEn.includes('executive director') ||
      nameAr.includes('\u062c\u0645\u0627\u0646\u0629') ||
      nameAr.includes('جمانة') ||
      nameEn.includes('joumana') ||
      nameEn.includes('jumana')
    );
  });
  const executiveMember = jumana ?? mappedTeam[0];
  const teamMembers = mappedTeam.filter((member) => member.id !== executiveMember?.id);
  const getLocalized = (arValue: string, enValue: string) => (isRTL ? arValue || enValue : enValue || arValue);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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

  const pillarsIcons = [Award, Building2, Globe, Briefcase];
  
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
            src="https://images.unsplash.com/photo-1737275852849-24f47fcc15c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
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
              className="bg-[#1c3944] text-white p-10 rounded-sm relative overflow-hidden group"
            >
                {/* Animated background circles */}
                <motion.div
                  className="absolute -top-12 -right-12 w-40 h-40 bg-[#f7c20e] opacity-10 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div
                  className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#f7c20e] opacity-10 rounded-full"
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
                
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 bg-[#f7c20e] bg-opacity-20 rounded-full flex items-center justify-center mb-6 relative z-10"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Target className="text-[#f7c20e]" size={32} />
                </motion.div>
                
                <h3 className={`text-3xl ${t.serif} text-[#f7c20e] mb-6 relative z-10`}>{t.about.vision.title}</h3>
                <p className="text-lg leading-relaxed font-light text-slate-200 relative z-10">
                    {t.about.vision.text}
                </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-[#1c3944] text-white p-10 rounded-sm relative overflow-hidden group"
            >
                {/* Animated background circles */}
                <motion.div
                  className="absolute -top-12 -right-12 w-40 h-40 bg-[#f7c20e] opacity-10 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div
                  className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#f7c20e] opacity-10 rounded-full"
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
                
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 bg-[#f7c20e] bg-opacity-20 rounded-full flex items-center justify-center mb-6 relative z-10"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Lightbulb className="text-[#f7c20e]" size={32} />
                </motion.div>
                
                <h3 className={`text-3xl ${t.serif} text-[#f7c20e] mb-6 relative z-10`}>{t.about.mission.title}</h3>
                <p className="text-lg leading-relaxed font-light text-slate-200 relative z-10">
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
          className="max-w-4xl mx-auto mb-20 relative"
        >
            {/* Decorative Container */}
            <div className="relative bg-gradient-to-br from-slate-50 to-white p-10 lg:p-16 rounded-3xl border-2 border-slate-200 overflow-hidden shadow-xl">
              
              {/* Decorative accent corner */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#f7c20e] opacity-10 rounded-br-full"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#1c3944] opacity-5 rounded-tl-full"></div>
              
              {/* Animated floating circles */}
              <motion.div
                className="absolute -right-16 top-1/4 w-56 h-56 bg-[#f7c20e] opacity-5 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.3, 1],
                  x: [0, 20, 0],
                  y: [0, -20, 0]
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Quote icon decoration */}
              <motion.div
                className="absolute top-8 right-8 w-20 h-20 opacity-5"
                animate={{
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="text-[#1c3944] w-full h-full">
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                </svg>
              </motion.div>
              
              {/* Golden accent line */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#f7c20e] via-[#e5b000] to-[#f7c20e]"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              
              {/* Content */}
              <div className="relative z-10">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`text-4xl lg:text-5xl ${t.serif} text-[#1c3944] mb-8 relative`}
                >
                  {t.about.ourStory.title}
                  <motion.div
                    className="absolute -bottom-2 left-0 h-1 bg-[#f7c20e] rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "120px" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </motion.h2>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-slate-700 text-lg leading-relaxed space-y-4"
                >
                    <p className="relative pl-6 border-l-4 border-[#f7c20e] border-opacity-30">{t.about.ourStory.text}</p>
                </motion.div>
              </div>
            </div>
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
                {t.about.approach.pillars.map((pillar, i) => {
                    const Icon = pillarsIcons[i];
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.15 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="border-t-4 border-[#f7c20e] bg-slate-50 p-8 hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden group"
                      >
                        {/* Icon */}
                        <motion.div
                          className="w-14 h-14 bg-[#f7c20e] bg-opacity-10 rounded-full flex items-center justify-center mb-6"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon className="text-[#f7c20e]" size={28} />
                        </motion.div>
                        
                        {/* Background decoration */}
                        <motion.div
                          className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#f7c20e] opacity-5 rounded-full"
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0]
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        
                        <h4 className={`text-xl ${t.serif} text-[#1c3944] mb-4 font-bold`}>{pillar.title}</h4>
                        <p className="text-slate-600">{pillar.desc}</p>
                      </motion.div>
                    );
                })}
            </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-32"
        >
            {/* Executive Director Section - Before team grid */}
            {executiveMember && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-24"
              >
                <div className="text-center mb-12">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={`text-3xl lg:text-4xl ${t.serif} text-[#1c3944] mb-4`}
                  >
                    {lang === 'ar' ? '\u0627\u0644\u0645\u062f\u064a\u0631\u0629 \u0627\u0644\u062a\u0646\u0641\u064a\u0630\u064a\u0629' : 'Executive Director'}
                  </motion.h3>
                  <motion.div
                    className="w-24 h-1 bg-[#f7c20e] mx-auto rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '96px' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </div>

                <motion.div
                  onClick={() => setLocation('/jumana-seif')}
                  whileHover={{ y: -12, scale: 1.01 }}
                  className="max-w-5xl mx-auto bg-gradient-to-br from-[#1c3944] to-[#0f242c] border-4 border-[#f7c20e] hover:border-[#f7c20e] hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden group relative"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    {[...Array(15)].map((_, i) => (
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

                  <div className="grid md:grid-cols-5 gap-0 relative z-10">
                    {/* Image Section */}
                    <div className="md:col-span-2 relative overflow-hidden h-80 md:h-auto">
                      <motion.img
                        src={executiveMember.image}
                        alt={getLocalized(executiveMember.nameAr, executiveMember.name)}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.8 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1c3944]/60"></div>
                    </div>

                    {/* Content Section */}
                    <div className="md:col-span-3 p-8 lg:p-12 flex flex-col justify-center">
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <h3 className={`text-3xl lg:text-4xl ${t.serif} font-bold text-[#f7c20e] mb-3`}>
                          {getLocalized(executiveMember.nameAr, executiveMember.name)}
                        </h3>
                        <p className="text-white/80 text-lg mb-6">
                          {getLocalized(executiveMember.roleAr, executiveMember.role)}
                        </p>
                        <RichText
                          value={getLocalized(executiveMember.bioAr, executiveMember.bio)}
                          className="text-white/90 text-base leading-relaxed mb-8"
                        />
                        <motion.div
                          className={`flex items-center gap-3 text-[#f7c20e] font-bold text-lg ${isRTL ? 'flex-row-reverse' : ''}`}
                          whileHover={{ x: isRTL ? -8 : 8 }}
                        >
                          <span>{lang === 'ar' ? '\u0627\u0639\u0631\u0641 \u0627\u0644\u0645\u0632\u064a\u062f \u0639\u0646 \u062c\u0645\u0627\u0646\u0629 \u0633\u064a\u0641' : 'Learn More About Joumana Seif'}</span>
                          <ArrowIcon size={20} />
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Decorative Corner Elements */}
                  <motion.div
                    className="absolute top-0 right-0 w-32 h-32 bg-[#f7c20e] opacity-10 rounded-bl-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-40 h-40 bg-[#f7c20e] opacity-10 rounded-tr-full"
                    animate={{
                      scale: [1.2, 1, 1.2],
                      opacity: [0.15, 0.05, 0.15],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>
            )}

            <div className="text-center mb-16">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`text-4xl lg:text-5xl ${t.serif} text-[#1c3944] mb-4`}
                >
                  {t.about.team.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-slate-600 text-lg max-w-3xl mx-auto"
                >
                  {t.about.team.subtitle}
                </motion.p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member, i) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    onClick={() => setSelectedMember(member)}
                    className="bg-white border border-slate-200 hover:border-[#f7c20e] hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
                  >
                    <div className="relative overflow-hidden h-64">
                      <motion.img
                        src={member.image}
                        alt={getLocalized(member.nameAr, member.name)}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6">
                      <h3 className={`text-xl ${t.serif} font-bold text-[#1c3944] mb-2`}>
                        {getLocalized(member.nameAr, member.name)}
                      </h3>
                      <p className="text-[#f7c20e] font-medium mb-3">
                        {getLocalized(member.roleAr, member.role)}
                      </p>
                      <p className="text-slate-600 text-sm line-clamp-3">
                        {stripHtmlToText(getLocalized(member.bioAr, member.bio))}
                      </p>
                      <motion.div
                        className={`mt-4 text-[#1c3944] font-semibold text-sm flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
                        whileHover={{ x: isRTL ? -5 : 5 }}
                      >
                        <span>{lang === 'ar' ? '\u0627\u0642\u0631\u0623 \u0627\u0644\u0645\u0632\u064a\u062f' : 'Read More'}</span>
                        <ArrowIcon size={16} className="text-[#f7c20e]" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
            </div>
        </motion.div>

      </div>

      {/* Member Detail Modal */}
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
              className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
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
              <div className="relative h-80 overflow-hidden">
                <img
                  src={selectedMember.image}
                  alt={getLocalized(selectedMember.nameAr, selectedMember.name)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className={`absolute bottom-8 ${isRTL ? 'right-8' : 'left-8'} text-white`}>
                  <h2 className={`text-3xl ${t.serif} font-bold mb-2`}>
                    {getLocalized(selectedMember.nameAr, selectedMember.name)}
                  </h2>
                  <p className="text-[#f7c20e] text-lg font-medium">
                    {getLocalized(selectedMember.roleAr, selectedMember.role)}
                  </p>
                </div>
              </div>

              {/* Member Details */}
              <div className="p-8">
                <RichText
                  value={getLocalized(selectedMember.detailedBioAr, selectedMember.detailedBio)}
                  className="text-slate-700 text-lg leading-relaxed"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
