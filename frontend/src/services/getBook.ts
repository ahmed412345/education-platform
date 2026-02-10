import axios from "axios";
import api from "../api/axiosConfig";

export const getBook = async (id: string) => {
    try {
        const response = await api.get(`/courses/${id}/books`);
        return response.data;
    } catch (error: unknown) {
        // التحقق مما إذا كان الخطأ قادم من أكسيوس
        if (axios.isAxiosError(error)) {
            throw error.response?.data || error; // مهم جداً عشان الـ Try/Catch في المكون تحس بالخطأ
        } else {
            throw error;
        }
    }
};
