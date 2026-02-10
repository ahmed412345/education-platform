import { Cat, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface LessonProps {
    _id: string;
    title: string;
    thumbnail: string;
    videoUrl: string;
    isActive: boolean;
    order: number;
}

const LessonCard = ({ _id, title, thumbnail, isActive, order }: LessonProps) => {
    const { t } = useTranslation();

    return (
        <Link
            to={isActive ? `/courses/lesson/${_id}` : "#"}
            style={{ backgroundImage: `url(${thumbnail})`, order: order }}
            className={`group cursor-pointer relative overflow-hidden min-h-80 rounded-xl border-4 border-dash-outline bg-cover bg-center shadow-lg transition-all duration-500 hover:-translate-y-2 active:scale-90`}
        >
            {/* Overlay المتدرج باستخدام ألوانك */}
            <div className="absolute inset-0 bg-linear-to-t from-night-sakura via-night-sakura/60 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />

            {/* المحتوى السفلي */}
            <div className="absolute bottom-0 p-5 w-full transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="font-main text-off-white text-xl font-bold flex items-center justify-between gap-2">
                    <span className="truncate">{title}</span>
                    <span className="shrink-0 opacity-0 transition-all duration-300 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 text-deep-pink">
                        <Cat size={20} />
                    </span>
                </h3>

                {/* خط التحميل الزخرفي */}
                <div className="mt-4 h-1 w-0 bg-deep-pink transition-all duration-700 group-hover:w-full rounded-full opacity-60" />
            </div>

            {/* في حالة الكورس غير مفعّل (Lock Overlay) */}
            {!isActive && (
                <div className="absolute inset-0 bg-night-sakura/80 backdrop-blur-sm flex flex-col items-center justify-center text-off-white z-10">
                    <Lock size={40} className="text-deep-pink mb-2" />
                    <span className="font-main text-sm">{t("courses.soon.text")}</span>
                </div>
            )}
        </Link>
    );
};

export default LessonCard;
