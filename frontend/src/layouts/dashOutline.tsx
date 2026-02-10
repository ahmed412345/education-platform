import { useContext } from "react";
import { useTranslation } from "react-i18next";
import LuckyCat from "../components/dashboard/luckyCat";
import { Phone } from "lucide-react";
import { UserContext } from "../components/context/userProvider";

const DashboardOutline = ({ children }: any) => {
    const { data } = useContext(UserContext);
    const { t } = useTranslation();

    // التحقق من وصول البيانات قبل تنفيذ أي كود أو رندر
    // إذا كانت data غير موجودة (null أو undefined)، سنعرض شاشة تحميل بسيطة
    if (!data) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-sakura-pink"></div>
            </div>
        );
    }

    // الآن نضمن أن data موجودة، ويمكننا الوصول لخصائصها بأمان
    const fullName = data.fullName || "guest";

    return (
        <div className="w-full p-3 min-h-[calc(100vh-60px)] flex gap-2 flex-col md:flex-row rounded-md">
            <div className="flex-1 md:flex-1 flex flex-col shadow-xl rounded-lg shadow-black/25">
                <div className="p-4 font-japan text-3xl w-full flex justify-center items-center">
                    <span className="w-fit text-center capitalize leading-relaxed">
                        {t("dashOutline.welcome.text") + (data.role === "admin" ? ` ${fullName} sensei` : ` ${fullName}`)}
                    </span>
                </div>
                <div className="flex items-center justify-center text-sm">
                    <LuckyCat />
                </div>

                {/* بيانات المستخدم */}
                <div className="p-4 flex-1 flex flex-col gap-3">
                    <h3 className="text-lg">{t("dashOutline.profile.text")}</h3>
                    <div className="text-md opacity-70 flex items-center gap-1">
                        <Phone size={20} />
                        <span dir="ltr">{data.phoneNumber}</span>
                    </div>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-2 flex-4 p-0 md:p-6 shadow-xl rounded-lg shadow-black/25">
                {children}
            </div>
        </div>
    );
};

export default DashboardOutline;
