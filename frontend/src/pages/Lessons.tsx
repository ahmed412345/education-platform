import { useEffect, useState } from "react";
import DashboardOutline from "../layouts/dashOutline";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { getSpesificLessons } from "../services/getLessons";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/courses/videoPlayer";

const SpecificLesson = () => {
    const [lessonData, setlessonData] = useState<any>(null);
    const { t } = useTranslation();
    const { lessonId } = useParams<{ lessonId: string }>(); // TypeScript hint

    //المكتبة عاوز ال id مباشرتا
    const getYoutubeID = (url: string) => {
        if (!url) return ""; // حماية لو الرابط مش موجود
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : url;
    };

    useEffect(() => {
        if (!lessonId) return; // حماية لو الـ ID مجاش من الـ URL

        const fetchLesson = () => {
            toast.promise(getSpesificLessons(lessonId), {
                loading: t("courses.loading.text"),
                success: (object: any) => {
                    setlessonData(object);
                    console.log(object);
                    return t("courses.success.text");
                },
                error: t("courses.fail.text"),
            });
        };

        fetchLesson();
    }, [lessonId]); // ضيفنا lessonId في الـ dependencies لضمان التحديث لو اتغير

    // داخل صفحة SpecificLesson.tsx
    return (
        <main>
            <DashboardOutline>
                {lessonData && lessonData.videoUrl ? (
                    <div className=" px-4">
                        <VideoPlayer videoId={getYoutubeID(lessonData.videoUrl)} />

                        <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                            <h1 className="text-2xl md:text-3xl font-bold mb-4" dir="rtl">
                                {lessonData.title}
                            </h1>
                        </div>
                    </div>
                ) : null}
            </DashboardOutline>
        </main>
    );
};

export default SpecificLesson;
