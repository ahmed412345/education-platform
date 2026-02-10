import axios from "axios";
import api from "../api/axiosConfig";

export const getCoursesData = async () => {
    try {
        const response = await api.get("/courses");
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
