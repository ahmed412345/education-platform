import { useTranslation } from "react-i18next";

const EmailField = ({ onChange }: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="email"> {t("register.emailLabel.text")} </label>
            <input
                type="email"
                onChange={onChange}
                id="email"
                className="p-2 bg-sakura-pink dark:bg-deep-pink rounded-sm outline-none"
                placeholder={t("register.emailLabel.input")}
            />
        </div>
    );
};

export default EmailField;