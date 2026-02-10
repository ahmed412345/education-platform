import { useTranslation } from "react-i18next";
import bgImage from "../../assets/images/lastCTA.webp"; // ضع صورتك هنا
import { Link } from "react-router-dom";

const FinalCTASection = () => {
    const { t } = useTranslation();

    return (
        <section
            className="w-screen min-h-screen relative flex items-center justify-center"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Overlay للشبه داكن لو حبينا النص يظهر أكثر */}
            <div className="absolute inset-0 bg-black/40 dark:bg-black/50"></div>

            {/* المحتوى */}
            <div className="relative z-10 text-center px-6 md:px-12 max-w-3xl">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                    {t("home.finalCTA.title.main")} <span className="text-deep-pink">{t("home.finalCTA.title.highlight")}</span>
                </h2>
                <p className="text-white/90 text-base md:text-xl mb-8">{t("home.finalCTA.description")}</p>
                <Link
                    to="/register"
                    className="flex items-center gap-3 px-6 py-4 ring-2 ring-deep-pink justify-center text-white font-bold rounded-2xl shadow-lg hover:bg-pink-600 active:scale-95 duration-1000"
                >
                    {t("home.finalCTA.cta")}
                </Link>
            </div>
        </section>
    );
};

export default FinalCTASection;
