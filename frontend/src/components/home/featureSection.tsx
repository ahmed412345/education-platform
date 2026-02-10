import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BookOpen, Users, Coins, ArrowRightCircle } from "lucide-react";

// استدعاء الصور
import instructorImg from "../../assets/images/pic1.webp";
import booksImg from "../../assets/images/pic2.webp";

const Feature = () => {
    const { t } = useTranslation();

    return (
        <section className="section w-screen min-h-screen overflow-hidden py-10 px-6 md:px-12 bg-off-white dark:bg-night-sakura transition-colors duration-500 font-main flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12 shrink-0">
                    <h2 className="text-stone dark:text-petal-glow text-3xl md:text-5xl font-black leading-tight mb-3">
                        {t("features.title.main")}{" "}
                        <span className="text-deep-pink underline underline-offset-8 decoration-sakura-pink/40 italic">
                            {t("features.title.highlight")}
                        </span>
                    </h2>
                    <p className="text-stone/70 dark:text-off-white text-base md:text-xl max-w-2xl mx-auto font-medium">
                        {t("features.description")}
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-fr h-full overflow-hidden">
                    {/* Card 1: Expert Instructors */}
                    <div className="md:col-span-8 md:row-span-2 bg-black rounded-4xl p-6 md:p-10 shadow-xl border border-sakura-pink/20 flex flex-col justify-end relative overflow-hidden group transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
                        <img
                            src={instructorImg}
                            alt="Instructors"
                            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity duration-500"
                        />
                        <div className="relative z-10">
                            <h3 className="text-1xl md:text-4xl font-bold text-white mb-3">{t("features.cards.instructors.title")}</h3>
                            <p className="text-white/80 max-w-lg text-sm md:text-lg leading-relaxed font-main line-clamp-2">
                                {t("features.cards.instructors.desc")}
                            </p>
                        </div>
                    </div>

                    {/* Card 2: Exclusive Books */}
                    <div className="md:col-span-4 md:row-span-3 bg-black rounded-4xl p-5 flex flex-col justify-between relative shadow-2xl group overflow-hidden font-main transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
                        <img
                            src={booksImg}
                            alt="Books"
                            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity duration-500"
                        />
                        <div className="z-10">
                            <div className="rounded-2xl flex-col gap-2 flex">
                                <div className="flex gap-3">
                                    <BookOpen className="w-6 h-6 text-white" />
                                    <h3 className="text-1xl md:text-3xl font-black text-white">{t("features.cards.books.title")}</h3>
                                </div>
                                <p className="text-white/80 text-sm md:text-base font-medium leading-relaxed line-clamp-3">
                                    {t("features.cards.books.desc")}
                                </p>
                            </div>
                        </div>
                        <Link
                            to="/courses"
                            className="z-10 mt-6 w-full py-4 bg-white text-black text-base font-black rounded-2xl active:scale-95 transition-all shadow-lg text-center flex items-center justify-center gap-3"
                        >
                            {t("features.cards.books.cta")}
                            <ArrowRightCircle className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* Card 3: Pricing */}
                    <div className="md:col-span-4 md:row-span-1 bg-deep-pink dark:bg-deep-pink/80 rounded-4xl p-6 border border-sakura-pink/30 flex items-center gap-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
                        <div className="w-12 h-12 shrink-0 bg-white/20 rounded-2xl flex items-center justify-center shadow-sm backdrop-blur-sm">
                            <Coins className="w-6 h-6 text-white" />
                        </div>
                        <div className="overflow-hidden">
                            <h3 className="font-bold text-white text-lg md:text-xl uppercase truncate">{t("features.cards.pricing.title")}</h3>
                            <p className="text-white/70 text-sm truncate">{t("features.cards.pricing.desc")}</p>
                        </div>
                    </div>

                    {/* Card 4: Community */}
                    <div className="md:col-span-4 md:row-span-1 bg-stone dark:bg-stone/90 rounded-4xl p-6 flex items-center justify-between border border-sakura-pink/10 shadow-sm font-main transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
                        <div className="space-y-1 overflow-hidden">
                            <h3 className="font-bold text-white text-lg md:text-xl truncate">{t("features.cards.community.title")}</h3>
                            <p className="text-white/70 text-sm truncate">{t("features.cards.community.desc")}</p>
                        </div>
                        <div className="flex -space-x-4 shrink-0 ml-2">
                            <Users className="w-8 h-8 text-white opacity-50" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Feature;
