import { LogOut } from "lucide-react";
import { logout } from "../../services/logout";

const LogoutButton = () => {
    const handleLogout = async () => {
        // تنفيذ الخروج
        localStorage.clear();
        await logout();
        window.location.reload();
    };

    return (
        <button
            onClick={handleLogout}
            className="group cursor-pointer relative flex items-center justify-center gap-2 px-6 py-2 overflow-hidden rounded-xl duration-300 active:scale-95 border
                /* وضع الوايت مود (Light) */
                bg-red-50 border-red-200 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600
                /* وضع الدارك مود (Dark) */
                dark:bg-stone dark:border-red-500/30 dark:text-red-500 dark:hover:bg-red-500 dark:hover:text-off-white"
        >
            {/* الأيقونة مع حركة خروج بسيطة عند الهوفر */}
            <LogOut size={18} className="transition-transform duration-300 group-hover:translate-x-1" />

            {/* تأثير لمعة خفيف يظهر فقط في الدارك مود عند الهوفر */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </button>
    );
};

export default LogoutButton;
