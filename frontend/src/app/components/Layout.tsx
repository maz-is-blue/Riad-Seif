import React, { useState } from 'react';
import { Menu, X, Mail, Phone, MapPin, Facebook, Linkedin, Instagram, Twitter, Globe } from 'lucide-react';
import { motion } from "motion/react";
import { Link, useLocation } from "wouter";
import logo from "../../assets/logo.png";
import logoWhite from "../../assets/logo white.png";

export default function Layout({ children, lang, setLang, content }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [location] = useLocation();

  const isRTL = lang === 'ar';
  const t = content[lang];

  const navLinks = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.founder, href: '/founder' },
    { label: t.nav.center, href: '/center' },
    { label: t.nav.forum, href: '/forum' },
    { label: t.nav.publications, href: '/publications' },
    { label: t.nav.contact, href: '/contact' }
  ];

  return (
    <div className={`min-h-screen bg-white ${t.font} text-slate-800 selection:bg-[#f7c20e] selection:text-[#1c3944]`} dir={t.direction}>
      {/* Font Injection for Arabic */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap');
        .font-cairo { font-family: 'Cairo', sans-serif; line-height: 1.8; }
      `}</style>

      {/* Main Navigation Header */}
      <header className="bg-white border-b-4 border-[#1c3944] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo Section */}
            <Link
              href="/"
              className={`flex items-center cursor-pointer ${lang === 'en' ? 'w-[320px]' : 'w-[300px]'}`}
            >
              <img
                src={logo}
                alt="Riad Seif Foundation logo"
                className="h-24 w-auto object-contain"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className={`hidden lg:flex items-center gap-10 ${lang === 'en' ? 'pl-4' : 'pr-4'}`}>
              {navLinks.map((link) => (
                <Link 
                  key={link.label}
                  href={link.href} 
                >
                  <span className={`text-[#1c3944] font-medium ${lang === 'en' ? 'text-xs' : 'text-sm'} uppercase tracking-wider whitespace-nowrap hover:text-[#f7c20e] transition-colors py-2 relative group cursor-pointer ${lang === 'ar' ? 'font-bold' : ''} ${location === link.href ? 'text-[#f7c20e]' : ''}`}>
                    {link.label}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-[#f7c20e] transition-all duration-300 ${location === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </span>
                </Link>
              ))}
              
              {/* Language Switcher */}
              <div 
                className="flex items-center gap-2 cursor-pointer hover:text-[#f7c20e] transition-colors text-xs font-semibold text-[#1c3944]"
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              >
                <Globe size={16} />
                <span className={lang === 'en' ? 'text-[#f7c20e]' : ''}>EN</span>
                <span>/</span>
                <span className={lang === 'ar' ? 'text-[#f7c20e]' : ''}>AR</span>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden text-[#1c3944] p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden bg-[#1c3944] text-white border-t border-slate-700 absolute w-full left-0 z-40"
          >
            <nav className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href}>
                   <span className="text-lg border-b border-slate-700 pb-2 block" onClick={() => setMobileMenuOpen(false)}>
                    {link.label}
                   </span>
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-700">
                <button
                  className="flex items-center gap-2 text-sm font-semibold text-white hover:text-[#f7c20e] transition-colors"
                  onClick={() => {
                    setLang(lang === 'en' ? 'ar' : 'en');
                    setMobileMenuOpen(false);
                  }}
                >
                  <Globe size={16} />
                  <span className={lang === 'en' ? 'text-[#f7c20e]' : ''}>EN</span>
                  <span>/</span>
                  <span className={lang === 'ar' ? 'text-[#f7c20e]' : ''}>AR</span>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </header>

      {/* Page Content */}
      <motion.main
        key={location}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {children}
      </motion.main>

      {/* Footer */}
      <footer className="bg-[#0f242c] text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <img
                src={logoWhite}
                alt="Riad Seif Foundation logo"
                className="h-20 w-auto object-contain mb-6"
              />
              <div className="text-sm leading-relaxed mb-6">
                {t.footer.desc}
              </div>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/share/1AGkxnrRGS/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="hover:text-white transition-colors"
                >
                  <Facebook className="cursor-pointer" size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/company/riad-seif-human-rights-foundation/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hover:text-white transition-colors"
                >
                  <Linkedin className="cursor-pointer" size={20} />
                </a>
                <a
                  href="https://www.instagram.com/rshrfndn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:text-white transition-colors"
                >
                  <Instagram className="cursor-pointer" size={20} />
                </a>
                <a
                  href="https://x.com/Rscomms130366"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="hover:text-white transition-colors"
                >
                  <Twitter className="cursor-pointer" size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className={`text-white ${t.serif} text-lg mb-6`}>{t.footer.navTitle}</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/"><span className="hover:text-[#f7c20e] transition-colors cursor-pointer">{t.nav.home}</span></Link></li>
                <li><Link href="/about"><span className="hover:text-[#f7c20e] transition-colors cursor-pointer">{t.nav.about}</span></Link></li>
                <li><Link href="/founder"><span className="hover:text-[#f7c20e] transition-colors cursor-pointer">{t.nav.founder}</span></Link></li>
                <li><Link href="/center"><span className="hover:text-[#f7c20e] transition-colors cursor-pointer">{t.nav.center}</span></Link></li>
                <li><Link href="/forum"><span className="hover:text-[#f7c20e] transition-colors cursor-pointer">{t.nav.forum}</span></Link></li>
              </ul>
            </div>

            <div>
              <h4 className={`text-white ${t.serif} text-lg mb-6`}>{t.footer.resTitle}</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/publications"><span className="hover:text-[#f7c20e] transition-colors cursor-pointer">{t.nav.publications}</span></Link></li>
                <li><a href="#" className="hover:text-[#f7c20e] transition-colors">Annual Reports</a></li>
                <li><a href="#" className="hover:text-[#f7c20e] transition-colors">Press Kit</a></li>
                <li><a href="#" className="hover:text-[#f7c20e] transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className={`text-white ${t.serif} text-lg mb-6`}>{t.footer.contactTitle}</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-[#f7c20e] shrink-0 mt-0.5" />
                  <span>{t.topBar.location}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-[#f7c20e] shrink-0" />
                  <span>+961 1 234 567</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-[#f7c20e] shrink-0" />
                  <span>info@riadseiflb.org</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-widest">
            <div>&copy; 2024 {isRTL ? 'مؤسسة رياض سيف' : 'Riad Seif Foundation'}. {t.topBar.rights}</div>
            <div className="flex gap-8">
              <button
                type="button"
                className="hover:text-white transition-colors"
                onClick={() => setTermsOpen(true)}
              >
                {t.topBar.terms}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {termsOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/60 flex items-center justify-center p-4"
          onClick={() => setTermsOpen(false)}
        >
          <div
            className="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h3 className={`text-2xl ${t.serif} text-[#1c3944]`}>{t.topBar.terms}</h3>
              <button
                type="button"
                onClick={() => setTermsOpen(false)}
                className="text-slate-500 hover:text-slate-900"
                aria-label={lang === "ar" ? "إغلاق" : "Close"}
              >
                <X size={22} />
              </button>
            </div>
            <div className="p-6 text-slate-700 leading-8 space-y-4">
              <p>
                {lang === "ar"
                  ? "باستخدامك لهذا الموقع فإنك توافق على شروط الاستخدام. هذا الملخص يوضح النقاط الأساسية، بينما تتوفر الصيغة القانونية الكاملة في صفحة الشروط."
                  : "By using this website, you agree to our Terms of Service. This popup provides a quick summary, and the full legal text is available on the Terms page."}
              </p>
              <ul className="list-disc ps-6 space-y-2 text-sm md:text-base">
                <li>
                  {lang === "ar"
                    ? "المحتوى مخصص للاستخدام المعلوماتي وغير التجاري، ما لم يتم منح موافقة خطية مسبقة."
                    : "Content is provided for informational and non-commercial use unless prior written approval is granted."}
                </li>
                <li>
                  {lang === "ar"
                    ? "يُمنع أي استخدام يسبب ضرراً للموقع أو محاولة وصول غير مصرح به."
                    : "Any harmful use of the site or unauthorized access attempts are prohibited."}
                </li>
                <li>
                  {lang === "ar"
                    ? "قد نحدّث الشروط من وقت لآخر، ويُعد استمرار الاستخدام قبولاً للإصدار الأحدث."
                    : "We may update these terms from time to time; continued use means acceptance of the latest version."}
                </li>
                <li>
                  {lang === "ar"
                    ? "قد يتضمن الموقع روابط خارجية ولا نتحمل مسؤولية محتوى أو سياسات تلك الجهات."
                    : "The site may include external links, and we are not responsible for third-party content or policies."}
                </li>
              </ul>
              <p className="text-sm text-slate-600">
                {lang === "ar"
                  ? "للتفاصيل الكاملة المتعلقة بالحقوق، المسؤولية، القانون الناظم، وآلية التواصل، اضغط على \"عرض الشروط كاملة\"."
                  : "For complete details on rights, liabilities, governing law, and contact information, select \"View full Terms\"."}
              </p>
              <p className="text-sm text-slate-500">
                {lang === "ar" ? "آخر تحديث: 4 مارس 2026" : "Last updated: March 4, 2026"}
              </p>
            </div>
            <div className="p-6 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100"
                onClick={() => setTermsOpen(false)}
              >
                {lang === "ar" ? "إغلاق" : "Close"}
              </button>
              <Link href="/terms">
                <span
                  className="px-4 py-2 rounded-lg bg-[#1c3944] text-white hover:bg-[#122c35] inline-block cursor-pointer"
                  onClick={() => setTermsOpen(false)}
                >
                  {lang === "ar" ? "عرض الشروط كاملة" : "View full Terms"}
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


