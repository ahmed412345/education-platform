import { useTranslation } from "react-i18next";

const NameField = ({ onChange }: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="fullName"> {t("register.nameLabel.text")} </label>
            <input
                type="text"
                onChange={onChange}
                id="fullName"
                className="p-2 bg-sakura-pink dark:bg-deep-pink rounded-sm outline-none"
                placeholder={t("register.nameLabel.input")}
            />
        </div>
    );
};
export default NameField;
