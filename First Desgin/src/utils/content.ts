import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Globe, ArrowRight, ArrowLeft } from 'lucide-react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export const content = {
  en: {
    direction: "ltr",
    font: "font-sans",
    serif: "font-serif",
    topBar: {
      location: "Damascus, Syria",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      rights: "All rights reserved."
    },
    nav: {
      home: "Home",
      about: "About Us",
      founder: "The Founder",
      center: "Human Rights Center",
      forum: "Dialogue Forum",
      publications: "Publications",
      contact: "Contact"
    },
    hero: {
      titleStart: "Building a Just and",
      titleEnd: "Democratic Syria",
      description: "The Riad Seif Foundation for Human Rights is a non-governmental, non-profit organization based in Damascus and active across Syria. Established by Joumana Seif, it honors the legacy of Riad Seif by advancing justice, human rights, and inclusive democratic reform.",
      btnCenter: "Human Rights Center",
      btnForum: "Dialogue Forum",
      btnPubs: "Publications"
    },
    home: {
        aboutSection: {
            title: "About the Foundation",
            text: "Our mission is to advance justice, human rights, and inclusive democratic reform by empowering civil society actors, especially women and marginalized groups, fostering public dialogue, and promoting accountability.",
            link: "Read More"
        },
        founderSection: {
            title: "About Riad Seif",
            text: "Riad Seif is remembered as one of Syria’s most courageous voices for freedom. From the Damascus Spring to the Syrian opposition, his life story marked by sacrifice and vision continues to inspire Syrians striving for dignity.",
            link: "Full Biography"
        },
        newsSection: {
            title: "Latest Updates",
            subtitle: "Recent activities and featured publications"
        }
    },
    about: {
      title: "About the Foundation",
      whoWeAre: {
          title: "Who We Are",
          text: "The Riad Seif Foundation for Human Rights is a non-governmental, non-profit organization registered in Syria, headquartered in Damascus, and operating across the country. Named in honor of Riad Seif, the Foundation transforms his personal history into a national project for justice, inclusion, and democratic renewal, led by his daughter, prominent human rights lawyer Joumana Seif."
      },
      ourStory: {
          title: "Our Story",
          text: "Born in the wake of Syria’s political transition, the Foundation emerges as a timely initiative to ensure justice, equality, and inclusion are at the heart of the country’s future. By connecting Syria’s democratic struggles of the past with today’s urgent needs, we create pathways for accountability, dialogue, and empowerment."
      },
      vision: {
          title: "Our Vision",
          text: "A just and democratic Syria where all individuals, especially women and marginalized communities, can shape public life and lead sustainable peace, development, and inclusive empowerment."
      },
      mission: {
          title: "Our Mission",
          text: "To advance justice, human rights, and inclusive democratic reform in Syria by empowering local civil society actors and human rights defenders, primarily women, while fostering public dialogue and building a civic and legal culture rooted in Syrian realities and values."
      },
      approach: {
          title: "Our Approach",
          pillars: [
              { title: "Gender Justice & Legal Empowerment", desc: "Strengthening women and marginalized groups; providing legal support, psychosocial assistance, and empowerment tools." },
              { title: "Justice Pathways & Accountability", desc: "Supporting survivors through legal aid and documentation; building foundations for future accountability mechanisms." },
              { title: "Democratic Dialogue & Civic Participation", desc: "Reviving Syria’s tradition of civic forums; promoting debate, reconciliation, youth engagement, and civic education." },
              { title: "Research, Policy & Knowledge Production", desc: "Producing Arabic-language research and legal analysis; strengthening evidence-based policymaking." }
          ]
      }
    },
    founder: {
      title: "About Riad Seif",
      sections: [
          {
              title: "Early Life & Business Beginnings",
              text: "Riad Seif (born 25 November 1946 in Damascus) shifted from natural sciences to entrepreneurship, founding a shirt manufacturing workshop in 1963. In 1993, he acquired the Adidas franchise in Syria, becoming a successful industrialist serving local and European markets."
          },
          {
              title: "Entry into Politics & Reform",
              text: "Elected to parliament in 1994 and 1998 as an independent, Seif challenged the status quo. He published controversial studies exposing corruption and calling for an independent judiciary, notably challenging monopolies held by powerful regime figures, which led to heavy state retaliation against his business."
          },
          {
              title: "Damascus Spring & National Dialogue",
              text: "A central figure of the 2000 Damascus Spring, Seif founded the Forum for National Dialogue, hosting weekly meetings for intellectuals and citizens to discuss freedom and rights. In 2001, after calling for political alternatives, he was stripped of immunity and imprisoned for five years."
          },
          {
              title: "Opposition Leadership & Exile",
              text: "Seif was a key signatory of the 2005 Damascus Declaration. Despite ongoing harassment, arrests, and travel bans, he returned to leadership during the 2011 uprising. Injured by security forces, he left for treatment in Germany in 2012, continuing his work from exile."
          },
          {
              title: "Role in Opposition & Legacy",
              text: "In 2012, he proposed the 'Riad Seif Plan' to unify the opposition, contributing to the formation of the National Coalition. having spent over eight years in prison, Seif remains a symbol of principled dissent and civic courage, inspiring those seeking justice and reform."
          }
      ]
    },
    center: {
      title: "Human Rights Center",
      intro: {
          title: "Building Skills for Justice & Inclusion",
          text: "The Human Rights Center is the capacity-building hub of the Foundation. We invest in young lawyers and defenders to engage in transitional justice. Through training, mentoring, and networking, we equip a new generation of leaders."
      },
      curriculum: {
          title: "Human Rights Training Curriculum",
          text: "Tailored to the Syrian context, covering human rights law, women’s rights frameworks, transitional justice pillars (truth, justice, reparations, non-recurrence), and advocacy methodologies."
      },
      training: {
          title: "Training Programs",
          text: "Sessions combining academic knowledge with practical tools, led by senior legal advisors and experts. Focus involves international standards, civil society roles, and participation of women and marginalized groups."
      },
      mentoring: {
          title: "Strategic Mentoring",
          text: "Providing strategic advice and peer support to help participants put theory into practice and grow a sustainable network of trainers inside Syria."
      },
      networking: {
          title: "Networking & Collaboration",
          text: "Connecting lawyers with civil society groups and survivor initiatives to ensure work is grounded in a survivor-centered perspective."
      }
    },
    forum: {
      title: "Forum for National Dialogue",
      history: {
          title: "History & Origins",
          text: "Tied to the Damascus Spring (2000–2001), Riad Seif’s original Forum hosted weekly debates on reform and freedom. Though shut down in 2001, it remained a symbol of democratic aspiration. Today, we relaunch this legacy to meet current urgent needs."
      },
      activities: {
          title: "Current Activities",
          text: "Monthly sessions convening diverse voices—activists, leaders, citizens—to discuss justice, governance, and inclusion. The goal is to encourage open debate and rebuild trust among Syrians."
      },
      events: {
          title: "Upcoming Events",
          text: "Regular monthly gatherings addressing key transition themes. Specific event details will be announced here."
      }
    },
    publications: {
      title: "Publications",
      approach: {
          title: "Our Approach to Knowledge",
          text: "Producing practical, accessible knowledge rooted in Syrian realities. Our Arabic-language resources aim to make transitional justice concepts understandable for civil society. We highlight women’s perspectives and regional experiences."
      },
      access: {
          title: "Access Our Work",
          text: "Browse our growing repository of reports, policy briefs, and legal resources below."
      },
      latest: {
          subtitle: "Recent activities and featured publications",
          viewAll: "View Archive",
          readMore: "Read More",
      },
      items: [
        { cat: "Report", title: "Transitional Justice Mechanisms in Post-Conflict Syria", date: "Dec 2024", desc: "A comprehensive analysis of legal frameworks required for accountability." },
        { cat: "Policy Brief", title: "Women's Role in Constitutional Reform", date: "Nov 2024", desc: "Examining the importance of women's participation in drafting the new constitution." },
        { cat: "Manual", title: "Legal Advocacy Toolkit for Practitioners", date: "Oct 2024", desc: "Practical guide for lawyers working on human rights cases." }
      ]
    },
    contact: {
      title: "Contact Us",
      form: {
          name: "Name",
          email: "Email",
          message: "Message",
          send: "Send Message"
      },
      info: {
          address: "Address",
          phone: "Phone",
          email: "Email"
      }
    },
    footer: {
      desc: "Dedicated to the memory and values of the Damascus Spring, working towards a free and democratic Syria for all its citizens.",
      navTitle: "Navigation",
      resTitle: "Resources",
      contactTitle: "Contact"
    }
  },
  ar: {
    direction: "rtl",
    font: "font-amiri",
    serif: "font-amiri",
    topBar: {
      location: "دمشق، سوريا",
      privacy: "سياسة الخصوصية",
      terms: "شروط الاستخدام",
      rights: "جميع الحقوق محفوظة."
    },
    nav: {
      home: "الرئيسية",
      about: "عن المؤسسة",
      founder: "المؤسس",
      center: "مركز حقوق الإنسان",
      forum: "منتدى الحوار",
      publications: "الإصدارات",
      contact: "اتصل بنا"
    },
    hero: {
      titleStart: "بناء سوريا عادلة و",
      titleEnd: "ديمقراطية",
      description: "مؤسسة رياض سيف لحقوق الإنسان هي منظمة غير حكومية وغير ربحية مقرها دمشق وتنشط في جميع أنحاء سوريا. تأسست المؤسسة لتكريم إرث رياض سيف من خلال تعزيز العدالة وحقوق الإنسان والإصلاح الديمقراطي الشامل.",
      btnCenter: "مركز حقوق الإنسان",
      btnForum: "منتدى الحوار",
      btnPubs: "الإصدارات"
    },
    home: {
        aboutSection: {
            title: "عن المؤسسة",
            text: "رسالتنا هي تعزيز العدالة وحقوق الإنسان والإصلاح الديمقراطي الشامل من خلال تمكين فاعلي المجتمع المدني، وخاصة النساء والفئات المهمشة، وتعزيز الحوار العام والمساءلة.",
            link: "اقرأ المزيد"
        },
        founderSection: {
            title: "عن رياض سيف",
            text: "يُذكر رياض سيف كأحد أكثر الأصوات شجاعة في سوريا من أجل الحرية. من ربيع دمشق إلى المعارضة السورية، تستمر قصة حياته المليئة بالتضحية والرؤية في إلهام السوريين الساعين للكرامة.",
            link: "السيرة الذاتية الكاملة"
        },
        newsSection: {
            title: "أحدث الأخبار",
            subtitle: "الأنشطة الأخيرة والإصدارات المميزة"
        }
    },
    about: {
      title: "عن المؤسسة",
      whoWeAre: {
          title: "من نحن",
          text: "مؤسسة رياض سيف لحقوق الإنسان هي منظمة غير حكومية وغير ربحية مسجلة في سوريا، مقرها دمشق، وتعمل في جميع أنحاء البلاد. سُميت تكريماً لرياض سيف، وتعمل المؤسسة بقيادة ابنته المحامية جمانة سيف على تحويل تاريخه الشخصي إلى مشروع وطني للعدالة والشمول والتجديد الديمقراطي."
      },
      ourStory: {
          title: "قصتنا",
          text: "ولدت المؤسسة في أعقاب التحول السياسي في سوريا كمبادرة لضمان أن تكون العدالة والمساواة والشمول في قلب مستقبل البلاد. من خلال ربط نضالات الماضي بالاحتياجات الحالية، نخلق مسارات للمساءلة والحوار والتمكين."
      },
      vision: {
          title: "رؤيتنا",
          text: "سوريا عادلة وديمقراطية حيث يمكن لجميع الأفراد، وخاصة النساء والمجتمعات المهمشة، تشكيل الحياة العامة وقيادة السلام المستدام والتنمية والتمكين الشامل."
      },
      mission: {
          title: "رسالتنا",
          text: "تعزيز العدالة وحقوق الإنسان والإصلاح الديمقراطي الشامل في سوريا من خلال تمكين فاعلي المجتمع المدني والمدافعين عن حقوق الإنسان، وخاصة النساء، مع تعزيز الحوار العام وبناء ثقافة مدنية وقانونية متجذرة في القيم السورية."
      },
      approach: {
          title: "نهجنا",
          pillars: [
              { title: "العدالة الجندرية والتمكين القانوني", desc: "تعزيز دور النساء والفئات المهمشة؛ توفير الدعم القانوني والنفسي وأدوات التمكين." },
              { title: "مسارات العدالة والمساءلة", desc: "دعم الناجين من خلال المساعدة القانونية والتوثيق؛ بناء الأسس لآليات المساءلة المستقبلية." },
              { title: "الحوار الديمقراطي والمشاركة المدنية", desc: "إحياء تقليد المنتديات المدنية عبر إعادة فتح منتدى الحوار الوطني؛ تعزيز النقاش والمصالحة والتعليم المدني." },
              { title: "الأبحاث والسياسات وإنتاج المعرفة", desc: "إنتاج أبحاث وتحليلات قانونية باللغة العربية؛ تعزيز صنع السياسات القائمة على الأدلة." }
          ]
      }
    },
    founder: {
      title: "عن رياض سيف",
      sections: [
          {
              title: "النشأة والبدايات التجارية",
              text: "ولد رياض سيف في 25 تشرين الثاني 1946 في دمشق. تحول من العلوم الطبيعية إلى ريادة الأعمال، حيث أسس ورشة لصناعة القمصان عام 1963. في عام 1993، حصل على وكالة أديداس في سوريا، ليصبح صناعياً ناجحاً يخدم الأسواق المحلية والأوروبية."
          },
          {
              title: "دخول السياسة والإصلاح",
              text: "انتخب للبرلمان عامي 1994 و1998 كمستقل، وتحدى الوضع الراهن. نشر دراسات مثيرة للجدل تفضح الفساد وتدعو لقضاء مستقل، وتحدى بشكل خاص الاحتكارات التي تملكها شخصيات نافذة، مما أدى إلى انتقام الدولة من أعماله التجارية."
          },
          {
              title: "ربيع دمشق والحوار الوطني",
              text: "كان شخصية محورية في ربيع دمشق عام 2000، حيث أسس منتدى الحوار الوطني، واستضاف اجتماعات أسبوعية للمثقفين والمواطنين لمناقشة الحرية والحقوق. في عام 2001، وبعد دعوته لبدائل سياسية، جُرد من الحصانة وسجن لمدة خمس سنوات."
          },
          {
              title: "قيادة المعارضة والنفي",
              text: "كان سيف من الموقعين الرئيسيين على إعلان دمشق عام 2005. رغم المضايقات والاعتقالات المستمرة، عاد للقيادة خلال انتفاضة 2011. أصيب على يد قوات الأمن، وغادر للعلاج في ألمانيا عام 2012، متابعاً عمله من المنفى."
          },
          {
              title: "دوره في المعارضة وإرثه",
              text: "في عام 2012، اقترح 'مبادرة رياض سيف' لتوحيد المعارضة، مما ساهم في تشكيل الائتلاف الوطني. بعد قضائه أكثر من ثماني سنوات في السجن، يظل سيف رمزاً للمعارضة المبدئية والشجاعة المدنية، ملهماً للساعين نحو العدالة والإصلاح."
          }
      ]
    },
    center: {
      title: "مركز حقوق الإنسان",
      intro: {
          title: "بناء القدرات من أجل العدالة والشمول",
          text: "مركز حقوق الإنسان هو مركز بناء القدرات في المؤسسة. نستثمر في المحامين والمدافعين الشباب للانخراط في العدالة الانتقالية. من خلال التدريب والتوجيه والتشبيك، نعد جيلاً جديداً من القادة."
      },
      curriculum: {
          title: "مناهج التدريب على حقوق الإنسان",
          text: "مصممة للسياق السوري، تغطي قانون حقوق الإنسان، أطر حقوق المرأة، ركائز العدالة الانتقالية (الحقيقة، العدالة، جبر الضرر، عدم التكرار)، ومنهجيات المناصرة."
      },
      training: {
          title: "برامج التدريب",
          text: "جلسات تجمع بين المعرفة الأكاديمية والأدوات العملية، يقودها مستشارون قانونيون وخبراء. يركز العمل على المعايير الدولية، دور المجتمع المدني، ومشاركة النساء والفئات المهمشة."
      },
      mentoring: {
          title: "التوجيه الاستراتيجي",
          text: "توفير المشورة الاستراتيجية ودعم الأقران لمساعدة المشاركين على وضع النظرية موضع التنفيذ وتنمية شبكة مستدامة من المدربين داخل سوريا."
      },
      networking: {
          title: "التشبيك والتعاون",
          text: "ربط المحامين بمجموعات المجتمع المدني ومبادرات الناجين لضمان أن العمل يرتكز على منظور يركز على الناجين."
      }
    },
    forum: {
      title: "منتدى الحوار الوطني",
      history: {
          title: "التاريخ والنشأة",
          text: "ارتبط منتدى رياض سيف الأصلي بربيع دمشق (2000-2001)، حيث استضاف نقاشات أسبوعية حول الإصلاح والحرية. رغم إغلاقه عام 2001، ظل رمزاً للتطلعات الديمقراطية. اليوم، نعيد إطلاق هذا الإرث لتلبية الاحتياجات العاجلة الحالية."
      },
      activities: {
          title: "الأنشطة الحالية",
          text: "جلسات شهرية تجمع أصواتاً متنوعة - نشطاء، قادة، مواطنين - لمناقشة العدالة والحوكمة والشمول. الهدف هو تشجيع النقاش المفتوح وإعادة بناء الثقة بين السوريين."
      },
      events: {
          title: "الفعاليات القادمة",
          text: "تجمعات شهرية منتظمة تتناول مواضيع الانتقال الرئيسية. سيتم الإعلان عن تفاصيل الفعاليات المحددة هنا."
      }
    },
    publications: {
      title: "الإصدارات",
      approach: {
          title: "نهجنا في المعرفة",
          text: "إنتاج معرفة عملية وسهلة الوصول متجذرة في الواقع السوري. تهدف مواردنا باللغة العربية إلى جعل مفاهيم العدالة الانتقالية مفهومة للمجتمع المدني، مع تسليط الضوء على وجهات نظر النساء والتجارب الإقليمية."
      },
      access: {
          title: "تصفح أعمالنا",
          text: "تصفح مستودعنا المتنامي من التقارير، أوراق السياسات، والموارد القانونية أدناه."
      },
      latest: {
          subtitle: "الأنشطة الأخيرة والإصدارات المميزة",
          viewAll: "عرض الأرشيف",
          readMore: "اقرأ المزيد",
      },
      items: [
        { cat: "تقرير", title: "آليات العدالة الانتقالية في سوريا ما بعد النزاع", date: "ديسمبر 2024", desc: "تحليل شامل للأطر القانونية المطلوبة للمساءلة." },
        { cat: "ورقة سياسات", title: "دور المرأة في الإصلاح الدستوري", date: "نوفمبر 2024", desc: "دراسة أهمية مشاركة المرأة في صياغة الدستور الجديد." },
        { cat: "دليل", title: "مجموعة أدوات المناصرة القانونية للممارسين", date: "أكتوبر 2024", desc: "دليل عملي للمحامين العاملين في قضايا حقوق الإنسان." }
      ]
    },
    contact: {
      title: "اتصل بنا",
      form: {
          name: "الاسم",
          email: "البريد الإلكتروني",
          message: "الرسالة",
          send: "إرسال الرسالة"
      },
      info: {
          address: "العنوان",
          phone: "الهاتف",
          email: "البريد الإلكتروني"
      }
    },
    footer: {
      desc: "مكرسة لذكرى وقيم ربيع دمشق، وتعمل نحو سوريا حرة وديمقراطية لجميع مواطنيها.",
      navTitle: "روابط سريعة",
      resTitle: "الموارد",
      contactTitle: "اتصل بنا"
    }
  }
};
