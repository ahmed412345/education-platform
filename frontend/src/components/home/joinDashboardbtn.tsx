import { useTranslation } from "react-i18next"; // استخدم Hook الترجمة
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/userProvider";

const JoinDashbtn = () => {
    const { t } = useTranslation(); // دي بتخلي الـ Component يحس بتغيير اللغة فوراً
    const loca = useLocation();
    const isAval = loca.pathname === "/login" || loca.pathname === "/register";
    const { data } = useContext(UserContext);

    // حساب المسار والنص مباشرة بدون useState أو useEffect
    let path = localStorage.getItem("hasSigned") ? "/login" : "/register";
    let text = t("nav.join.text1");

    if (data) {
        if (!data.isActive) {
            path = "/otp-check";
            text = t("nav.join.text2");
        } else {
            path = "/dashboard";
            text = t("nav.join.text3");
        }
    }

    if (isAval) return null;

    return (
        <Link
            to={path}
            className="bg-deep-pink grow flex justify-center items-center dark:bg-plum-dark text-white px-6 py-2.5 rounded-xl font-bold capitalize transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg hover:scale-105 active:scale-95"
        >
            {text}
        </Link>
    );
};

export default JoinDashbtn;
