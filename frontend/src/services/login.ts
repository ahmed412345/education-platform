import axios from "axios";
import api from "../api/axiosConfig";

export const loginUser = async (userData: { email: string; password: string }) => {
    try {
        const response = await api.post("/users/login", userData);
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
