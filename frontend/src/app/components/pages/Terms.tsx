import React from "react";

export default function Terms({ lang, content }) {
  const t = content[lang];

  const sections =
    lang === "ar"
      ? [
          {
            title: "قبول الشروط",
            paragraphs: [
              "باستخدام هذا الموقع، فإنك تقر بأنك قرأت شروط الاستخدام هذه وفهمتها وتوافق على الالتزام بها.",
              "إذا كنت لا توافق على أي جزء من هذه الشروط، يجب عليك التوقف عن استخدام الموقع فوراً.",
            ],
          },
          {
            title: "الغرض من الموقع",
            paragraphs: [
              "يقدم الموقع محتوى حقوقي وتوعوي وإعلامي متعلق بعمل المؤسسة وبرامجها.",
              "لا يشكل أي محتوى على الموقع استشارة قانونية فردية أو تمثيلاً قانونياً مباشراً.",
            ],
          },
          {
            title: "الاستخدام المسموح والممنوع",
            paragraphs: [
              "يُسمح باستخدام الموقع للأغراض الشخصية أو البحثية أو الإعلامية المشروعة فقط.",
              "يُمنع إساءة استخدام الموقع، أو محاولة اختراقه، أو نشر برمجيات ضارة، أو جمع بيانات المستخدمين دون تفويض.",
            ],
          },
          {
            title: "الملكية الفكرية",
            paragraphs: [
              "جميع النصوص والصور والمواد المنشورة مملوكة للمؤسسة أو مرخصة لها ما لم يذكر خلاف ذلك.",
              "لا يجوز نسخ أو إعادة نشر المحتوى لأغراض تجارية دون إذن خطي مسبق.",
            ],
          },
          {
            title: "الروابط الخارجية وخدمات الغير",
            paragraphs: [
              "قد يتضمن الموقع روابط لمواقع خارجية لغايات مرجعية.",
              "لا تتحمل المؤسسة مسؤولية محتوى أو ممارسات الخصوصية أو دقة المعلومات في تلك المواقع.",
            ],
          },
          {
            title: "إخلاء المسؤولية",
            paragraphs: [
              "نسعى لتقديم معلومات دقيقة ومحدثة، لكننا لا نضمن خلو الموقع من الأخطاء أو الانقطاعات التقنية.",
              "يتم استخدام الموقع على مسؤوليتك الخاصة، وتُقدَّم الخدمات والمحتوى كما هي.",
            ],
          },
          {
            title: "حدود المسؤولية",
            paragraphs: [
              "إلى أقصى حد يسمح به القانون، لا تتحمل المؤسسة أي مسؤولية عن أي خسائر مباشرة أو غير مباشرة ناتجة عن استخدام الموقع أو عدم القدرة على استخدامه.",
            ],
          },
          {
            title: "التعديلات والإنهاء",
            paragraphs: [
              "يجوز لنا تعديل هذه الشروط في أي وقت، ويصبح التعديل نافذاً فور نشره على هذه الصفحة.",
              "يجوز للمؤسسة تقييد أو تعليق الوصول إلى الموقع في حال وجود إساءة استخدام أو متطلبات تشغيلية.",
            ],
          },
          {
            title: "القانون الناظم والتواصل",
            paragraphs: [
              "تخضع هذه الشروط للقوانين الواجبة التطبيق وفق إطار عمل المؤسسة القانوني.",
              "لأي استفسار بخصوص شروط الاستخدام، يرجى التواصل عبر القنوات الرسمية المنشورة في صفحة التواصل.",
            ],
          },
        ]
      : [
          {
            title: "Acceptance of Terms",
            paragraphs: [
              "By accessing or using this website, you confirm that you have read, understood, and agreed to these Terms of Service.",
              "If you do not agree with any part of these terms, you must stop using the website immediately.",
            ],
          },
          {
            title: "Purpose of the Website",
            paragraphs: [
              "This website provides human-rights related informational, advocacy, and institutional content about the foundation and its programs.",
              "Content on this website is for general information and does not constitute individual legal advice or legal representation.",
            ],
          },
          {
            title: "Permitted and Prohibited Use",
            paragraphs: [
              "You may use the website for lawful personal, educational, research, or media purposes.",
              "You must not misuse the website, attempt unauthorized access, upload malicious code, or harvest user data without authorization.",
            ],
          },
          {
            title: "Intellectual Property",
            paragraphs: [
              "Unless otherwise stated, all website content, including text, images, and design elements, is owned by or licensed to the foundation.",
              "Commercial reproduction, redistribution, or republication of content requires prior written permission.",
            ],
          },
          {
            title: "Third-Party Links and Services",
            paragraphs: [
              "The website may include links to external websites for reference and convenience.",
              "We are not responsible for the content, availability, accuracy, or privacy practices of third-party websites.",
            ],
          },
          {
            title: "Disclaimer of Warranties",
            paragraphs: [
              "We work to keep website information accurate and current, but we do not guarantee uninterrupted operation or error-free content.",
              "The website and its content are provided on an \"as is\" and \"as available\" basis.",
            ],
          },
          {
            title: "Limitation of Liability",
            paragraphs: [
              "To the maximum extent permitted by law, the foundation is not liable for direct, indirect, incidental, consequential, or special damages arising from use of, or inability to use, this website.",
            ],
          },
          {
            title: "Changes and Termination",
            paragraphs: [
              "We may revise these terms at any time by posting an updated version on this page.",
              "We may suspend or restrict access to the website where misuse is detected or for operational, legal, or security reasons.",
            ],
          },
          {
            title: "Governing Law and Contact",
            paragraphs: [
              "These terms are governed by the applicable legal framework under which the foundation operates.",
              "For questions regarding these terms, contact us through the official channels listed on the Contact page.",
            ],
          },
        ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <h1 className={`text-4xl lg:text-5xl ${t.serif} text-[#1c3944] mb-6`}>
          {t.topBar.terms}
        </h1>
        <p className="text-slate-600 mb-10">
          {lang === "ar" ? "آخر تحديث: 4 مارس 2026" : "Last updated: March 4, 2026"}
        </p>

        <div className="space-y-8">
          {sections.map((section) => (
            <article key={section.title} className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className={`text-2xl ${t.serif} text-[#1c3944] mb-3`}>{section.title}</h2>
              <div className="space-y-3 text-slate-700 leading-8">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
