import { motion } from 'motion/react';
import { Award, Scale, Users, Heart, BookOpen, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLocation } from 'wouter';

export default function JumanaSeif({ lang, content }) {
  const t = content[lang];
  const isRTL = lang === 'ar';
  const [, setLocation] = useLocation();
  const BackArrowIcon = isRTL ? ArrowRight : ArrowLeft;

  const timelineIcons = [Scale, Award, Users, Heart, BookOpen];
  
  // Content for Jumana's sections
  const fallbackSections = {
    en: [
      {
        title: "Early Life and Education",
        text: "Born into a family deeply committed to human rights and democracy, Joumana Seif witnessed firsthand the struggles and sacrifices required for social change. She pursued law studies with a determination to use legal frameworks as tools for justice and equality in Syria."
      },
      {
        title: "Legal Career and Advocacy",
        text: "After completing her law degree, Joumana dedicated herself to legal reform initiatives focusing on gender justice, civil rights, and democratic governance. Her work emphasized empowering marginalized communities through legal awareness and access to justice."
      },
      {
        title: "Leading the Foundation",
        text: "As Executive Director of the Riad Seif Foundation, Joumana transformed her father's vision into concrete programs that address transitional justice, legal empowerment, and civil society development. Under her leadership, the Foundation has become a leading voice for democratic reform in Syria."
      },
      {
        title: "Women's Rights Champion",
        text: "Joumana has been a tireless advocate for women's rights in Syria, working to challenge discriminatory laws and practices. She has led initiatives to increase women's participation in political processes and decision-making structures."
      },
      {
        title: "Vision for Syria's Future",
        text: "Joumana continues to work toward a Syria built on principles of justice, equality, and democratic governance. She believes in the power of civil society to drive meaningful change and remains committed to supporting Syrian activists and organizations working toward these goals."
      }
    ],
    ar: [
      {
        title: "Ø§Ù„Ø­ÙŠØ§Ø© Ø§Ù„Ù…Ø¨ÙƒØ±Ø© ÙˆØ§Ù„ØªØ¹Ù„ÙŠÙ…",
        text: "ÙˆÙ„Ø¯Øª ÙÙŠ Ø¹Ø§Ø¦Ù„Ø© Ù…Ù„ØªØ²Ù…Ø© Ø¨Ø¹Ù…Ù‚ Ø¨Ø­Ù‚ÙˆÙ‚ Ø§Ù„Ø¥Ù†Ø³Ø§Ù† ÙˆØ§Ù„Ø¯ÙŠÙ…Ù‚Ø±Ø§Ø·ÙŠØ©ØŒ Ø´Ù‡Ø¯Øª Ø¬Ù…Ø§Ù†Ø© Ø³ÙŠÙ Ø¨Ø´ÙƒÙ„ Ù…Ø¨Ø§Ø´Ø± Ø§Ù„Ù†Ø¶Ø§Ù„Ø§Øª ÙˆØ§Ù„ØªØ¶Ø­ÙŠØ§Øª Ø§Ù„Ù…Ø·Ù„ÙˆØ¨Ø© Ù…Ù† Ø£Ø¬Ù„ Ø§Ù„ØªØºÙŠÙŠØ± Ø§Ù„Ø§Ø¬ØªÙ…Ø§Ø¹ÙŠ. ØªØ§Ø¨Ø¹Øª Ø¯Ø±Ø§Ø³Ø© Ø§Ù„Ù‚Ø§Ù†ÙˆÙ† Ø¨Ø¹Ø²ÙŠÙ…Ø© Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø§Ù„Ø£Ø·Ø± Ø§Ù„Ù‚Ø§Ù†ÙˆÙ†ÙŠØ© ÙƒØ£Ø¯ÙˆØ§Øª Ù„Ù„Ø¹Ø¯Ø§Ù„Ø© ÙˆØ§Ù„Ù…Ø³Ø§ÙˆØ§Ø© ÙÙŠ Ø³ÙˆØ±ÙŠØ§."
      },
      {
        title: "Ø§Ù„Ù…Ø³ÙŠØ±Ø© Ø§Ù„Ù‚Ø§Ù†ÙˆÙ†ÙŠØ© ÙˆØ§Ù„Ø¯ÙØ§Ø¹ Ø¹Ù† Ø§Ù„Ø­Ù‚ÙˆÙ‚",
        text: "Ø¨Ø¹Ø¯ Ø¥ÙƒÙ…Ø§Ù„ Ø´Ù‡Ø§Ø¯ØªÙ‡Ø§ ÙÙŠ Ø§Ù„Ù‚Ø§Ù†ÙˆÙ†ØŒ ÙƒØ±Ø³Øª Ø¬Ù…Ø§Ù†Ø© Ù†ÙØ³Ù‡Ø§ Ù„Ù…Ø¨Ø§Ø¯Ø±Ø§Øª Ø§Ù„Ø¥ØµÙ„Ø§Ø­ Ø§Ù„Ù‚Ø§Ù†ÙˆÙ†ÙŠ Ù…Ø¹ Ø§Ù„ØªØ±ÙƒÙŠØ² Ø¹Ù„Ù‰ Ø§Ù„Ø¹Ø¯Ø§Ù„Ø© Ø§Ù„Ø¬Ù†Ø¯Ø±ÙŠØ© ÙˆØ§Ù„Ø­Ù‚ÙˆÙ‚ Ø§Ù„Ù…Ø¯Ù†ÙŠØ© ÙˆØ§Ù„Ø­ÙˆÙƒÙ…Ø© Ø§Ù„Ø¯ÙŠÙ…Ù‚Ø±Ø§Ø·ÙŠØ©. Ø±ÙƒØ² Ø¹Ù…Ù„Ù‡Ø§ Ø¹Ù„Ù‰ ØªÙ…ÙƒÙŠÙ† Ø§Ù„Ù…Ø¬ØªÙ…Ø¹Ø§Øª Ø§Ù„Ù…Ù‡Ù…Ø´Ø© Ù…Ù† Ø®Ù„Ø§Ù„ Ø§Ù„ØªÙˆØ¹ÙŠØ© Ø§Ù„Ù‚Ø§Ù†ÙˆÙ†ÙŠØ© ÙˆØ§Ù„ÙˆØµÙˆÙ„ Ø¥Ù„Ù‰ Ø§Ù„Ø¹Ø¯Ø§Ù„Ø©."
      },
      {
        title: "Ù‚ÙŠØ§Ø¯Ø© Ø§Ù„Ù…Ø¤Ø³Ø³Ø©",
        text: "ÙƒÙ…Ø¯ÙŠØ±Ø© ØªÙ†ÙÙŠØ°ÙŠØ© Ù„Ù…Ø¤Ø³Ø³Ø© Ø±ÙŠØ§Ø¶ Ø³ÙŠÙØŒ Ø­ÙˆÙ„Øª Ø¬Ù…Ø§Ù†Ø© Ø±Ø¤ÙŠØ© ÙˆØ§Ù„Ø¯Ù‡Ø§ Ø¥Ù„Ù‰ Ø¨Ø±Ø§Ù…Ø¬ Ù…Ù„Ù…ÙˆØ³Ø© ØªØ¹Ø§Ù„Ø¬ Ø§Ù„Ø¹Ø¯Ø§Ù„Ø© Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„ÙŠØ© ÙˆØ§Ù„ØªÙ…ÙƒÙŠÙ† Ø§Ù„Ù‚Ø§Ù†ÙˆÙ†ÙŠ ÙˆØªØ·ÙˆÙŠØ± Ø§Ù„Ù…Ø¬ØªÙ…Ø¹ Ø§Ù„Ù…Ø¯Ù†ÙŠ. ØªØ­Øª Ù‚ÙŠØ§Ø¯ØªÙ‡Ø§ØŒ Ø£ØµØ¨Ø­Øª Ø§Ù„Ù…Ø¤Ø³Ø³Ø© ØµÙˆØªØ§Ù‹ Ø±Ø§Ø¦Ø¯Ø§Ù‹ Ù„Ù„Ø¥ØµÙ„Ø§Ø­ Ø§Ù„Ø¯ÙŠÙ…Ù‚Ø±Ø§Ø·ÙŠ ÙÙŠ Ø³ÙˆØ±ÙŠØ§."
      },
      {
        title: "Ø¨Ø·Ù„Ø© Ø­Ù‚ÙˆÙ‚ Ø§Ù„Ù…Ø±Ø£Ø©",
        text: "ÙƒØ§Ù†Øª Ø¬Ù…Ø§Ù†Ø© Ù…Ø¯Ø§ÙØ¹Ø© Ù„Ø§ ØªÙƒÙ„ Ø¹Ù† Ø­Ù‚ÙˆÙ‚ Ø§Ù„Ù…Ø±Ø£Ø© ÙÙŠ Ø³ÙˆØ±ÙŠØ§ØŒ Ø­ÙŠØ« Ø¹Ù…Ù„Øª Ø¹Ù„Ù‰ ØªØ­Ø¯ÙŠ Ø§Ù„Ù‚ÙˆØ§Ù†ÙŠÙ† ÙˆØ§Ù„Ù…Ù…Ø§Ø±Ø³Ø§Øª Ø§Ù„ØªÙ…ÙŠÙŠØ²ÙŠØ©. Ù‚Ø§Ø¯Øª Ù…Ø¨Ø§Ø¯Ø±Ø§Øª Ù„Ø²ÙŠØ§Ø¯Ø© Ù…Ø´Ø§Ø±ÙƒØ© Ø§Ù„Ù…Ø±Ø£Ø© ÙÙŠ Ø§Ù„Ø¹Ù…Ù„ÙŠØ§Øª Ø§Ù„Ø³ÙŠØ§Ø³ÙŠØ© ÙˆÙ‡ÙŠØ§ÙƒÙ„ ØµÙ†Ø¹ Ø§Ù„Ù‚Ø±Ø§Ø±."
      },
      {
        title: "Ø±Ø¤ÙŠØ© Ù„Ù…Ø³ØªÙ‚Ø¨Ù„ Ø³ÙˆØ±ÙŠØ§",
        text: "ØªÙˆØ§ØµÙ„ Ø¬Ù…Ø§Ù†Ø© Ø§Ù„Ø¹Ù…Ù„ Ù†Ø­Ùˆ Ø³ÙˆØ±ÙŠØ§ Ù…Ø¨Ù†ÙŠØ© Ø¹Ù„Ù‰ Ù…Ø¨Ø§Ø¯Ø¦ Ø§Ù„Ø¹Ø¯Ø§Ù„Ø© ÙˆØ§Ù„Ù…Ø³Ø§ÙˆØ§Ø© ÙˆØ§Ù„Ø­ÙˆÙƒÙ…Ø© Ø§Ù„Ø¯ÙŠÙ…Ù‚Ø±Ø§Ø·ÙŠØ©. ØªØ¤Ù…Ù† Ø¨Ù‚ÙˆØ© Ø§Ù„Ù…Ø¬ØªÙ…Ø¹ Ø§Ù„Ù…Ø¯Ù†ÙŠ ÙÙŠ Ù‚ÙŠØ§Ø¯Ø© Ø§Ù„ØªØºÙŠÙŠØ± Ø§Ù„Ø­Ù‚ÙŠÙ‚ÙŠ ÙˆØªØ¨Ù‚Ù‰ Ù…Ù„ØªØ²Ù…Ø© Ø¨Ø¯Ø¹Ù… Ø§Ù„Ù†Ø§Ø´Ø·ÙŠÙ† ÙˆØ§Ù„Ù…Ù†Ø¸Ù…Ø§Øª Ø§Ù„Ø³ÙˆØ±ÙŠØ© Ø§Ù„Ø¹Ø§Ù…Ù„Ø© Ù†Ø­Ùˆ Ù‡Ø°Ù‡ Ø§Ù„Ø£Ù‡Ø¯Ø§Ù."
      }
    ]
  };

  const jumana = t.jumana ?? {};
  const currentSections = jumana.sections ?? fallbackSections[lang];
  const hero = jumana.hero ?? {
    role: lang === 'ar' ? 'Ø§Ù„Ù…Ø¯ÙŠØ±Ø© Ø§Ù„ØªÙ†ÙÙŠØ°ÙŠØ©' : 'Executive Director',
    name: lang === 'ar' ? 'Ø¬Ù…Ø§Ù†Ø© Ø³ÙŠÙ' : 'Joumana Seif',
  };
  const intro = jumana.intro ?? {
    lead:
      lang === 'ar'
        ? 'Ø¬Ù…Ø§Ù†Ø© Ø³ÙŠÙ Ù…Ø­Ø§Ù…ÙŠØ© Ø³ÙˆØ±ÙŠØ© ÙˆÙ…Ø¯Ø§ÙØ¹Ø© Ø¹Ù† Ø­Ù‚ÙˆÙ‚ Ø§Ù„Ø¥Ù†Ø³Ø§Ù† ÙƒØ±Ø³Øª Ø­ÙŠØ§ØªÙ‡Ø§ Ø§Ù„Ù…Ù‡Ù†ÙŠØ© Ù„ØªØ¹Ø²ÙŠØ² Ø§Ù„Ø¹Ø¯Ø§Ù„Ø© ÙˆØ§Ù„Ø¥ØµÙ„Ø§Ø­ Ø§Ù„Ø¯ÙŠÙ…Ù‚Ø±Ø§Ø·ÙŠ ÙÙŠ Ø³ÙˆØ±ÙŠØ§. ÙƒØ§Ø¨Ù†Ø© Ø§Ù„Ù†Ø§Ø´Ø· Ø§Ù„Ø´Ù‡ÙŠØ± Ø±ÙŠØ§Ø¶ Ø³ÙŠÙØŒ Ù†Ø´Ø£Øª ÙˆÙ‡ÙŠ ØªØ´Ù‡Ø¯ Ø¨Ø´ÙƒÙ„ Ù…Ø¨Ø§Ø´Ø± Ø§Ù„Ù†Ø¶Ø§Ù„ Ù…Ù† Ø£Ø¬Ù„ Ø­Ù‚ÙˆÙ‚ Ø§Ù„Ø¥Ù†Ø³Ø§Ù† ÙˆØ§Ù„ØªØºÙŠÙŠØ± Ø§Ù„Ø¯ÙŠÙ…Ù‚Ø±Ø§Ø·ÙŠ. Ø£Ø³Ø³Øª Ù…Ø¤Ø³Ø³Ø© Ø±ÙŠØ§Ø¶ Ø³ÙŠÙ Ù„Ø­Ù‚ÙˆÙ‚ Ø§Ù„Ø¥Ù†Ø³Ø§Ù† Ù„ØªÙƒØ±ÙŠÙ… Ø¥Ø±Ø« ÙˆØ§Ù„Ø¯Ù‡Ø§ ÙˆØªØ­ÙˆÙŠÙ„ Ø±Ø¤ÙŠØªÙ‡ Ø¥Ù„Ù‰ Ø¨Ø±Ø§Ù…Ø¬ Ù…Ù„Ù…ÙˆØ³Ø© ØªÙ…ÙƒÙ† ÙØ§Ø¹Ù„ÙŠ Ø§Ù„Ù…Ø¬ØªÙ…Ø¹ Ø§Ù„Ù…Ø¯Ù†ÙŠØŒ ÙˆØ®Ø§ØµØ© Ø§Ù„Ù†Ø³Ø§Ø¡ ÙˆØ§Ù„Ù…Ø¬ØªÙ…Ø¹Ø§Øª Ø§Ù„Ù…Ù‡Ù…Ø´Ø©.'
        : 'Joumana Seif is a Syrian lawyer and human rights advocate who has dedicated her career to advancing justice and democratic reform in Syria. As the daughter of renowned activist Riad Seif, she grew up witnessing firsthand the struggle for human rights and democratic change. She founded the Riad Seif Foundation for Human Rights to honor her father\'s legacy and transform his vision into tangible programs that empower civil society actors, particularly women and marginalized communities.',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    caption: lang === 'ar' ? 'Ø¬Ù…Ø§Ù†Ø© Ø³ÙŠÙ' : 'Joumana Seif',
  };
  const quote = jumana.quote ?? {
    title: lang === 'ar' ? 'Ù‚ÙŠØ§Ø¯Ø© Ù…Ù„Ù‡Ù…Ø© Ù…Ù† Ø£Ø¬Ù„ Ø§Ù„ØªØºÙŠÙŠØ±' : 'Inspiring Leadership for Change',
    text:
      lang === 'ar'
        ? 'ØªÙˆØ§ØµÙ„ Ø¬Ù…Ø§Ù†Ø© Ø³ÙŠÙ Ù…Ø³ÙŠØ±Ø© ÙˆØ§Ù„Ø¯Ù‡Ø§ ÙÙŠ Ø§Ù„Ù†Ø¶Ø§Ù„ Ù…Ù† Ø£Ø¬Ù„ Ø§Ù„Ø¹Ø¯Ø§Ù„Ø© ÙˆØ§Ù„Ø¯ÙŠÙ…Ù‚Ø±Ø§Ø·ÙŠØ©ØŒ Ù‚Ø§Ø¦Ø¯Ø© Ø¬ÙŠÙ„Ø§Ù‹ Ø¬Ø¯ÙŠØ¯Ø§Ù‹ Ù…Ù† Ø§Ù„Ù…Ø¯Ø§ÙØ¹ÙŠÙ† Ø¹Ù† Ø­Ù‚ÙˆÙ‚ Ø§Ù„Ø¥Ù†Ø³Ø§Ù† ÙÙŠ Ø³ÙˆØ±ÙŠØ§.'
        : 'Joumana Seif continues her father\'s legacy in the struggle for justice and democracy, leading a new generation of human rights defenders in Syria.',
  };
  const backLabel =
    jumana.backLabel ?? (lang === 'ar' ? 'Ø§Ù„Ø¹ÙˆØ¯Ø© Ø¥Ù„Ù‰ Ù…Ù† Ù†Ø­Ù†' : 'Back to About Us');
  
  return (
    <div className="bg-white">
      {/* Back Button */}
      <motion.div
        className="bg-white border-b border-slate-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4">
          <motion.button
            onClick={() => setLocation('/about')}
            className={`flex items-center gap-2 text-[#1c3944] hover:text-[#f7c20e] font-semibold transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
            whileHover={{ x: isRTL ? 5 : -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <BackArrowIcon size={20} />
            <span>{backLabel}</span>
          </motion.button>
        </div>
      </motion.div>

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
              {hero.role}
            </motion.span>
            <motion.h1
              className={`text-4xl lg:text-5xl ${t.serif} mb-8`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {hero.name}
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
              className={`float-${isRTL ? 'start' : 'end'} ${isRTL ? 'me-8' : 'ms-8'} mb-6 w-64 bg-slate-100 p-2 border border-slate-200 ${isRTL ? 'rotate-1' : '-rotate-1'} shadow-lg relative z-10`}
              whileHover={{ rotate: 0, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-slate-200 to-slate-300 relative overflow-hidden">
                  <img 
                    src={intro.image}
                    alt={hero.name}
                    className="w-full h-full object-cover"
                  />
              </div>
              <div className="text-center text-xs text-slate-500 mt-2 italic">
                {intro.caption}
              </div>
            </motion.div>
            
            <motion.p
              className="lead text-xl font-light text-[#1c3944] mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
                {intro.lead}
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
             {currentSections.map((section, i) => {
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
               {quote.title}
             </h3>
             <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
               {quote.text}
             </p>
           </motion.div>
         </motion.div>
      </div>
    </div>
  );
}


