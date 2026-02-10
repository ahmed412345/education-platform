import { useEffect, useRef, useState } from "react";
import { Phone } from "lucide-react"; // تأكد من استيراد الأيقونات
import { blockUser, editUserName, unblockUser } from "../../services/manageOperation";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import CourseModal  from "./popupBody";

const UserCard = ({ el }: any) => {
    const { t } = useTranslation();

    // state محلي عشان التحديث يظهر فوراً في الـ UI
    const [isBlocked, setIsBlocked] = useState(el.isBlocked);

    const [loading, setLoading] = useState(false);

    const handleToggleBlock = async () => {
        if (loading) return; // منع النقرات المتكررة
        setLoading(true);
        try {
            if (isBlocked) {
                await unblockUser(el._id);
                setIsBlocked(false);
            } else {
                await blockUser(el._id);
                setIsBlocked(true);
            }
        } catch (error) {
            toast.error(t("courses.fail.text"));
        } finally {
            setLoading(false);
        }
    };
    const [isEditAble, setIsEditAble] = useState(false);
    const [fullName, setFullName] = useState(el.fullName); // State لاسم المستخدم
    const nameRef = useRef<HTMLHeadingElement>(null);

    const handleSaveName = async () => {
        const newName = nameRef.current?.innerText.trim() || "";

        // التحقق من الطول كما اتفقنا في الباك إند
        if (newName.length < 3) {
            toast.error("Full name must be at least 3 characters");
            nameRef.current!.innerText = fullName; // إعادة الاسم القديم لو فشل التحقق
            setIsEditAble(false);
            return;
        }

        if (newName === fullName) {
            setIsEditAble(false);
            return;
        }

        try {
            await editUserName(el._id, newName);
            setFullName(newName);
            toast.success("Name updated successfully");
        } catch (error) {
            toast.error("Failed to update name");
            nameRef.current!.innerText = fullName; // تراجع عن التغيير في الواجهة
        } finally {
            setIsEditAble(false);
        }
    };

    // علشان يعمل فوكس تلقائي

    useEffect(() => {
        if (isEditAble && nameRef.current) {
            nameRef.current.focus(); // عمل Focus على النص

            // سطر إضافي لجعل المؤشر يذهب لآخر الاسم بدل أوله
            const range = document.createRange();
            const selection = window.getSelection();
            range.selectNodeContents(nameRef.current);
            range.collapse(false); // false تعني وضع المؤشر في النهاية
            selection?.removeAllRanges();
            selection?.addRange(range);
        }
    }, [isEditAble]);

    //حالة قائمه الكورسات
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 ${
                isBlocked ? "opacity-60 grayscale bg-gray-100 dark:bg-gray-800" : "bg-white dark:bg-night-sakura"
            } p-5 shadow-sm transition-all hover:shadow-md dark:hover:bg-night-sakura/80 mb-4`}
        >
            <div className="absolute left-0 top-0 h-full w-1 bg-sakura-pink opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                        <h3
                            ref={nameRef}
                            contentEditable={isEditAble}
                            suppressContentEditableWarning={true} // لمنع تحذير React من التعديل المباشر
                            onBlur={handleSaveName} // يحفظ تلقائياً عند الضغط خارج النص
                            onKeyDown={e => e.key === "Enter" && e.currentTarget.blur()} // يحفظ عند ضغط Enter
                            className={`font-main text-lg font-bold transition-all ${
                                isEditAble ? "bg-sakura-pink/10 outline-none border-b-2 border-sakura-pink px-2" : "text-gray-800 dark:text-off-white"
                            }`}
                        >
                            {fullName}
                        </h3>
                        <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                                el.role === "admin" ? "bg-deep-pink text-white" : "bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400"
                            }`}
                        >
                            {el.role}
                        </span>
                    </div>

                    <a
                        href={`https://wa.me/${el.phoneNumber?.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 hover:text-green-500 transition-colors"
                    >
                        <Phone size={18} className="text-red-500" />
                        {el.phoneNumber}
                    </a>
                </div>

                <div className="flex items-center gap-6 text-sm">
                    {el.role !== "admin" && (
                        <div
                            onClick={() => setIsOpen(true)}
                            className="text-center cursor-pointer group/stat p-2 rounded-xl transition-all duration-200 hover:bg-sakura-pink/10 active:scale-90 touch-none select-none"
                        >
                            <span className="block font-bold text-gray-700 dark:text-off-white transition-colors group-hover/stat:text-deep-pink">
                                {el.courses?.length || 0}
                            </span>
                            <span className="text-[10px] text-gray-400 uppercase tracking-tighter transition-colors group-hover/stat:text-deep-pink/80">
                                {t("management.courses.text")}
                            </span>
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <div className={`h-2.5 w-2.5 rounded-full ${el.isActive ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                        <span className="text-gray-600 dark:text-gray-300 font-medium">
                            {el.isActive ? t("management.status.text1") : t("management.status.text2")}
                        </span>
                    </div>
                </div>

                <div className="flex gap-4 border-t md:border-t-0 pt-3 md:pt-0">
                    {el.role !== "admin" && (
                        <button
                            onClick={() => setIsEditAble(true)}
                            className={`text-xs font-bold duration-150 text-plum-dark cursor-pointer hover:underline ${
                                isEditAble ? "invisible pointer-events-none" : "visible"
                            }`}
                        >
                            {t("management.edit.text")}
                        </button>
                    )}

                    {el.role !== "admin" && (
                        <button
                            onClick={handleToggleBlock}
                            disabled={loading}
                            className={`text-xs font-bold cursor-pointer duration-150 transition-colors ${
                                isBlocked ? "text-green-500" : "text-red-400 hover:text-red-600"
                            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {loading ? "..." : isBlocked ? t("management.unblock.text") : t("management.delete.text")}
                        </button>
                    )}
                </div>
            </div>
            <CourseModal isOpen={isOpen} closeModal={() => setIsOpen(false)} user={el} />
        </div>
    );
};

export default UserCard;
