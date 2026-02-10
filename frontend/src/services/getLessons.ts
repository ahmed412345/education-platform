import axios from "axios";
import api from "../api/axiosConfig";

export const getLessons = async (id: string) => {
    try {
        const response = await api.get("/courses/" + id + "/lessons");
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

export const getSpesificLessons = async (id: string) => {
    try {
        const response = await api.get("/lessons/" + id);
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
