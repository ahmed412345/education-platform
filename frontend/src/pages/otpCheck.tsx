import { useState, useRef, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { getOtp, postOtp } from "../services/getOtp";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react";
import { getData } from "../services/getUserData";
import { UserContext } from "../components/context/userProvider";

interface OtpInputProps {
    index: number;
    value: string;
    onChange: (index: number, value: string) => void;
    onKeyDown: (index: number, e: React.KeyboardEvent) => void;
    inputRef: (el: HTMLInputElement | null) => void;
}

const OtpInput = ({ index, value, onChange, onKeyDown, inputRef }: OtpInputProps) => {
    return (
        <input
            ref={inputRef}
            type="text"
            maxLength={1}
            value={value}
            onChange={e => onChange(index, e.target.value)}
            onKeyDown={e => onKeyDown(index, e)}
            className="w-12 h-14 text-center text-2xl font-bold border-2 rounded-xl bg-off-white dark:bg-night-sakura border-sakura-pink dark:border-plum-dark focus:border-deep-pink outline-none transition-all"
        />
    );
};

const OtpCheck = () => {
    const { t } = useTranslation();
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const [isLoading, setIsLoading] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // حساب هل الكود مكتمل أم لا
    const isOtpComplete = otp.join("").length === 6;

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    useEffect(() => {
        const askForOtp = async () => {
            try {
                await getOtp();
            } catch (e: any) {
                if (e.time && e.message) {
                    toast.warning(e.time + t("otp.warning.text"));
                }
            }
        };
        askForOtp();
    }, []);
    const navigate = useNavigate();

    const { setData, setDataLoading } = useContext(UserContext);

    const sendingResult = async (otpString: string) => {
        // منع الإرسال إذا كان أقل من 6 أرقام (زيادة تأكيد)
        if (otpString.length < 6) {
            toast.error(t("otp.failed.text"));
            return;
        }

        try {
            setIsLoading(true);
            toast(t("otp.sended.text"));

            await postOtp(otpString);
            toast.success(t("otp.success.text"));
            //نلاحظ دي مش بتاعت الزرار دي بتاعت حدث التخزين يعني بتتصل تاني بالسيرفر
            await getData(setData, setDataLoading);
            //هحولة للداشبورد
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        } catch (e: any) {
            toast.error(t("otp.failed.text"));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen gap-6">
            <h2 className="text-xl font-bold text-center flex items-center gap-3">
                {t("otp.h2.text")}
                <button onClick={_ => toast.info(t("otp.info.text"))} className="cursor-pointer hover:scale-75 duration-200 active:scale-75">
                    <Info size={25} />
                </button>
            </h2>

            <div className="flex gap-2" dir="ltr">
                {otp.map((digit, index) => (
                    <OtpInput
                        key={index}
                        index={index}
                        value={digit}
                        inputRef={el => (inputRefs.current[index] = el)}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                ))}
            </div>

            <button
                // الزرار يتعطل لو فيه تحميل OR الكود مش كامل
                disabled={isLoading || !isOtpComplete}
                onClick={() => sendingResult(otp.join(""))}
                className={`px-6 py-2.5 rounded-xl font-bold capitalize transition-all duration-300 flex justify-center items-center gap-3 
                    ${
                        isLoading || !isOtpComplete
                            ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-70"
                            : "bg-deep-pink dark:bg-plum-dark text-white hover:bg-opacity-90 hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                    }`}
            >
                {isLoading ? (
                    <>
                        <div className="w-5 h-5 inline-block border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{t("register.loading.text")}</span>
                    </>
                ) : (
                    t("otp.btn.text")
                )}
            </button>
        </main>
    );
};

export default OtpCheck;
