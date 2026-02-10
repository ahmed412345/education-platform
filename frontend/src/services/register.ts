import axios from "axios";
import api from "../api/axiosConfig";

export const registerUser = async (userData: { fullName: string; phoneNumber: string; password: string }) => {
    try {
        const response = await api.post("/users/register", userData);
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
