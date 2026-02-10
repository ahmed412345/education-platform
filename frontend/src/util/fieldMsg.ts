import { toast } from "sonner";

export const fieldMsg = (elId: string, message: string, returnMsg = true) => {
    toast.error(message);
    if (!returnMsg) return;
    const el = document.getElementById(elId) as HTMLInputElement;
    el.setCustomValidity(message);
    el.reportValidity();
    // تصفير الخطأ عند الكتابة لتجنب تعليق الفورم
    el.oninput = () => el.setCustomValidity("");
};
