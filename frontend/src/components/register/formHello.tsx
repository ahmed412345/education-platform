import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";

import asianWoman from "../../assets/asainw.json";

const FormHello = () => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-5xl text-center max-w-md">{t("register.h1.text")}</h1>
            <div className="flex justify-center">
                <div className="overflow-clip flex justify-center aspect-square w-50">
                    <Lottie className=" scale-200" animationData={asianWoman} loop={true} style={{ width: "100%", height: "100%" }} />
                </div>
            </div>
        </div>
    );
};
export default FormHello;
