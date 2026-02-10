import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { X, Youtube, DollarSign, ListOrdered, ToggleLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { addYotubeCourse } from "../../services/addNewYotCourse";
import { addNewBook } from "../../services/addNewBook";
import { toast } from "sonner";
import FileUpload from "./fileUpload";

interface Props {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

const AddCourseModal = ({ isOpen, setIsOpen }: Props) => {
    const closeModal = () => setIsOpen(false);

    const getPlaylistId = (url: string) => {
        const regExp = /[&?]list=([^&]+)/;
        const match = url.match(regExp);
        return match ? match[1] : url.trim();
    };

    const [formData, setFormData] = useState({
        playlistId: "",
        price: 0,
        playlistOrder: 1,
        isActive: true,
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value, type, checked } = e.target;

        // تنظيف الرابط
        if (name === "playlistId") value = getPlaylistId(value);

        setFormData(prev => ({
            ...prev,
            // تحويل القيمة لرقم إذا كان الحقل مخصصاً للأرقام
            [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
        }));
    };
    const { t } = useTranslation();

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const postFormData = async () => {
        try {
            setIsLoading(true);

            // الخطوة الأولى: إنشاء الكورس والحصول على البيانات المرجعة (التي تحتوي على ID)
            const response = await addYotubeCourse(formData);
            const courseId = response.data?.course._id;

            // الخطوة الثانية: إذا نجح إنشاء الكورس وكان هناك ملف مختار، ارفعه
            if (courseId && selectedFile) {
                await addNewBook(courseId, selectedFile);
            }

            toast.success("The course and book added successfully");
            closeModal(); // إغلاق المودال عند النجاح التام

            // تصفير البيانات بعد النجاح
            setFormData({ playlistId: "", price: 0, playlistOrder: 1, isActive: true });
            setSelectedFile(null);
        } catch (e: any) {
            console.error(e);
            toast.error(e.message || "Something went wrong, try again");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                {/* 1. الخلفية المعتمة */}
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
                            <Dialog.Panel className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-off-white dark:bg-night-sakura p-8 text-left align-middle shadow-2xl transition-all border border-sakura-pink/30 dark:border-dash-outline/50">
                                {/* زر الإغلاق */}
                                <button
                                    onClick={closeModal}
                                    className="absolute top-6 right-6 text-stone/40 hover:text-deep-pink dark:text-dash-outline dark:hover:text-plum-dark transition-colors outline-none"
                                >
                                    <X size={24} />
                                </button>

                                {/* الرأس */}
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-stone dark:text-petal-glow tracking-tight">
                                        新規コース <span className="text-deep-pink dark:text-plum-dark">追加</span>
                                    </h3>
                                    <p className="text-[10px] text-stone/50 dark:text-dash-outline font-bold mt-1 uppercase tracking-[0.2em]">
                                        {t("courseM.add.text")}
                                    </p>
                                </div>

                                {/* الفورم */}
                                <form className="space-y-5" onSubmit={e => e.preventDefault()}>
                                    {/* رابط القائمة */}
                                    <div className="space-y-1.5">
                                        <label className="flex items-center gap-2 text-[11px] font-bold text-stone/60 dark:text-petal-glow/60 ml-1 uppercase">
                                            <Youtube size={14} /> {t("courseM.url.text")}
                                        </label>
                                        <input
                                            name="playlistId"
                                            value={formData.playlistId}
                                            onChange={e => handleChange(e)}
                                            type="text"
                                            placeholder="https://youtube.com/..."
                                            className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-stone/50 border border-[#e5e1da] dark:border-dash-outline/30 focus:border-sakura-pink dark:focus:border-plum-dark focus:ring-4 focus:ring-sakura-pink/10 outline-none transition-all dark:text-white"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {/* السعر */}
                                        <div className="space-y-1.5">
                                            <label className="flex items-center gap-2 text-[11px] font-bold text-stone/60 dark:text-petal-glow/60 ml-1 uppercase">
                                                <DollarSign size={14} /> {t("courseM.price.text")}
                                            </label>
                                            <input
                                                name="price"
                                                value={formData.price}
                                                onChange={e => handleChange(e)}
                                                type="number"
                                                placeholder="0.00"
                                                className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-stone/50 border border-[#e5e1da] dark:border-dash-outline/30 focus:border-sakura-pink outline-none dark:text-white transition-all"
                                            />
                                        </div>
                                        {/* الترتيب */}
                                        <div className="space-y-1.5">
                                            <label className="flex items-center gap-2 text-[11px] font-bold text-stone/60 dark:text-petal-glow/60 ml-1 uppercase">
                                                <ListOrdered size={14} /> {t("courseM.order.text")}
                                            </label>
                                            <input
                                                value={formData.playlistOrder}
                                                name="playlistOrder"
                                                onChange={e => handleChange(e)}
                                                type="number"
                                                placeholder="1"
                                                className="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-stone/50 border border-[#e5e1da] dark:border-dash-outline/30 focus:border-sakura-pink outline-none dark:text-white transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* الـ Checkbox (الحالة) */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch w-full max-w-2xl">
                                        {/* Component الرفع */}
                                        <FileUpload
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setSelectedFile(e.target.files[0]);
                                                }
                                            }}
                                        />

                                        {/* Component الـ Toggle */}
                                        <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-stone/30 border border-[#e5e1da] dark:border-dash-outline/20 hover:border-sakura-pink transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-sakura-pink/10 dark:bg-plum-dark/10 text-deep-pink">
                                                    <ToggleLeft size={20} />
                                                </div>
                                                <span className="text-sm font-bold text-stone/80 dark:text-petal-glow">
                                                    {t("courseM.active.text")}
                                                </span>
                                            </div>
                                            <input
                                                name="isActive"
                                                checked={formData.isActive}
                                                onChange={e => handleChange(e)}
                                                type="checkbox"
                                                className="w-5 h-5 rounded-md accent-deep-pink dark:accent-plum-dark cursor-pointer shadow-sm transition-transform active:scale-90"
                                            />
                                        </div>
                                    </div>

                                    {/* زر الإضافة */}
                                    <button
                                        disabled={isLoading}
                                        onClick={e => {
                                            e.preventDefault();
                                            postFormData();
                                        }}
                                        type="submit"
                                        className={`w-full py-4 mt-4 cursor-pointer ${
                                            isLoading ? "bg-gray-500" : "bg-deep-pink dark:bg-plum-dark"
                                        } text-white font-bold rounded-2xl shadow-lg shadow-deep-pink/20 dark:shadow-none hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2`}
                                    >
                                        {isLoading && (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        )}
                                        <span>{t("courseM.now.text")}</span>
                                    </button>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default AddCourseModal;
