import { Mail, Phone, MapPin, Send, CheckCircle, Facebook, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { submitContact } from '../../utils/api';

function XLogoIcon({ size = 18, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M18.244 2H21.5l-7.118 8.134L22.75 22h-6.557l-5.135-6.708L5.19 22H1.93l7.612-8.703L1.5 2h6.724l4.64 6.13L18.244 2Zm-1.15 18h1.804L7.247 3.896H5.312L17.094 20Z" />
    </svg>
  );
}

export default function Contact({ lang, content }) {
  const t = content[lang];
  const isRTL = lang === 'ar';
  const contact = t.contact ?? {};
  const contactInfo = contact.info ?? {};
  const social = contact.social ?? {};
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState({ name: false, email: false, message: false });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.message.trim().length < 10) {
      setSubmitError(lang === 'ar' ? 'يجب أن تحتوي الرسالة على 10 أحرف على الأقل.' : 'Message must be at least 10 characters.');
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      await submitContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    } catch {
      setSubmitError(
        lang === 'ar'
          ? 'تعذر إرسال الرسالة الآن. يرجى المحاولة لاحقاً.'
          : 'Unable to send your message right now. Please try again later.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const socials = [
    { key: 'facebook', href: social.facebook, label: 'Facebook', icon: Facebook },
    { key: 'linkedin', href: social.linkedin, label: 'LinkedIn', icon: Linkedin },
    { key: 'instagram', href: social.instagram, label: 'Instagram', icon: Instagram },
    { key: 'x', href: social.x, label: 'X', icon: XLogoIcon },
  ].filter((item) => item.href);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="py-20 lg:py-32 bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className={`text-4xl lg:text-5xl ${t.serif} text-[#1c3944] mb-4 text-center`}>{t.nav.contact}</h1>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            {contact.intro ?? (lang === 'ar' ? 'نحن هنا للاستماع إليك. تواصل معنا لأي استفسار أو اقتراح.' : "We're here to listen. Reach out to us for any inquiries or suggestions.")}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12 bg-white p-8 lg:p-12 shadow-lg rounded-2xl border border-slate-100"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h3 className={`text-2xl text-[#1c3944] mb-8 ${t.serif}`}>
              {lang === 'ar' ? 'معلومات التواصل' : 'Contact Information'}
            </h3>
            <motion.ul className="space-y-8">
              {[
                {
                  icon: MapPin,
                  label: contactInfo.address ?? (lang === 'ar' ? 'العنوان' : 'Address'),
                  value: contactInfo.addressValue ?? (lang === 'ar' ? 'دمشق، سوريا' : 'Damascus, Syria'),
                  color: '#f7c20e',
                },
                {
                  icon: Phone,
                  label: contactInfo.phone ?? (lang === 'ar' ? 'الهاتف' : 'Phone'),
                  value: contactInfo.phoneValue ?? '+963 961 234 567',
                  color: '#1c3944',
                },
                {
                  icon: Mail,
                  label: contactInfo.email ?? (lang === 'ar' ? 'البريد الإلكتروني' : 'Email'),
                  value: contactInfo.emailValue ?? 'info@riadseiflb.org',
                  color: '#2c1d5f',
                },
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-all duration-300"
                  whileHover={{ x: isRTL ? -5 : 5, scale: 1.02 }}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                >
                  <motion.div className="shrink-0 mt-1" whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
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

            {socials.length > 0 ? (
              <motion.div
                className="mt-12 pt-8 border-t border-slate-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <h4 className={`text-lg ${t.serif} text-[#1c3944] mb-4`}>
                  {social.title ?? (lang === 'ar' ? 'تابعنا' : 'Follow Us')}
                </h4>
                <div className="flex gap-3">
                  {socials.map((item, idx) => (
                    <motion.a
                      key={item.key}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="w-10 h-10 rounded-full bg-[#1c3944] flex items-center justify-center cursor-pointer text-white"
                      whileHover={{ scale: 1.1, backgroundColor: '#f7c20e' }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + idx * 0.1 }}
                    >
                      <item.icon size={16} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className={`text-2xl text-[#1c3944] mb-8 ${t.serif}`}>
              {lang === 'ar' ? 'أرسل لنا رسالة' : 'Send us a message'}
            </h3>

            {submitted ? (
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center justify-center py-12">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
                  <CheckCircle size={64} className="text-green-500 mb-4" />
                </motion.div>
                <h4 className={`text-2xl ${t.serif} text-[#1c3944] mb-2`}>{lang === 'ar' ? 'شكراً لتواصلك!' : 'Thank you!'}</h4>
                <p className="text-slate-600">{lang === 'ar' ? 'سنتواصل معك قريباً' : "We'll get back to you soon"}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitError ? <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{submitError}</div> : null}
                {[
                  { name: 'name', label: contact.form?.name ?? (lang === 'ar' ? 'الاسم' : 'Name'), type: 'text' },
                  { name: 'email', label: contact.form?.email ?? (lang === 'ar' ? 'البريد الإلكتروني' : 'Email'), type: 'email' },
                ].map((field) => (
                  <motion.div key={field.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{field.label}</label>
                    <motion.input
                      type={field.type}
                      value={formData[field.name]}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      onFocus={() => setFocused({ ...focused, [field.name]: true })}
                      onBlur={() => setFocused({ ...focused, [field.name]: false })}
                      style={{ borderColor: focused[field.name] ? '#1c3944' : '#e2e8f0' }}
                      className="w-full border-2 p-3 rounded-lg focus:outline-none transition-all duration-300"
                      whileFocus={{ scale: 1.01 }}
                      required
                    />
                  </motion.div>
                ))}

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    {contact.form?.message ?? (lang === 'ar' ? 'الرسالة' : 'Message')}
                  </label>
                  <motion.textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocused({ ...focused, message: true })}
                    onBlur={() => setFocused({ ...focused, message: false })}
                    style={{ borderColor: focused.message ? '#1c3944' : '#e2e8f0' }}
                    className="w-full border-2 p-3 rounded-lg focus:outline-none transition-all duration-300 resize-none"
                    whileFocus={{ scale: 1.01 }}
                    required
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
                  disabled={isSubmitting}
                >
                  <motion.span
                    className="absolute inset-0 bg-[#f7c20e]"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">
                    {isSubmitting
                      ? lang === 'ar'
                        ? 'جارٍ الإرسال...'
                        : 'Sending...'
                      : contact.form?.send ?? (lang === 'ar' ? 'إرسال الرسالة' : 'Send Message')}
                  </span>
                  <Send size={18} className="relative z-10" />
                </motion.button>
              </form>
            )}
          </motion.div>
        </motion.div>

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
