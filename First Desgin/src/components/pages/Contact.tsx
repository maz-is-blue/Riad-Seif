import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact({ lang, content }) {
  const t = content[lang];
  const isRTL = lang === 'ar';

  return (
    <div className="py-20 lg:py-32 bg-slate-50 min-h-screen">
       <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h1 className={`text-4xl lg:text-5xl ${t.serif} text-[#1c3944] mb-12 text-center`}>{t.nav.contact}</h1>
          
          <div className="grid md:grid-cols-2 gap-12 bg-white p-8 lg:p-12 shadow-sm rounded-lg">
             <div>
                <h3 className={`text-2xl text-[#1c3944] mb-6 ${t.serif}`}>{lang === 'ar' ? 'معلومات التواصل' : 'Contact Information'}</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <MapPin size={24} className="text-[#f7c20e] shrink-0 mt-1" />
                    <div>
                       <span className="font-bold block text-[#1c3944]">{lang === 'ar' ? 'العنوان' : 'Address'}</span>
                       <span className="text-slate-600">{lang === 'ar' ? '١٢٣ شارع دمشق، بيروت، لبنان' : '123 Rue de Damas, Beirut, Lebanon'}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Phone size={24} className="text-[#f7c20e] shrink-0 mt-1" />
                     <div>
                       <span className="font-bold block text-[#1c3944]">{lang === 'ar' ? 'الهاتف' : 'Phone'}</span>
                       <span className="text-slate-600" dir="ltr">+961 1 234 567</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Mail size={24} className="text-[#f7c20e] shrink-0 mt-1" />
                     <div>
                       <span className="font-bold block text-[#1c3944]">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</span>
                       <span className="text-slate-600">info@riadseiflb.org</span>
                    </div>
                  </li>
                </ul>
             </div>
             
             <div>
                <h3 className={`text-2xl text-[#1c3944] mb-6 ${t.serif}`}>{lang === 'ar' ? 'أرسل لنا رسالة' : 'Send us a message'}</h3>
                <form className="space-y-4">
                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">{lang === 'ar' ? 'الاسم' : 'Name'}</label>
                      <input type="text" className="w-full border border-slate-300 p-2 rounded focus:outline-none focus:border-[#1c3944]" />
                   </div>
                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
                      <input type="email" className="w-full border border-slate-300 p-2 rounded focus:outline-none focus:border-[#1c3944]" />
                   </div>
                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">{lang === 'ar' ? 'الرسالة' : 'Message'}</label>
                      <textarea rows={4} className="w-full border border-slate-300 p-2 rounded focus:outline-none focus:border-[#1c3944]"></textarea>
                   </div>
                   <button type="button" className="bg-[#1c3944] text-white px-6 py-2 rounded hover:bg-[#2c1d5f] transition-colors font-bold w-full">
                      {lang === 'ar' ? 'إرسال' : 'Send'}
                   </button>
                </form>
             </div>
          </div>
       </div>
    </div>
  );
}
