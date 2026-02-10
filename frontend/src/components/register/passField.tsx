import { useTranslation } from "react-i18next";
import MakePassVisable from "./showPass";
import { useState } from "react";

const PassField = ({ onChange }: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    const { t } = useTranslation();
    //الباسوورد ظاهر ؟
    const [isVisable, setIsVisable] = useState(false);

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="password"> {t("register.passLabel.text")} </label>
            <div className="flex items-center gap-2">
                <input
                    type={isVisable ? "text" : "password"}
                    onChange={onChange}
                    id="password"
                    className="p-2 bg-sakura-pink dark:bg-deep-pink rounded-sm outline-none grow-20"
                    placeholder={t("register.passLabel.input")}
                />
                <div className="grow flex justify-center items-center">
                    <MakePassVisable isVisable={isVisable} setIsVisable={setIsVisable} />
                </div>
            </div>
        </div>
    );
};
export default PassField;
