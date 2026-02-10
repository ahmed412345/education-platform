import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/userProvider";

const OnlyAdmin = () => {
    const { data, dataLoading } = useContext(UserContext);

    if (dataLoading) {
        return null;
    }

    if (data?.role !== "admin") {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default OnlyAdmin;
