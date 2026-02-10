import axios from "axios";
import api from "../api/axiosConfig";

export const getOtp = async () => {
    try {
        const response = await api.get("/users/register/activate");
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
export const postOtp = async (otp: string) => {
    try {
        const response = await api.post("/users/register/activate", { code: otp } as object);
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
