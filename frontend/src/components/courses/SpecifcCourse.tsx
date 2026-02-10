import { useEffect, useState } from "react";
import DashboardOutline from "../../layouts/dashOutline";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { getLessons } from "../../services/getLessons";
import { useParams } from "react-router-dom";
import LessonCard from "./lessonCard";
import BookIcon from "./bookCard";

const SpecificCourse = () => {
    // 1. خلي الحالة الابتدائية مصفوفة فاضية عشان الـ map متضربش
    const [courseData, setCourseData] = useState<any[]>([]);

    const { t } = useTranslation();

    const { courseId }: any = useParams();

    useEffect(() => {
        const fetchCourses = () => {
            toast.promise(getLessons(courseId), {
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
                <BookIcon courseId={courseId}></BookIcon>
                {courseData && courseData.length > 0 ? (
                    courseData.map(lesson => (
                        <LessonCard
                            _id={lesson._id}
                            key={lesson._id}
                            title={lesson.title}
                            videoUrl={lesson.videoUrl}
                            thumbnail={lesson.thumbnail}
                            order={lesson.order}
                            isActive={true}
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

export default SpecificCourse;
