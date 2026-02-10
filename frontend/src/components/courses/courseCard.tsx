import { Clover, ArrowRight, Lock, MessageCircleMore, CheckCircle2, CircleDollarSign } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface CourseProps {
    _id: string;
    title: string;
    description: string;
    thumbnail: string;
    price: number;
    isActive: boolean;
    order: number;
    isPurchased: string;
}

const CourseCard = ({ _id, title, description, thumbnail, price, isActive, order, isPurchased }: CourseProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const buyMsg = `مرحبا ارغب في شراء كورس ${title} ما هي طرق الدفع المتاحة`;

    // دالة الانتقال للكورس
    const handleCardClick = () => {
        if (isActive) {
            navigate(`/courses/${_id}`);
        }
    };

    return (
        <div
            onClick={handleCardClick}
            style={{ backgroundImage: `url(${thumbnail})` }}
            className={`order-${order || "last"} group cursor-pointer relative overflow-hidden min-h-80 rounded-xl border-4 border-dash-outline bg-cover bg-center shadow-lg transition-all duration-500 hover:-translate-y-2 active:scale-95`}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-night-sakura via-night-sakura/60 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />

            {/* شارة السعر أو الحالة */}
            <div className="absolute top-4 right-4 z-20">
                {!isPurchased && price > 0 ? (
                    <a
                        href={`https://wa.me/201281783636?text=${encodeURIComponent(buyMsg)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()} // منع الانتقال لصفحة الكورس عند الضغط على الزر
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl shadow-lg transition-all transform hover:scale-110 animate-pulse"
                    >
                        <span className="font-main text-xs">{t("courses.price.buy") + price + t("courses.price.coin")} </span>
                        <MessageCircleMore size={18} />
                    </a>
                ) : (
                    <div
                        className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-main font-semibold text-white shadow-md ${
                            price === 0 ? "bg-plum-dark" : "bg-green-500"
                        }`}
                    >
                        {price === 0 ? (
                            <>
                                <span>{t("courses.price.free")}</span>
                                <CircleDollarSign size={14} />
                            </>
                        ) : (
                            <>
                                <span>{t("courses.price.purchased")}</span>
                                <CheckCircle2 size={14} />
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* المحتوى السفلي */}
            <div className="absolute bottom-0 p-5 w-full transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="font-main text-off-white text-xl font-bold flex items-center justify-between gap-2">
                    <span className="truncate">{title}</span>
                    <span className="shrink-0 opacity-0 transition-all duration-300 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 text-deep-pink">
                        <Clover size={20} />
                    </span>
                </h3>

                <p className="font-main text-off-white/70 text-xs mt-2 line-clamp-2 leading-relaxed transition-colors group-hover:text-off-white">
                    {description}
                </p>

                {/* خط الزينة */}
                <div className="mt-4 h-1 w-0 bg-deep-pink transition-all duration-700 group-hover:w-full rounded-full opacity-60" />

                {/* زر الانتقال */}
                <div className="flex items-center gap-2 mt-3 text-sakura-pink text-[10px] font-bold opacity-0 transition-opacity duration-500 group-hover:opacity-100 uppercase tracking-tighter">
                    <span>{t("courses.start.text")}</span>
                    <ArrowRight size={12} className="animate-pulse" />
                </div>
            </div>

            {/* قفل الكورس */}
            {!isActive && (
                <div className="absolute inset-0 bg-night-sakura/80 backdrop-blur-sm flex flex-col items-center justify-center text-off-white z-10">
                    <Lock size={40} className="text-deep-pink mb-2" />
                    <span className="font-main text-sm">{t("courses.soon.text")}</span>
                </div>
            )}
        </div>
    );
};

export default CourseCard;
