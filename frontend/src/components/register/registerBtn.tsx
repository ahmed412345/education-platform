import { useTranslation } from "react-i18next";

const RegisterBtn = ({ isLoading }: { isLoading: boolean }) => {
    const { t } = useTranslation();
    return (
        <button
            disabled={isLoading}
            type="submit"
            className={`bg-deep-pink text-center ${
                isLoading ? "brightness-75" : ""
            }  dark:bg-plum-dark text-white px-6 py-2.5 rounded-xl font-bold capitalize transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg  hover:scale-105 active:scale-95 cursor-pointer flex justify-center items-center gap-3`}
        >
            {isLoading ? (
                <>
                    <div className="w-5 h-5 inline-block border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{t("register.loading.text")}</span>
                </>
            ) : (
                t("register.regBtn.text")
            )}
        </button>
    );
};
export default RegisterBtn;
