import { Power, Trash } from "lucide-react";
import { toast } from "sonner";
import { updateCourse } from "../../services/updateCourse";
import { useRef, useState } from "react";
import { deleteCourse } from "../../services/deleteCourse";

// ... نفس الـ imports
const CourseEdit = ({ course }: any) => {
    const [order, setOrder] = useState(course.order);
    const orderRef = useRef<HTMLSpanElement>(null);

    const changeOrder = () => {
        const rawValue = orderRef.current?.innerText.trim() || "";
        const newOrder = parseInt(rawValue, 10);

        // إذا لم يتغير الرقم، لا تفعل شيئاً
        if (newOrder === order) return;

        if (isNaN(newOrder) || newOrder < 0) {
            toast.error("الرجاء إدخال رقم صحيح");
            if (orderRef.current) orderRef.current.innerText = order.toString();
            return;
        }

        toast.promise(updateCourse(course._id, { order: newOrder }), {
            loading: "جار التحميل...",
            success: (result: any) => {
                setOrder(newOrder); // تحديث الـ State
                console.log(result);
                return "تم تغيير الترتيب بنجاح";
            },
            error: (e: any) => {
                if (orderRef.current) orderRef.current.innerText = order.toString();
                return e.message || "فشل تحديث الترتيب";
            },
        });
    };
    const [isActive, setIsActive] = useState(course.isActive);

    const activeAndInactive = () => {
        // 1. حساب الحالة الجديدة يدوياً
        const nextStatus = !isActive;

        // 2. تحديث الـ UI فوراً
        setIsActive(nextStatus);

        // 3. إرسال الحالة الجديدة للسيرفر
        toast.promise(updateCourse(course._id, { isActive: nextStatus }), {
            loading: "جار التحديث...",
            success: (result: any) => {
                console.log(result);
                return "تم التحديث بنجاح";
            },
            error: (e: any) => {
                // في حال الفشل، نعيد الحالة القديمة للـ UI
                setIsActive(!nextStatus);
                return e.message || "فشل التحديث";
            },
        });
    };

    const [isDeleted, setIsDeleted] = useState(false);
    const handleDelete = () => {
        toast.custom(
            t => (
                <div className="bg-white dark:bg-night-sakura p-5 rounded-md border border-stone-200 dark:border-dash-outline/30 shadow-2xl flex flex-col gap-4 min-w-75 animate-in fade-in zoom-in duration-300">
                    {/* الرسالة */}
                    <div className="flex flex-col gap-1">
                        <h5 className="text-sm font-bold text-stone dark:text-petal-glow">تأكيد الحذف</h5>
                        <p className="text-xs text-stone/60 dark:text-dash-outline">
                            هل أنت متأكد من حذف <span className="text-deep-pink font-bold">"{course.title}"</span>؟ لا يمكن التراجع عن هذا الإجراء.
                        </p>
                    </div>

                    {/* الأزرار */}
                    <div className="flex gap-2 justify-end">
                        <button
                            onClick={() => toast.dismiss(t)}
                            className="px-4 py-2 rounded-xl text-xs font-bold text-stone/50 hover:bg-stone-100 dark:hover:bg-white/5 transition-colors"
                        >
                            إلغاء
                        </button>
                        <button
                            onClick={() => {
                                executeDelete();
                                toast.dismiss(t);
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-red-500/20 transition-all active:scale-95"
                        >
                            حذف الآن
                        </button>
                    </div>
                </div>
            ),
            {
                duration: 5000,
                position: "top-left",
            },
        );
    };

    const executeDelete = () => {
        toast.promise(deleteCourse(course._id), {
            loading: "جاري الحذف...",
            success: () => {
                setIsDeleted(true);
                return "تم حذف الكورس بنجاح";
            },
            error: (e: any) => e.message || "فشل حذف الكورس",
        });
    };
    if (isDeleted) return null;

    return (
        <div
            style={{ order: order }}
            className={`flex items-center gap-3 p-2 rounded-2xl bg-white dark:bg-stone/30 border border-stone-200/50 dark:border-dash-outline/20 group hover:border-sakura-pink/50 `}
        >
            <div className="flex items-center gap-3">
                <span
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    ref={orderRef}
                    onBlur={changeOrder}
                    onKeyDown={e => e.key === "Enter" && e.currentTarget.blur()}
                    className="text-xs text-center font-bold text-stone/40 dark:text-off-white/50 min-w-5 outline-none focus:text-deep-pink transition-colors cursor-edit"
                >
                    {order} {/* تم التعديل هنا ليعرض order من الـ State وليس من الـ course */}
                </span>

                <img
                    src={course.thumbnail}
                    alt=""
                    className="w-12 h-12 rounded-xl object-cover bg-stone-100 dark:bg-night-sakura border border-stone-100 dark:border-stone-800"
                />
            </div>

            {/* العنوان والأزرار كما هي ... */}
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-stone/80 text-right dark:text-petal-glow truncate">{course.title}</h4>
            </div>

            <div className="flex items-center gap-1">
                <button
                    onClick={activeAndInactive}
                    className={`p-2.5 rounded-xl transition-all cursor-pointer active:scale-90  text-off-white ${
                        isActive ? "bg-green-400" : "bg-red-400"
                    }`}
                >
                    <Power size={18} />
                </button>
                <button
                    onClick={handleDelete}
                    className="p-2.5 rounded-xl cursor-pointer active:scale-90 text-stone-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                >
                    <Trash size={18} />
                </button>
            </div>
        </div>
    );
};

export default CourseEdit;
