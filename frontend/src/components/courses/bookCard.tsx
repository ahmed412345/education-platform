import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { BookOpen, X } from "lucide-react"; // أضفت X للغلق
import { getBook } from "../../services/getBook";
import { useTranslation } from "react-i18next";

interface Book {
    _id: string;
    originalName: string;
    fileUrl: string;
}

const BookIcon = ({ courseId }: { courseId: string }) => {
    const [book, setBook] = useState<Book | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const { t } = useTranslation();

    // دالة لإصلاح ترميز اللغة العربية إذا جاء من المتصفح بشكل خاطئ
    const fixArabicName = (name: string) => {
        try {
            // تحويل النص من latin1 إلى utf-8 برمجياً في الفرونت اند
            return decodeURIComponent(escape(name));
        } catch (e) {
            return name; // إذا فشل التحويل ارجع الاسم كما هو
        }
    };

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setIsLoading(true);
                const resp = await getBook(courseId);
                // تأكد من أن الـ API يعيد بيانات فعلاً
                if (resp?.data && resp.data.length > 0) {
                    setBook(resp.data[0]);
                }
            } catch (err) {
                console.error("Error fetching book:", err);
            } finally {
                setIsLoading(false);
            }
        };
        if (courseId) fetchBook();
    }, [courseId]);

    // إذا كان يحمل أو لا يوجد كتاب، لا ترجع شيئاً
    if (isLoading || !book) return null;

    const displayName = fixArabicName(book.originalName);

    const handleDownload = (url: string, filename: string) => {
        fetch(url)
            .then(res => res.blob()) // نجيب الملف كـ Blob
            .then(blob => {
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = filename; // اسم الملف اللي هيظهر للمستخدم
                link.click();
                window.URL.revokeObjectURL(link.href);
            });
    };

    return (
        <>
            {/* أيقونة الكتاب - إضافة z-50 لضمان الظهور */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed z-50 bottom-6 right-6 p-4 cursor-pointer active:scale-90 rounded-full bg-deep-pink dark:bg-plum-dark text-white shadow-2xl hover:scale-110 transition-all duration-300 animate-bounce-slow"
                title={displayName}
            >
                <BookOpen size={24} />
            </button>

            {/* Popup باستخدام Headless UI */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-100" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm relative border border-gray-100 dark:border-gray-700">
                                <Dialog.Title className="text-lg font-bold text-gray-900 dark:text-white mb-4 pr-6 leading-relaxed">
                                    {displayName}
                                </Dialog.Title>

                                <div className="flex flex-col gap-3">
                                    <a
                                        href={book.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full text-center py-3 bg-deep-pink dark:bg-plum-dark text-white font-bold rounded-xl hover:opacity-90 transition shadow-md"
                                    >
                                        {t("courses.book.text1")}
                                    </a>
                                    <button
                                        onClick={() => handleDownload(book.fileUrl, book.originalName)}
                                        className="w-full text-center cursor-pointer py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                                    >
                                        {" "}
                                        {t("courses.book.text2")}
                                    </button>
                                </div>

                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-deep-pink transition"
                                >
                                    <X size={20} />
                                </button>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default BookIcon;
