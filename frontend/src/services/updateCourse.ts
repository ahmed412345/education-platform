import axios from "axios";
import api from "../api/axiosConfig";

export const updateCourse = async (id: any, data: any) => {
    try {
        const response = await api.patch("/courses/" + id, data);
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
