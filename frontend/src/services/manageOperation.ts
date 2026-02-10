import axios from "axios";
import api from "../api/axiosConfig";

const operation = async (method: "post" | "patch" | "get" | "delete", endpoint: string, body = {}) => {
    try {
        // نستخدم [method] عشان نضمن إننا بننادي الدالة من جوا الكائن api
        const response = await api[method](endpoint, body);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            // بنرجع الـ data اللي جاية من الباك إند (اللي فيها رسالة الخطأ)
            throw error.response?.data || error;
        }
        throw error;
    }
};

export const blockUser = (userId: string) => operation("patch", `/users/block/${userId}`);

export const unblockUser = (userId: string) => operation("patch", `/users/unblock/${userId}`);

export const editUserName = async (userId: string, fullName: string) => {
    await operation("patch", `/users/${userId}`, { fullName });
};

export const updateUserCourses = (userId: string, coursesIds: string[]) => operation("post", "/updateUserCourses", { userId, coursesIds });
