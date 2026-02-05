import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function Contact({ lang, content }) {
  const t = content[lang];
  const isRTL = lang === 'ar';
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState({ name: false, email: false, message: false });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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
    <div className="py-20 lg:py-32 bg-gradient-to-b from-slate-50 to-white min-h-screen">
       <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={`text-4xl lg:text-5xl ${t.serif} text-[#1c3944] mb-4 text-center`}>{t.nav.contact}</h1>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              {lang === 'ar' 
                ? 'نحن هنا للاستماع إليك. تواصل معنا لأي استفسار أو اقتراح.'
                : "We're here to listen. Reach out to us for any inquiries or suggestions."}
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-12 bg-white p-8 lg:p-12 shadow-lg rounded-2xl border border-slate-100"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
             {/* Contact Information */}
             <motion.div variants={itemVariants}>
                <h3 className={`text-2xl text-[#1c3944] mb-8 ${t.serif}`}>
                  {lang === 'ar' ? 'معلومات التواصل' : 'Contact Information'}
                </h3>
                <motion.ul className="space-y-8">
                  {[
                    {
                      icon: MapPin,
                      label: lang === 'ar' ? 'العنوان' : 'Address',
                      value: lang === 'ar' ? '٢٣٤ شارع بيروت، بيروت، لبنان' : '234 Rue de Beirut, Beirut, Lebanon',
                      color: '#f7c20e'
                    },
                    {
                      icon: Phone,
                      label: lang === 'ar' ? 'الهاتف' : 'Phone',
                      value: '+961 1 234 567',
                      color: '#1c3944'
                    },
                    {
                      icon: Mail,
                      label: lang === 'ar' ? 'البريد الإلكتروني' : 'Email',
                      value: 'info@riadseiflb.org',
                      color: '#2c1d5f'
                    }
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-all duration-300"
                      whileHover={{ x: isRTL ? -5 : 5, scale: 1.02 }}
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                    >
                      <motion.div
                        className="shrink-0 mt-1"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                          <item.icon size={24} style={{ color: item.color }} />
                        </div>
                      </motion.div>
                      <div>
                         <span className="font-bold block text-[#1c3944] mb-1">{item.label}</span>
                         <span className="text-slate-600">{item.value}</span>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Social Links */}
                <motion.div
                  className="mt-12 pt-8 border-t border-slate-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <h4 className={`text-lg ${t.serif} text-[#1c3944] mb-4`}>
                    {lang === 'ar' ? 'تابعنا' : 'Follow Us'}
                  </h4>
                  <div className="flex gap-3">
                    {['facebook', 'twitter', 'linkedin', 'instagram'].map((social, idx) => (
                      <motion.div
                        key={social}
                        className="w-10 h-10 rounded-full bg-[#1c3944] flex items-center justify-center cursor-pointer"
                        whileHover={{ scale: 1.1, backgroundColor: '#f7c20e' }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + idx * 0.1 }}
                      >
                        <span className="text-white text-xs font-bold uppercase">{social[0]}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
             </motion.div>
             
             {/* Contact Form */}
             <motion.div variants={itemVariants}>
                <h3 className={`text-2xl text-[#1c3944] mb-8 ${t.serif}`}>
                  {lang === 'ar' ? 'أرسل لنا رسالة' : 'Send us a message'}
                </h3>
                
                {submitted ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <CheckCircle size={64} className="text-green-500 mb-4" />
                    </motion.div>
                    <h4 className={`text-2xl ${t.serif} text-[#1c3944] mb-2`}>
                      {lang === 'ar' ? 'شكراً لتواصلك!' : 'Thank you!'}
                    </h4>
                    <p className="text-slate-600">
                      {lang === 'ar' ? 'سنتواصل معك قريباً' : "We'll get back to you soon"}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                     {[
                       { name: 'name', label: lang === 'ar' ? 'الاسم' : 'Name', type: 'text' },
                       { name: 'email', label: lang === 'ar' ? 'البريد الإلكتروني' : 'Email', type: 'email' },
                     ].map((field) => (
                       <motion.div
                         key={field.name}
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.2 }}
                       >
                          <label className="block text-sm font-bold text-slate-700 mb-2">
                            {field.label}
                          </label>
                          <motion.input
                            type={field.type}
                            value={formData[field.name]}
                            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                            onFocus={() => setFocused({ ...focused, [field.name]: true })}
                            onBlur={() => setFocused({ ...focused, [field.name]: false })}
                            style={{
                              borderColor: focused[field.name] ? '#1c3944' : '#e2e8f0'
                            }}
                            className="w-full border-2 p-3 rounded-lg focus:outline-none transition-all duration-300"
                            whileFocus={{ scale: 1.01 }}
                          />
                       </motion.div>
                     ))}
                     
                     <motion.div
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.3 }}
                     >
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          {lang === 'ar' ? 'الرسالة' : 'Message'}
                        </label>
                        <motion.textarea
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          onFocus={() => setFocused({ ...focused, message: true })}
                          onBlur={() => setFocused({ ...focused, message: false })}
                          style={{
                            borderColor: focused.message ? '#1c3944' : '#e2e8f0'
                          }}
                          className="w-full border-2 p-3 rounded-lg focus:outline-none transition-all duration-300 resize-none"
                          whileFocus={{ scale: 1.01 }}
                        />
                     </motion.div>
                     
                     <motion.button
                       type="submit"
                       className="bg-[#1c3944] text-white px-8 py-3 rounded-lg font-bold w-full flex items-center justify-center gap-2 overflow-hidden relative"
                       whileHover={{ scale: 1.02 }}
                       whileTap={{ scale: 0.98 }}
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ delay: 0.4 }}
                     >
                        <motion.span
                          className="absolute inset-0 bg-[#f7c20e]"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10">{lang === 'ar' ? 'إرسال' : 'Send'}</span>
                        <Send size={18} className="relative z-10" />
                     </motion.button>
                  </form>
                )}
             </motion.div>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            className="mt-12 rounded-2xl overflow-hidden shadow-lg border border-slate-200"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-slate-100 h-64 flex items-center justify-center">
              <p className="text-slate-400">{lang === 'ar' ? 'خريطة الموقع' : 'Location Map'}</p>
            </div>
          </motion.div>
       </div>
    </div>
  );
}