import { BookOpenIcon, UsersIcon, GraduationCapIcon, StarIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const WhyUsSection = () => {
    const { t } = useTranslation();

    return (
        // استخدمنا w-full بدلاً من w-screen لتجنب مشاكل الهوامش الجانبية
        <section className="w-full min-h-screen py-10 px-6 md:px-12 bg-off-white dark:bg-night-sakura transition-colors duration-500 flex flex-col justify-center items-center">
            {/* العنوان */}
            <div className="max-w-4xl mx-auto text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-black text-stone dark:text-off-white mb-4">
                    {t("home.whyUs.title.main")} <span className="text-deep-pink">{t("home.whyUs.title.highlight")}</span>
                </h2>
                <p className="text-stone/70 dark:text-off-white/70 text-base md:text-xl">{t("home.whyUs.description")}</p>
            </div>

            {/* Stats Cards */}
            {/* جعلنا الـ gap أصغر في الموبايل لتقليل المساحات الضائعة */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-7xl mx-auto">
                {/* البطاقة 1 */}
                <div className="bg-white dark:bg-stone rounded-3xl p-6 flex flex-col items-center justify-center shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl min-h-37.5 w-full">
                    <GraduationCapIcon className="w-8 h-8 text-deep-pink mb-3" />
                    <h3 className="text-xl md:text-2xl font-bold text-stone dark:text-off-white mb-1">{t("home.whyUs.tx1")}</h3>
                    <p className="text-center text-sm md:text-base text-stone/70 dark:text-off-white/70">{t("home.whyUs.tx2")}</p>
                </div>

                {/* البطاقة 2 */}
                <div className="bg-white dark:bg-stone rounded-3xl p-6 flex flex-col items-center justify-center shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl min-h-37.5 w-full">
                    <BookOpenIcon className="w-8 h-8 text-deep-pink mb-3" />
                    <h3 className="text-xl md:text-2xl font-bold text-stone dark:text-off-white mb-1">{t("home.whyUs.tx3")}</h3>
                    <p className="text-center text-sm md:text-base text-stone/70 dark:text-off-white/70">{t("home.whyUs.tx4")}</p>
                </div>

                {/* البطاقة 3 */}
                <div className="bg-white dark:bg-stone rounded-3xl p-6 flex flex-col items-center justify-center shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl min-h-37.5 w-full">
                    <StarIcon className="w-8 h-8 text-deep-pink mb-3" />
                    <h3 className="text-xl md:text-2xl font-bold text-stone dark:text-off-white mb-1">{t("home.whyUs.tx5")}</h3>
                    <p className="text-center text-sm md:text-base text-stone/70 dark:text-off-white/70">{t("home.whyUs.tx6")}</p>
                </div>

                {/* البطاقة 4 */}
                <div className="bg-white dark:bg-stone rounded-3xl p-6 flex flex-col items-center justify-center shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl min-h-37.5 w-full">
                    <UsersIcon className="w-8 h-8 text-deep-pink mb-3" />
                    <h3 className="text-xl md:text-2xl font-bold text-stone dark:text-off-white mb-1">{t("home.whyUs.tx7")}</h3>
                    <p className="text-center text-sm md:text-base text-stone/70 dark:text-off-white/70">{t("home.whyUs.tx8")}</p>
                </div>
            </div>
        </section>
    );
};

export default WhyUsSection;
