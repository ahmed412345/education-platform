import { Link } from "react-router-dom";
import DarkModeToggle from "./darkMood";
import LangButton from "./langBtn";
import JoinDashbtn from "../home/joinDashboardbtn";
import { useTranslation } from "react-i18next";
import LogoutButton from "./logout";
import { useContext } from "react";
import { UserContext } from "../context/userProvider";

// 1. تحسين الـ Interface (تجنب any)
interface MenuBodyProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    menuData: {
        home: { text: string };
        courses: { text: string };
        about: { text: string };
    };
    menuPath: {
        home: { path: string };
        courses: { path: string };
        about: { path: string };
    };
}

const MenuBody = ({ isOpen, setIsOpen, menuData, menuPath }: MenuBodyProps) => {
    const { t } = useTranslation();

    const { data } = useContext(UserContext);

    return (
        <>
            {/* الخلفية المظلمة - أضفت لها transition عشان متظهرش وتختفي فجأة */}
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-500 
                ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            />

            {/* المنيو مع منطق الاختفاء التام */}
            <div
                className={`menu absolute flex flex-col w-full left-0 top-0 gap-4 p-3 z-50 bg-off-white dark:bg-night-sakura transition-all duration-500 ease-in-out
                ${isOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-full opacity-0 invisible"}`}
            >
                <div className="flex gap-5 items-center">
                    <DarkModeToggle />
                    <LangButton />
                    {data ? <LogoutButton /> : null}
                </div>

                <div className="flex flex-col gap-4">
                    <Link
                        to={menuPath.home.path}
                        onClick={() => setIsOpen(false)}
                        className="capitalize text-center p-3 block w-full bg-sakura-pink dark:bg-deep-pink rounded-sm hover:bg-petal-glow active:bg-petal-glow duration-300 hover:scale-[1.02]"
                    >
                        {menuData.home.text}
                    </Link>

                    <Link
                        to={menuPath.courses.path}
                        onClick={() => setIsOpen(false)}
                        className="capitalize text-center p-3 w-full block bg-sakura-pink dark:bg-deep-pink rounded-sm hover:bg-petal-glow active:bg-petal-glow duration-300 hover:scale-[1.02]"
                    >
                        {menuData.courses.text}
                    </Link>

                    <a
                        href="https://www.youtube.com/@sensei_noura"
                        aria-label="Youtube"
                        className="capitalize text-center p-3 w-full block bg-sakura-pink dark:bg-deep-pink rounded-sm hover:bg-petal-glow active:bg-petal-glow duration-300 hover:scale-[1.02]"
                    >
                        {t("nav.about.text")}
                    </a>
                </div>
                <JoinDashbtn />
            </div>
        </>
    );
};

export default MenuBody;
