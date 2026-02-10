import axios from "axios";
import api from "../api/axiosConfig";

export const getUserData = async () => {
    try {
        const response = await api.get("/me");

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

export const getData = async (setData: Function, setIsLoading: Function) => {
    try {
        setIsLoading(true);
        const result = await getUserData();
        setData(result.data || null);
    } catch (e) {
        console.log(e);
    } finally {
        setIsLoading(false);
    }
};
