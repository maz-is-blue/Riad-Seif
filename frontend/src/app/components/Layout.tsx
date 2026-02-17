import React, { useState } from 'react';
import { Menu, X, Mail, Phone, MapPin, Facebook, Linkedin, Globe } from 'lucide-react';
import { motion } from "motion/react";
import { Link, useLocation } from "wouter";
import logo from "../../assets/logo.png";

export default function Layout({ children, lang, setLang, content }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
          <div className="flex justify-between items-center py-4">
            {/* Logo Section */}
            <Link href="/" className="flex items-center cursor-pointer">
              <img src={logo} alt="Riad Seif Foundation logo" className="h-28 w-auto object-contain" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.label}
                  href={link.href} 
                >
                  <span className={`text-[#1c3944] font-medium text-sm uppercase tracking-wider hover:text-[#f7c20e] transition-colors py-2 relative group cursor-pointer ${lang === 'ar' ? 'font-bold' : ''} ${location === link.href ? 'text-[#f7c20e]' : ''}`}>
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
              <img src={logo} alt="Riad Seif Foundation logo" className="h-24 w-auto object-contain mb-6" />
              <div className="text-sm leading-relaxed mb-6">
                {t.footer.desc}
              </div>
              <div className="flex gap-4">
                <Facebook className="hover:text-white cursor-pointer transition-colors" size={20} />
                <Linkedin className="hover:text-white cursor-pointer transition-colors" size={20} />
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
              <a href="#" className="hover:text-white transition-colors">{t.topBar.privacy}</a>
              <a href="#" className="hover:text-white transition-colors">{t.topBar.terms}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
