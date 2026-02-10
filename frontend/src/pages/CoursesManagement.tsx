import { Plus, Settings2 } from "lucide-react";
import AddCManageCard from "../components/courses/manageCard";
import DashboardOutline from "../layouts/dashOutline";
import { useTranslation } from "react-i18next";
import AddCourseModal from "../components/courses/popAddYouCourse";
import { useState } from "react";
import ManageCoursesModal from "../components/courses/popEditCourses";

const CoursesManagement = () => {
    const { t } = useTranslation();
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    return (
        <DashboardOutline>
            <div onClick={() => setIsAddOpen(true)}>
                <AddCManageCard
                    icon={
                        <Plus
                            size={35}
                            className="text-[#d1cfca] dark:text-off-white group-hover:text-sakura-pink dark:group-hover:text-plum-dark transition-colors duration-500"
                            strokeWidth={1.5}
                        />
                    }
                    title={t("courseM.add.text")}
                />
            </div>
            <div onClick={() => setIsEditOpen(true)}>
                <AddCManageCard
                    icon={
                        <Settings2
                            size={35}
                            className="text-[#d1cfca] dark:text-off-white group-hover:text-sakura-pink dark:group-hover:text-plum-dark transition-colors duration-500"
                            strokeWidth={1.5}
                        />
                    }
                    title={t("courseM.settings.text")}
                />
            </div>
            <AddCourseModal isOpen={isAddOpen} setIsOpen={setIsAddOpen} />

            <ManageCoursesModal isOpen={isEditOpen} setIsOpen={setIsEditOpen} />
        </DashboardOutline>
    );
};

export default CoursesManagement;
