import axios from "axios";
import api from "../api/axiosConfig";

/**
 * @param courseId - المعرف الخاص بالكورس الذي تم إنشاؤه
 * @param bookFile - ملف الكتاب المستلم من الـ Input
 */
export const addNewBook = async (courseId: string, bookFile: File) => {
    try {
        // نستخدم FormData لرفع الملفات
        const formData = new FormData();

        // إنشاء Blob بنفس النوع MIME للملف الأصلي
        const blob = new Blob([bookFile], { type: bookFile.type });

        // نضيف الـ blob للـ FormData مع الاسم العربي الصحيح
        formData.append("document", blob, bookFile.name);

        const response = await api.post(`/courses/${courseId}/books`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || error;
        } else {
            console.error("Unexpected Error:", error);
            throw error;
        }
    }
};
