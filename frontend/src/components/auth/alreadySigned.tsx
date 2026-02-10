import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/userProvider";

const AlreadySigned = () => {
    const { data, dataLoading } = useContext(UserContext);

    // استنى نتيجة /me
    if (dataLoading) {
        return null;
    }

    // لو مسجل دخول → رجعه
    if (data) {
        return <Navigate to="/" replace />;
    }

    // لو مش مسجل → دخله
    return <Outlet />;
};

export default AlreadySigned;
