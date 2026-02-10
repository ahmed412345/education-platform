import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { getCoursesData } from "../../services/getCourses";
import { updateUserCourses } from "../../services/manageOperation";
import { Plus, Minus, Loader2, Save, X } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const CourseModal = ({ isOpen, closeModal, user }: any) => {
    const { t } = useTranslation();

    const [allCourses, setAllCourses] = useState<any[]>([]); // كل الكورسات من السيرفر
    const [loading, setLoading] = useState(true);
    const [saveLoading, setSaveLoading] = useState(false);

    // مصفوفة الـ IDs الحالية (التي نعدل عليها)
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    // 1. جلب البيانات عند فتح الـ Modal
    useEffect(() => {
        if (isOpen) {
            const fetchData = async () => {
                try {
                    setLoading(true);
                    const res = await getCoursesData();
                    setAllCourses(res.data);
                    // نضبط الـ IDs الأولية من بيانات المستخدم القادمة في البروبس
                    setSelectedIds(user?.courses || []);
                } catch (error) {
                    toast.error(t("courses.fail.text"));
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [isOpen, user]);

    // 2. تقسيم الكورسات للعرض بناءً على الـ IDs
    const subscribedCourses = allCourses.filter(c => selectedIds.includes(c._id));
    const availableCourses = allCourses.filter(c => !selectedIds.includes(c._id));

    // 3. منطق الإضافة والحذف (محلياً)
    const handleAdd = (id: string) => setSelectedIds([...selectedIds, id]);
    const handleRemove = (id: string) => setSelectedIds(selectedIds.filter(i => i !== id));

    // 4. حفظ البيانات النهائية للسيرفر
    const handleSave = async () => {
        try {
            setSaveLoading(true);
            // نرسل الـ userId والمصفوفة الجديدة بالكامل
            await updateUserCourses(user._id, selectedIds);
            toast.success(t("courses.success.text"));
            closeModal(); // قفل الـ Pop-up بعد النجاح
            window.location.reload();
        } catch (error) {
            toast.error(t("courses.fail.text"));
        } finally {
            setSaveLoading(false);
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50 font-main" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-night-sakura p-6 shadow-xl border border-gray-200 dark:border-white/10 transition-all">
                                <div className="flex justify-between items-center mb-6">
                                    <Dialog.Title className="text-lg font-bold text-gray-900 dark:text-off-white">
                                        {t("management.header.text")} <span className="text-sakura-pink">{user?.fullName}</span>
                                    </Dialog.Title>
                                    <button
                                        onClick={closeModal}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {loading ? (
                                    <div className="flex flex-col items-center justify-center p-10 gap-3">
                                        <Loader2 className="animate-spin text-sakura-pink" size={32} />
                                        <p className="text-sm text-gray-400">جاري جلب قائمة الكورسات...</p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {/* قسم الكورسات المشترك فيها */}
                                        <section>
                                            <h4 className="text-[11px] font-bold text-gray-400 uppercase mb-3 tracking-widest flex justify-between">
                                                <span>{t("management.available.text")}</span>
                                                <span className="text-sakura-pink">{subscribedCourses.length}</span>
                                            </h4>
                                            <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                                                {subscribedCourses.map(course => (
                                                    <div
                                                        key={course._id}
                                                        className="flex items-center justify-between p-3 rounded-xl bg-green-500/5 border border-green-500/20 group animate-in fade-in slide-in-from-right-2"
                                                    >
                                                        <span className="text-sm font-medium dark:text-gray-200">{course.title}</span>
                                                        <button
                                                            onClick={() => handleRemove(course._id)}
                                                            className="p-1.5 cursor-pointer hover:bg-red-500/10 text-red-400 rounded-lg transition-all active:scale-90"
                                                        >
                                                            <Minus size={16} strokeWidth={3} />
                                                        </button>
                                                    </div>
                                                ))}
                                                {subscribedCourses.length === 0 && (
                                                    <div className="text-center py-4 border-2 border-dashed border-gray-100 dark:border-white/5 rounded-xl text-xs text-gray-400">
                                                        {t("management.noCourses.text")}
                                                    </div>
                                                )}
                                            </div>
                                        </section>

                                        {/* قسم إضافة كورسات */}
                                        <section>
                                            <h4 className="text-[11px] font-bold text-gray-400 uppercase mb-3 tracking-widest">
                                                {t("management.add.text")}
                                            </h4>
                                            <div className="space-y-2 p-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                                {availableCourses.map(course => (
                                                    <div
                                                        key={course._id}
                                                        className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5 shadow-sm shadow-black/10 "
                                                    >
                                                        <span className="text-sm dark:text-gray-400 ">{course.title}</span>
                                                        <button
                                                            onClick={() => handleAdd(course._id)}
                                                            className="p-1.5 hover:bg-sakura-pink/10 text-green-500 rounded-lg cursor-pointer transition-all active:scale-90"
                                                        >
                                                            <Plus size={16} strokeWidth={3} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    </div>
                                )}

                                {/* أزرار التحكم */}
                                <div className="mt-8 flex gap-3">
                                    <button
                                        onClick={closeModal}
                                        disabled={saveLoading}
                                        className="flex-1 px-4 py-2.5 text-sm font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 rounded-xl hover:bg-gray-200 dark:hover:bg-white/10 transition-all disabled:opacity-50"
                                    >
                                        {t("management.cancel.text")}
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={saveLoading || loading}
                                        className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-sakura-pink rounded-xl hover:bg-deep-pink shadow-lg shadow-sakura-pink/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {saveLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                        {t("management.save.text")}
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default CourseModal;
