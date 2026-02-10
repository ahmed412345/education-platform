import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface MenuBtnProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuBtn = ({ isOpen, setIsOpen }: MenuBtnProps) => {
    const location = useLocation(); // بيعرفك الـ URL الحالي

    // أول ما الـ URL يتغير (المستخدم انتقل لصفحة تانية)، اقفل المنيو
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);
    return (
        <>
            <div onClick={_ => setIsOpen(!isOpen)} className="flex flex-col gap-1 cursor-pointer group lg:hidden z-60">
                <span
                    className={`w-8 h-1 rounded-2xl bg-plum-dark dark:bg-off-white group-hover:bg-deep-pink duration-300 ${
                        isOpen ? "translate-y-2 rotate-45 bg-red-700" : ""
                    }`}
                ></span>
                <span
                    className={`w-8 h-1 rounded-2xl bg-plum-dark dark:bg-off-white group-hover:bg-deep-pink duration-300 ${
                        isOpen ? "opacity-0" : ""
                    }`}
                ></span>
                <span
                    className={`w-8 h-1 rounded-2xl bg-plum-dark dark:bg-off-white group-hover:bg-deep-pink duration-300 ${
                        isOpen ? "-translate-y-2 -rotate-45 bg-red-700" : ""
                    }`}
                ></span>
            </div>
        </>
    );
};

export default MenuBtn;

//كنت بحاول اعمل ايكونه تفاعليه
