import { useTranslation } from "react-i18next";
import { useEffect } from "react";
function LangButton() {
    const { i18n } = useTranslation();
    const currenLang = i18n.resolvedLanguage;
    useEffect(() => {
        document.dir = i18n.language === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);
    return (
        <button
            className="relative p-2 w-10 h-10 flex items-center justify-center rounded-lg ring-2 md:ring-0 hover:ring-2 ring-sakura-pink dark:ring-deep-pink transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
            onClick={() => i18n.changeLanguage(currenLang === "en" ? "ar" : "en")}
        >
            {currenLang === "en" ? "AR" : "EN"}
        </button>
    );
}

export default LangButton;
