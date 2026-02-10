import { StarIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const TestimonialsSection = () => {
    const { t } = useTranslation();

    return (
        // تم تغيير w-screen إلى w-full وإزالة h-screen للديسكتوب لضمان استيعاب المحتوى
        <section className="w-full min-h-screen py-12 md:py-24 px-4 sm:px-6 md:px-12 bg-white dark:bg-stone transition-colors duration-500 flex flex-col justify-center items-center">
            {/* العنوان - ضبطنا الهوامش وحجم الخط ليكون متناسقاً */}
            <div className="max-w-4xl text-center mb-10 md:mb-16">
                <h2 className="text-3xl  md:text-3xl lg:text-4xl font-black text-stone dark:text-off-white mb-6 leading-tight">
                    {t("home.testimonials.title.main")} <span className="text-deep-pink">{t("home.testimonials.title.highlight")}</span>
                </h2>
                <p className="text-stone/70 dark:text-off-white/70 text-base md:text-xl max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3">
                    {t("home.testimonials.description")}

                    <a
                        href="https://www.facebook.com/future.researchers.school/reviews"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-bold text-deep-pink border-2 border-deep-pink/20 rounded-full transition-all duration-300 hover:bg-deep-pink hover:text-white hover:border-deep-pink hover:shadow-lg hover:shadow-deep-pink/30 active:scale-95"
                    >
                        <span>{t("home.testimonials.seeAlso") || "See more reviews"}</span>
                    </a>
                </p>
            </div>

            {/* شبكة الكروت - تحسين الـ Grid لتوزيع أفضل */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl w-full">
                {[1, 2, 3].map(num => (
                    <div
                        key={num}
                        className="bg-off-white dark:bg-night-sakura rounded-4xl p-8 shadow-sm border border-black/5 dark:border-white/5 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group"
                    >
                        {/* النجوم */}
                        <div className="flex items-center mb-6">
                            {[...Array(5)].map((_, i) => (
                                <StarIcon key={i} className={`w-5 h-5 ${i === 4 ? "text-yellow-400" : "text-yellow-400"} fill-yellow-400 mr-1`} />
                            ))}
                        </div>

                        {/* النص التجريبي - flex-grow لتوحيد ارتفاع الكروت */}
                        <p className="text-stone dark:text-off-white text-base md:text-lg italic leading-relaxed mb-8 grow">
                            "{t(`home.testimonials.tx${num}`)}"
                        </p>

                        {/* معلومات الشخص */}
                        <div className="mt-auto">
                            <h3 className="font-bold text-stone dark:text-off-white text-lg md:text-xl">{t(`home.testimonials.name${num}`)}</h3>
                            <div className="w-8 h-1 bg-deep-pink mx-auto my-2 rounded-full transform origin-center transition-transform duration-300 group-hover:scale-x-150"></div>
                            <span className="text-stone/60 dark:text-off-white/50 text-sm font-medium uppercase tracking-wider">
                                {t(`home.testimonials.role${num}`)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TestimonialsSection;
