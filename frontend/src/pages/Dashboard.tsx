import Card from "../components/dashboard/cards";
import DashboardOutline from "../layouts/dashOutline";

import courseImg from "../assets/images/courses.png";
import userControl from "../assets/images/userControl.png";
import coursesControl from "../assets/images/coursesC.png";

import { useTranslation } from "react-i18next";
import { Clover, Settings, UserRoundCog } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../components/context/userProvider";

const Dashboard = () => {
    const { t } = useTranslation();
    const { data } = useContext(UserContext);
    return (
        <main>
            <DashboardOutline>
                <Card path="/courses" url={courseImg} Icon={<Clover />} title={t("dashboard.card1.text")} subTitle="講座" />
                {data.role === "admin" && (
                    <>
                        <Card
                            path="/userManagement"
                            url={userControl}
                            Icon={<UserRoundCog />}
                            title={t("dashboard.card2.text")}
                            subTitle="ユーザー管理"
                        />
                        <Card
                            path="/coursesManagement"
                            url={coursesControl}
                            Icon={<Settings />}
                            title={t("dashboard.card3.text")}
                            subTitle="コース管理"
                        />
                    </>
                )}
            </DashboardOutline>
        </main>
    );
};

export default Dashboard;
