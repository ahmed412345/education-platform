import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/navbar/navbar";
import Courses from "./pages/Courses";
import "./lang/language";
import Register from "./pages/register";
import OtpCheck from "./pages/otpCheck";
import { Toaster } from "sonner";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/auth/protectRoutes";
import NotFounded from "./pages/notFound404";
import AlreadySigned from "./components/auth/alreadySigned";
import { useContext } from "react";
import SpecificCourse from "./components/courses/SpecifcCourse";
import SpecificLesson from "./pages/Lessons";
import Login from "./pages/Login";
import UserManagement from "./pages/userManagement";
import CoursesManagement from "./pages/CoursesManagement";
import OnlyAdmin from "./components/auth/onlyAdmin";
import Footer from "./components/home/footer";
import { UserContext } from "./components/context/userProvider";
import LoadingScreen from "./components/loading/loadingScreen";

function App() {
    const loca = useLocation(); //بتراقب اي تغيير في المسار الي فوق وترجعه فورا
    const { dataLoading } = useContext(UserContext);

    const condForHideName = loca.pathname === "/" || loca.pathname === "home";

    return (
        <div className="bg-off-white dark:bg-night-sakura text-black dark:text-white min-h-screen font-main ">
            <Toaster theme={document.documentElement.classList.contains("dark") ? "dark" : "light"} richColors position="top-left" />

            {!condForHideName && <Navbar />}
            <LoadingScreen key={loca.pathname} loading={dataLoading} />
            <Routes>
                {/* متاحة للجميع */}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />

                {/* المفروض لو هو مسجل دخول امنه انه يروح لتسجيل الدخول او للتسجيل */}

                <Route element={<AlreadySigned />}>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Route>

                {/* متاحة بس بعد التسجيل */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/courses/:courseId" element={<SpecificCourse />} />
                    <Route path="/courses/lesson/:lessonId" element={<SpecificLesson />} />
                    <Route path="/otp-check" element={<OtpCheck />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>

                {/*  صفحات متاحة للادمن بس */}
                <Route element={<OnlyAdmin />}>
                    <Route path="/userManagement" element={<UserManagement />} />
                    <Route path="/coursesManagement" element={<CoursesManagement />} />
                </Route>

                {/* في حالة كتابه مسار خاطئ */}
                <Route path="*" element={<NotFounded />} />
            </Routes>
            {condForHideName && <Footer />}
        </div>
    );
}

export default App;
