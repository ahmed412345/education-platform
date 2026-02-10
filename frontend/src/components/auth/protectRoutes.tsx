import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../context/userProvider";

const ProtectedRoute = () => {
    // افترضنا إن عندك حالة اسمها loading جوه الـ Context
    const { data, dataLoading } = useContext(UserContext);
    const location = useLocation();

    // 1. لو لسه بنحمل البيانات، ما تعملش Redirect.. استنى
    if (dataLoading) {
        return null;
    }

    // 2. لو مفيش بيانات مستخدم خالص
    if (!data) {
        return <Navigate to="/login" replace />;
    }

    // 3. لو مسجل بس لسه ما فعلش الحساب (OTP)
    if (!data.isActive && location.pathname !== "/otp-check") {
        return <Navigate to="/otp-check" replace />;
    }

    // 4. لو كله تمام، ادخل الصفحة
    return <Outlet />;
};

export default ProtectedRoute;
