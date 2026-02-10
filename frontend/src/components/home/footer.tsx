import { useTranslation } from "react-i18next";
import { Facebook, MessageCircleMore, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    const { t, i18n } = useTranslation();

    return (
        <footer className="w-screen bg-stone dark:bg-night-sakura text-white py-10 px-6 md:px-12 transition-colors duration-500">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
                {/* شعار ووصف */}
                <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-deep-pink mb-2">Noura Sensei</h2>
                    <p className="text-sm md:text-base text-white/70">{t("footer.description")}</p>
                </div>

                {/* روابط سريعة */}
                <div className="flex-1 flex flex-col md:flex-row justify-between gap-6">
                    <div>
                        <h3 className="font-bold mb-2">{t("footer.links.title")}</h3>
                        <ul className="space-y-1 text-sm">
                            <li>
                                <Link to="/courses" className="hover:text-deep-pink">
                                    {t("footer.links.courses")}
                                </Link>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/future.researchers.school/about">{t("footer.links.about")}</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-2">{t("footer.social.title")}</h3>
                        <div className="flex gap-3 mt-2">
                            <a href="https://www.facebook.com/future.researchers.school" aria-label="Facebook">
                                <Facebook className="w-5 h-5 hover:text-deep-pink" />
                            </a>
                            <a href="https://www.youtube.com/@sensei_noura" aria-label="Youtube">
                                <Youtube className="w-5 h-5 hover:text-deep-pink" />
                            </a>
                            <a
                                href={`https://wa.me/201281783636?text=${
                                    i18n.language === "ar" ? "مرحبا اريد الاستفسار عن شئ" : "Hi, I'd like to ask about something"
                                }`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Whatsapp"
                            >
                                <MessageCircleMore className="w-5 h-5 hover:text-deep-pink" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* حقوق الملكية */}
            <div className="mt-10 border-t border-white/20 pt-4 text-center text-sm text-white/50">
                &copy; {new Date().getFullYear()} {t("footer.copyright")}
            </div>
        </footer>
    );
};

export default Footer;
