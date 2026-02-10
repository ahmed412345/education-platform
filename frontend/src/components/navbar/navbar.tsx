import { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import MenuBtn from "./menuBtn";
import MenuBody from "./menuBody";
import LogoElement from "./logo";
import DarkModeToggle from "./darkMood";
import { useTranslation } from "react-i18next";
import JoinDashbtn from "../home/joinDashboardbtn";

import { Link, useLocation } from "react-router-dom";
import ChangeLang from "./langBtn";
import LogoutButton from "./logout";
import { UserContext } from "../context/userProvider";
const Navbar = () => {
    //ادارة الحالة الخاصه بالزرار مررتهم ليها
    const [isOpen, setIsOpen] = useState(false);

    //علشان اوقف سلوك الاسكرول والقايمه مفتوحه دا كلاس حاطه في السي اس اس
    useEffect(() => {
        document.body.classList.toggle("no-scroll", isOpen);
    }, [isOpen]);

    const menuPath = {
        home: { path: "/" },
        courses: { path: "/courses" },
        about: { path: "/about" },
        join: { path: "/register" },
    };
    const { t, i18n } = useTranslation();
    const menuData = {
        home: { text: t("nav.home.text") },
        courses: { text: t("nav.courses.text") },
        about: { text: t("nav.about.text") },
        join: { text: t("nav.join.text") },
    };

    const loca = useLocation();

    const { data } = useContext(UserContext);

    return (
        <nav
            dir="ltr"
            className={`shadow-lg shadow-black/15  pl-6 pr-6 pt-2 pb-2 flex items-center ${
                loca.pathname === "/" || loca.pathname === "/home"
                    ? `bg-transparent absolute ${window.innerWidth > 786 ? "text-off-white" : ""}  border-b border-off-white/20`
                    : "bg-off-white dark:bg-night-sakura dark:border-b dark:border-off-white/20"
            }  justify-between z-30  w-full top-0`}
        >
            <LogoElement logo={logo} />
            <div className="hidden lg:flex gap-10" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
                <Link to={menuPath.home.path} className="capitalize hover:text-deep-pink hover:scale-105 active:scale-95">
                    {t("nav.home.text")}
                </Link>
                <Link to={menuPath.courses.path} className="capitalize hover:text-deep-pink hover:scale-105 active:scale-95">
                    {t("nav.courses.text")}
                </Link>
                <a
                    href="https://www.youtube.com/@sensei_noura"
                    className="capitalize hover:text-deep-pink hover:scale-105 active:scale-95"
                    aria-label="Youtube"
                >
                    {t("nav.about.text")}
                </a>
            </div>
            <div className="hidden lg:flex items-center gap-10">
                <JoinDashbtn />
                <DarkModeToggle />
                <ChangeLang />
                {data ? <LogoutButton /> : null}
            </div>
            <MenuBtn isOpen={isOpen} setIsOpen={setIsOpen} />
            <MenuBody isOpen={isOpen} setIsOpen={setIsOpen} menuData={menuData} menuPath={menuPath} />
        </nav>
    );
};

export default Navbar;
