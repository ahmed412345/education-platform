import { useEffect, useMemo, useState } from "react";
import { getAllUsers } from "../services/getAllUsers";
import DashboardOutline from "../layouts/dashOutline";
import { useTranslation } from "react-i18next";
import UserCard from "../components/magament/userCard";
import { toast } from "sonner";

const UserManagement = () => {
    const { t } = useTranslation();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getUsers = async () => {
            try {
                setLoading(true);
                const response = await getAllUsers();

                if (response && response.data) {
                    setUsers(response.data);
                } else {
                    setUsers([]);
                }
            } catch (error) {
                toast.error(t("courses.fail.text")); // عرض الخطأ بشكل فعلي
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, [t]);

    //البحث
    const [searchText, setSearchText] = useState<string>("");

    const filterdUsers = useMemo(() => {
        return users.filter(user => {
            return user.fullName?.toLowerCase().includes(searchText) || user.phoneNumber?.toLowerCase().includes(searchText);
        });
    }, [searchText, users]);
    return (
        <DashboardOutline>
            {loading ? (
                <div className="flex justify-center items-center p-20 animate-pulse font-main">{t("courses.loading.text") || "Loading data..."}</div>
            ) : users.length > 0 ? (
                // التعديل هنا: الـ map بترجع مجموعة عناصر داخل Fragments أو div
                <div className="p-2">
                    <div className="flex gap-2 mb-3">
                        <input
                            onChange={e => {
                                return setSearchText(e.target.value);
                            }}
                            type="text"
                            className="w-full h-10 outline-none border-2 border-plum-dark rounded-md p-1 text-2xl grow-18 flex-1"
                            placeholder={t("management.search.text")}
                        />
                    </div>
                    <div className="flex flex-col">
                        {filterdUsers.map((el: any) => (
                            <UserCard key={el._id} el={el} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center p-20 text-gray-500 dark:text-gray-400 font-main">{t("management.noUsers.text") || "No users found"}</div>
            )}
        </DashboardOutline>
    );
};

export default UserManagement;
