export { allEnglishText };

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const allEnglishText = {
    nav: {
        home: { text: "home" },
        courses: { text: "courses" },
        about: { text: "our channel" },
        join: {
            text1: "Join Now",
            text2: "Activate Your Account Now",
            text3: "Dashboard",
        },
    },

    home: {
        hero: {
            span: { text: "Unlock your potential" },
            h1: { text: "Learn japanese" },
            p: { text: "Master the language culture, and spirit of japan with expert instructors." },
            button: { text: "more details" },
        },
        whyUs: {
            title: {
                main: "Why Choose Our Platform to Learn Japanese?",
                highlight: "Start Your Journey Now",
            },
            description: "Courses designed for beginners and advanced learners, free or paid, to learn Japanese easily and effectively",
            tx1: "500+",
            tx2: "Japanese students learned with us",
            tx3: "120",
            tx4: "Free and paid courses",
            tx5: "4.9/5",
            tx6: "Student rating of our courses",
            tx7: "1000+",
            tx8: "Subscribers joined recently",
        },
        testimonials: {
            title: {
                main: "What Our Students Say",
                highlight: "Real Reviews",
            },
            description: "Reviews from students who learned Japanese with us, via free or paid courses",
            tx1: "انت هتبقى داخل تتعلم اليابانى فاكر ان الامر معقدة اوى و صعب لغاية ما تسمع شرح نورا سينسى",
            name1: "Ali Sheta",
            role1: "طالب سابق",
            tx2: "بجد شرح جميل والمعلومة بتوصلها بطريقه حلوه ولو مش فاهم بتعيد اكتر من مره وبجد حد داعم لدرجه كبيره تحببك ف انك تتعلم ودايما بتتابع معانا ربي يسعدها بقدر تعبها معانا",
            name2: "Mirna mohamed",
            role2: "طالبة متقدمة",
            tx3: "لأي حد بيفكر يتعلم ياباني برشحله دكتورة نورا حقيقي، شرحها جميل وتاسكات ومتابعة علطول، في شهر بس بدأت اعرف اقرأ، وبتحمسنا دايما اننا نعرف اكتر وحقيقي بتنمي شغفك للغة، بالتوفيق دائما يا دكتورة ",
            name3: "Nermin ashraf",
            role3: "مبتدئ",
            seeAlso: "See more reviews",
        },
        finalCTA: {
            title: {
                main: "Get Started Now",
                highlight: "with Our Japanese Platform",
            },
            description: "Join thousands of students who learned Japanese with us, via free or paid courses, and start your journey today!",
            cta: "Sign Up Now",
        },
    },

    features: {
        title: {
            main: "Master Japanese",
            highlight: "Effortlessly",
        },
        description: "Smart learning options tailored to your academic and professional ambitions.",
        cards: {
            instructors: {
                tag: "Expert Faculty",
                title: "International Experience",
                desc: "Certified professors, master pronunciation",
            },
            books: {
                title: "Exclusive Materials",
                desc: "Simplified Kanji & grammar, books included with every course",
                cta: "Browse Library",
            },
            pricing: {
                title: "Fair Pricing",
                desc: "Flexible plans for every budget.",
            },
            community: {
                title: "Our Community",
                desc: "Daily live interaction.",
            },
        },
    },
    footer: {
        brand: "Our Japanese Platform",
        description: "Learn Japanese with top experts, free and paid courses for all levels.",
        links: {
            title: "Quick Links",
            courses: "Courses",
            about: "About",
        },
        social: {
            title: "Contact Us",
        },
        copyright: "All rights reserved",
    },

    register: {
        h1: { text: "Start Your Journey With Us Today" },
        p: { text: "Learn Japanese the smart way—with lessons that feel real, useful, and fun." },
        nameLabel: { text: "Full Name", input: "Enter your name" },
        phoneLabel: { text: "Phone Number", input: "Enter your phone number" },
        emailLabel: { text: "Email Address", input: "Enter your email address" },
        passLabel: { text: "Password", input: "Enter your password" },
        checkBox: { text: "Remember me" },
        regBtn: { text: "Register" },
        loading: { text: "Loading" },
        span: { text: "Already have an account?" },
        link: { text: "Log in" },
        validation: {
            name: "Full name must be at least 3 characters",
            phone: "Invalid phone number format",
            password: "password must be at least 6 characters",
        },
        failed: { text: "Somthing went wrong. Please try again" },
        success: { text: "Your account has been created" },
    },
    login: {
        h1: { text: "welcome back" },
        success: { text: "Log in successfully" },
        logBtn: { text: "Log in" },
        span: { text: "New here? Create an account" },
        link: { text: "Register" },
    },
    otp: {
        h2: { text: "Enter the verification code sent to your email" },
        btn: { text: "Verify" },
        sended: { text: "otp has sended" },
        success: { text: "activated the account successfully" },
        failed: { text: "Verification failed. Please try again" },
        warning: { text: " second Before requesting a new code" },
        info: { text: "If you didn't receive the code, wait 2 minutes and then reload the page" },
    },
    dashOutline: {
        welcome: { text: "welcome " },
        profile: { text: "profile" },
    },
    dashboard: {
        card1: { text: "courses" },
        card2: { text: "user management" },
        card3: { text: "courses management" },
    },
    courses: {
        loading: { text: "loading" },
        success: { text: "success" },
        fail: { text: "somthing went wrong" },
        noCourses: { text: "there is no Courses available" },
        soon: { text: "Soon" },
        start: { text: "Start now" },
        book: { text1: "View Book", text2: "Download Book" },
        price: {
            free: "free",
            buy: "Buy Now",
            coin: "EGP",
            purchased: "Purchased",
        },
    },
    management: {
        courses: { text: "Courses" },
        delete: { text: "block" },
        unblock: { text: "unblock" },
        edit: { text: "Edit" },
        status: { text1: "Active", text2: "Inactive" },
        cancel: { text: "Cancel" },
        available: { text: "Current Courses" },
        noCourses: { text: "No current enrollments" },
        add: { text: "Add New Course" },
        save: { text: "Save Changes" },
        header: { text: "Manage Courses:" },
        noUsers: { text: "No users found at the moment" },
        search: { text: "search" },
    },
    courseM: {
        add: { text: "Add New YouTube Course" },
        settings: { text: "Courses Settings" },
        url: { text: "Playlist Id" },
        price: { text: "Price" },
        order: { text: "Order" },
        active: { text: "Course Active" },
        now: { text: "Add Course Now" },
        file: { text: "Add Course Book" },
    },
};
const allArabicText = {
    nav: {
        home: { text: "الرئيسية" },
        courses: { text: "الكورسات" },
        about: { text: "قناتنا" },
        join: {
            text1: "اشترك الآن",
            text2: "فعّل حسابك الآن",
            text3: "لوحة التحكم",
        },
    },
    home: {
        hero: {
            span: { text: "أطلق العنان لإمكانياتك" },
            h1: { text: "تعلم اليابانية" },
            p: { text: "أتقن لغة وثقافة وروح اليابان مع مدربين خبراء." },
            button: { text: "المزيد من التفاصيل" },
        },
        whyUs: {
            title: {
                main: "ليه تختار منصتنا لتعلم الياباني؟",
                highlight: "ابدأ رحلتك الآن",
            },
            description: "كورسات مصممة للمبتدئين والمتقدمين، مجانًا أو مدفوعة، لتعلم اليابانية بسهولة وفعالية",
            tx1: "500+",
            tx2: "طلاب يابانيين متعلموا معنا",
            tx3: "120",
            tx4: "كورسات مجانية ومدفوعة",
            tx5: "4.9/5",
            tx6: "تقييم الطلاب لكورساتنا",
            tx7: "1000+",
            tx8: "مشتركين سجلوا مؤخرًا",
        },
        testimonials: {
            title: {
                main: "ماذا يقول طلابنا؟",
                highlight: "آراء حقيقية",
            },
            description: "آراء الطلاب الذين تعلموا معنا اليابانية عبر منصتنا، سواء كورسات مجانية أو مدفوعة",
            tx1: "انت هتبقى داخل تتعلم اليابانى فاكر ان الامر معقدة اوى و صعب لغاية ما تسمع شرح نورا سينسى",
            name1: "Ali Sheta",
            role1: "طالب سابق",
            tx2: "بجد شرح جميل والمعلومة بتوصلها بطريقه حلوه ولو مش فاهم بتعيد اكتر من مره وبجد حد داعم لدرجه كبيره تحببك ف انك تتعلم ودايما بتتابع معانا ربي يسعدها بقدر تعبها معانا",
            name2: "Mirna mohamed",
            role2: "طالبة متقدمة",
            tx3: "لأي حد بيفكر يتعلم ياباني برشحله دكتورة نورا حقيقي، شرحها جميل وتاسكات ومتابعة علطول، في شهر بس بدأت اعرف اقرأ، وبتحمسنا دايما اننا نعرف اكتر وحقيقي بتنمي شغفك للغة، بالتوفيق دائما يا دكتورة ",
            name3: "Nermin ashraf",
            role3: "مبتدئ",
            seeAlso: "شاهد المزيد من الآراء",
        },
        finalCTA: {
            title: {
                main: "انطلق الآن وابدأ التعلم",
                highlight: "مع منصتنا اليابانية",
            },
            description: "انضم لآلاف الطلاب الذين تعلموا اليابانية معنا، سواء عبر كورسات مجانية أو مدفوعة، وابدأ رحلتك اليوم!",
            cta: "سجل الآن",
        },
    },
    features: {
        title: {
            main: "أتقن اللغة اليابانية",
            highlight: "بسهولة",
        },
        description: "خيارات تعلم ذكية مصممة لتلائم طموحاتك الأكاديمية والمهنية",
        cards: {
            instructors: {
                tag: "هيئة تدريس خبيرة",
                title: "خبرة دولية",
                desc: "نخبة من الأساتذة لإتقان النطق السليم",
            },
            books: {
                title: "مواد حصرية",
                desc: "مناهج مصممة لتبسيط الكانجي والقواعد، مع دفاتر عمل تُرسل إليك مباشرة",
                cta: "تصفح المكتبة",
            },
            pricing: {
                title: "أسعار عادلة",
                desc: "خطط مرنة تناسب كل الميزانيات",
            },
            community: {
                title: "مجتمعنا",
                desc: "تفاعل مباشر يوميًا",
            },
        },
    },
    footer: {
        brand: "منصتنا اليابانية",
        description: "تعلم اليابانية مع أفضل الخبراء، كورسات مجانية ومدفوعة لجميع المستويات.",
        links: {
            title: "روابط سريعة",
            courses: "الكورسات",
            about: "عن المنصة",
            contact: "تواصل معنا",
        },
        social: {
            title: "تواصل معنا",
        },
        copyright: "جميع الحقوق محفوظة",
    },
    register: {
        h1: { text: "ابدأ رحلتك معنا اليوم" },
        p: { text: "تعلم اليابانية بذكاء.. دروس واقعية، ممتعة، وتضعك على طريق الإتقان." },
        nameLabel: { text: "الاسم بالكامل", input: "ادخل اسمك بالكامل" },
        phoneLabel: { text: "رقم الهاتف", input: "ادخل رقم هاتفك" },
        passLabel: { text: "كلمة المرور", input: "ادخل الرقم السري" },
        emailLabel: { text: "البريد الالكتروني", input: "ادخل البريد الالكتروني" },

        checkBox: { text: "تذكرني" },
        regBtn: { text: "إنشاء حساب" },
        loading: { text: "جار التحميل" },

        span: { text: "لديك حساب بالفعل؟" },
        link: { text: "تسجيل الدخول" },
        validation: {
            name: "يجب أن يكون الاسم 3 أحرف على الأقل",
            phone: "صيغة رقم الهاتف غير صحيحة",
            password: "كلمة المرور غير صالحة",
        },
        failed: { text: "حدث خطأ ما، الرجاء المحاولة مرة آخري" },
        success: { text: "تم انشاء الحساب بنجاج" },
    },
    login: {
        h1: { text: "اهلا بعودتك" },
        success: { text: "تم تسجيل الدخول بنجاح" },
        logBtn: { text: "تسجيل الدخول" },
        span: { text: "مستخدم جديد؟ أنشئ حسابك الآن" },
        link: { text: "تسجيل" },
    },
    otp: {
        h2: { text: "أدخل رمز التحقق الذي تم ارسالة علي البريد الالكتروني" },
        btn: { text: "تحقق" },
        sended: { text: "تم ارسال رمز التحقق" },
        success: { text: "تم تفعيل الحساب بنجاح" },
        failed: { text: "فشل التحقق الرجاء المحاولة مرة اخري" },
        warning: { text: " ثانية قبل طلب رمز جديد" },
        info: { text: "اذا لم تستلم الرمز انتظر دقيقتين ثم اعد تحميل الصفحة" },
    },
    dashOutline: {
        welcome: { text: "مرحبا يا " },
        profile: { text: "الملف الشخصي" },
    },
    dashboard: {
        card1: { text: "الكورسات" },
        card2: { text: "ادارة المستخدمين" },
        card3: { text: "ادارة الكورسات" },
    },
    courses: {
        loading: { text: "جار التحميل" },
        success: { text: "نجاح" },
        fail: { text: "حدث خطأ" },
        noCourses: { text: "لا يوجد كورسات متاحة حاليا" },
        soon: { text: "قريبا" },
        start: { text: "ابدأ الان" },
        book: { text1: "عرض الكتاب", text2: "تحميل الكتاب" },
        price: {
            free: "مجاني",
            buy: "اشتري الان",
            coin: "ج.م",
            purchased: "تم الشراء",
        },
    },
    management: {
        courses: { text: "الكورسات" },
        delete: { text: "حظر" },
        unblock: { text: "إلغاء الحظر" },
        edit: { text: "تعديل" },
        status: { text1: "مفعل", text2: "غير مفعل" },
        cancel: { text: "إلغاء" },
        available: { text: "الكورسات الحالية" },
        noCourses: { text: "لا يوجد اشتراكات حالية" },
        add: { text: "إضافة كورس جديد" },
        save: { text: "حفظ التعديلات" },
        header: { text: "إدارة كورسات:" },
        noUsers: { text: "لا يوجد مستخدمين في الوقت الحالي" },
        search: { text: "ابحث" },
    },
    courseM: {
        add: { text: "اضف كورس يوتيوب جديد" },
        settings: { text: "إعدادات الكورسات" },
        url: { text: "معرف قائمة التشغيل" },
        price: { text: "السعر" },
        order: { text: "الترتيب" },
        active: { text: "الكورس مفعل" },
        now: { text: "اضف الكورس الان" },
        file: { text: "اضف كتاب الكورس" },
    },
};

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    ...allEnglishText,
                },
            },
            ar: {
                translation: {
                    ...allArabicText,
                },
            },
        },
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ["localStorage", "navigator"],
            caches: ["localStorage"], // التخزين تلقائي
        },
    });

export default i18n;
