import { useTranslation } from "react-i18next";

const RemeberField = () => {
    const { t } = useTranslation();
    return (
        <div className="flex gap-2">
            <input type="checkbox" defaultChecked id="remeber" className="w-5 h-5 accent-deep-pink cursor-pointer dark:accent-plum-dark" />
            <label htmlFor="remeber">{t("register.checkBox.text")}</label>
        </div>
    );
};
export default RemeberField;
