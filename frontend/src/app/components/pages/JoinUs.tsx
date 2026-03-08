import React from "react";

export default function JoinUs({ lang, content }) {
  const t = content[lang];
  const isRTL = lang === "ar";

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <h1 className={`text-4xl lg:text-5xl ${t.serif} text-[#1c3944] mb-5`}>
          {isRTL ? "انضم إلينا" : "Join Us"}
        </h1>
        <p className="text-slate-600 mb-10 leading-8">
          {isRTL
            ? "املأ النموذج التالي إذا رغبت بالانضمام إلى المؤسسة أو التطوع في برامجها. سيقوم فريقنا بمراجعة الطلب والتواصل معك."
            : "Fill out this form if you would like to join the foundation or volunteer in its programs. Our team will review your request and contact you."}
        </p>

        <form
          className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 grid md:grid-cols-2 gap-5"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="md:col-span-1">
            <label className="block text-sm text-slate-700 mb-2">
              {isRTL ? "الاسم الكامل" : "Full Name"}
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1c3944]/30"
              placeholder={isRTL ? "أدخل الاسم الكامل" : "Enter your full name"}
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm text-slate-700 mb-2">
              {isRTL ? "البريد الإلكتروني" : "Email"}
            </label>
            <input
              type="email"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1c3944]/30"
              placeholder={isRTL ? "name@example.com" : "name@example.com"}
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm text-slate-700 mb-2">
              {isRTL ? "رقم الهاتف" : "Phone Number"}
            </label>
            <input
              type="tel"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1c3944]/30"
              placeholder={isRTL ? "+963 ..." : "+963 ..."}
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm text-slate-700 mb-2">
              {isRTL ? "المدينة / البلد" : "City / Country"}
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1c3944]/30"
              placeholder={isRTL ? "دمشق، سوريا" : "Damascus, Syria"}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-slate-700 mb-2">
              {isRTL ? "مجال الاهتمام" : "Area of Interest"}
            </label>
            <select className="w-full rounded-lg border border-slate-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#1c3944]/30">
              <option>{isRTL ? "اختر المجال" : "Select area"}</option>
              <option>{isRTL ? "العمل الحقوقي" : "Human Rights Work"}</option>
              <option>{isRTL ? "البحث والتوثيق" : "Research & Documentation"}</option>
              <option>{isRTL ? "الإعلام والمناصرة" : "Media & Advocacy"}</option>
              <option>{isRTL ? "الدعم الإداري" : "Administrative Support"}</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-slate-700 mb-2">
              {isRTL ? "نبذة عنك" : "Short Bio"}
            </label>
            <textarea
              rows={5}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1c3944]/30"
              placeholder={
                isRTL
                  ? "اكتب نبذة قصيرة عن خبراتك ولماذا ترغب في الانضمام."
                  : "Write a short note about your background and why you want to join."
              }
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-slate-700 mb-2">
              {isRTL ? "رابط السيرة الذاتية (اختياري)" : "CV Link (Optional)"}
            </label>
            <input
              type="url"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1c3944]/30"
              placeholder={isRTL ? "https://..." : "https://..."}
            />
          </div>

          <div className="md:col-span-2 pt-2">
            <button
              type="submit"
              className="bg-[#1c3944] text-white px-8 py-3 rounded-lg hover:bg-[#122c35] transition-colors"
            >
              {isRTL ? "إرسال الطلب" : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
