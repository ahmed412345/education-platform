import { useEffect, useState } from "react";
import DashboardOutline from "../layouts/dashOutline";
import { getCoursesData } from "../services/getCourses";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import CourseCard from "../components/courses/courseCard";

const Courses = () => {
    // 1. خلي الحالة الابتدائية مصفوفة فاضية عشان الـ map متضربش
    const [courseData, setCourseData] = useState<any[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchCourses = () => {
            toast.promise(getCoursesData(), {
                loading: t("courses.loading.text"),
                success: (arrayData: any) => {
                    setCourseData(arrayData.data);
                    return t("courses.success.text");
                },
                error: t("courses.fail.text"),
            });
        };

        fetchCourses();
    }, []);

    return (
        <main>
            <DashboardOutline>
                {courseData && courseData.length > 0 ? (
                    courseData.map(course => (
                        <CourseCard
                            _id={course._id}
                            key={course._id}
                            title={course.title}
                            description={course.description}
                            thumbnail={course.thumbnail}
                            price={course.price}
                            order={course.order}
                            isActive={course.isActive}
                            isPurchased={course.playlistId}
                        />
                    ))
                ) : (
                    // حالة لو مفيش بيانات لسه وصلت
                    <div className="col-span-full text-center text-off-white/50 py-20 font-main">
                        {courseData.length === 0 && t("courses.noCourses.text")}
                    </div>
                )}
            </DashboardOutline>
        </main>
    );
};

export default Courses;
