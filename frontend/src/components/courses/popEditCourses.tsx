import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { X, CopyX, Settings2 } from "lucide-react";
import { toast } from "sonner";
import { getCoursesData } from "../../services/getCourses";
import { useTranslation } from "react-i18next";
import CourseEdit from "./coursesEditCard";

const ManageCoursesModal = ({ isOpen, setIsOpen }: any) => {
    const [courses, setCourses] = useState<any[]>([]);
    const { t } = useTranslation();

    const closeModal = () => setIsOpen(false);

    useEffect(() => {
        if (!isOpen) return;

        const fetchCourses = () => {
            toast.promise(getCoursesData(), {
                loading: t("courses.loading.text"),
                success: (arrayData: any) => {
                    setCourses(arrayData.data);
                    return t("courses.success.text");
                },
                error: () => t("courses.fail.text"),
            });
        };

        fetchCourses();
    }, [isOpen, t]);

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                {/* 1. الخلفية المعتمة بنفس الـ Backdrop Blur */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-stone/40 backdrop-blur-sm dark:bg-black/70" aria-hidden="true" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-500"
                            enterFrom="opacity-0 scale-95 translate-y-8"
                            enterTo="opacity-100 scale-100 translate-y-0"
                            leave="ease-in duration-300"
                            leaveFrom="opacity-100 scale-100 translate-y-0"
                            leaveTo="opacity-0 scale-95 translate-y-8"
                        >
                            {/* Panel بنفس تصميم الـ AddCourseModal */}
                            <Dialog.Panel className="relative w-full max-w-md transform overflow-hidden rounded-xl bg-off-white dark:bg-night-sakura p-4 text-left shadow-2xl transition-all border border-sakura-pink/30 dark:border-dash-outline/50">
                                {/* زر الإغلاق العلوي */}
                                <button
                                    onClick={closeModal}
                                    className="absolute top-6 right-6 text-stone/40 hover:text-deep-pink dark:text-dash-outline dark:hover:text-plum-dark transition-colors outline-none"
                                >
                                    <X size={24} />
                                </button>

                                {/* الرأس (Header) بنفس التنسيق الياباني */}
                                <div className="text-center mb-4">
                                    <h3 className="text-2xl font-bold text-stone dark:text-petal-glow tracking-tight">
                                        既存コース <span className="text-deep-pink dark:text-plum-dark">管理</span>
                                    </h3>
                                    <p className="text-sm text-stone/50 dark:text-off-white font-bold mt-1 uppercase">
                                        ادارة الكورسات
                                    </p>
                                </div>

                                {/* المحتوى الرئيسي (Main Content) */}
                                <div className="min-h-50 max-h-100 overflow-y-auto pr-2">
                                    {courses.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center text-stone/30 gap-2">
                                            <Settings2 size={40} className="opacity-20 animate-pulse" />
                                            <p className="font-medium">No courses found</p>
                                        </div>
                                    ) : (
                                        <div className="">
                                            <div className="space-y-3 p-1 flex flex-col">
                                                {courses.map(course => (
                                                    <CourseEdit course={course} key={course._id} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={closeModal}
                                    className="w-full py-2 mt-3 bg-stone dark:bg-plum-dark cursor-pointer text-white font-bold rounded-xl shadow-lg hover:opacity-90 active:scale-90 transition-all flex items-center justify-center gap-2"
                                >
                                    <CopyX size={20} />
                                    <span>اغلاق</span>
                                </button>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ManageCoursesModal;
