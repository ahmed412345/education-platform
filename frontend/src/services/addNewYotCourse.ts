import axios from "axios";
import api from "../api/axiosConfig";

export const addYotubeCourse = async (formData: { playlistId: string; price: number; playlistOrder: number; isActive: boolean }) => {
    try {
        const response = await api.post("/asyncYoutube", formData);
        return response.data;
    } catch (error: unknown) {
        // التحقق مما إذا كان الخطأ قادم من أكسيوس
        if (axios.isAxiosError(error)) {
            throw error.response?.data || error; // مهم جداً عشان الـ Try/Catch في المكون تحس بالخطأ
        } else {
            console.error("Unexpected Error:", error);
            throw error;
        }
    }
};
