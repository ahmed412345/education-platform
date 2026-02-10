import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import React, { useContext, useState } from "react";

import PhoneField from "../components/register/phoneField";
import NameField from "../components/register/nameField";
import PassField from "../components/register/passField";
import FormHello from "../components/register/formHello";
import RemeberField from "../components/register/rememberField";
import RegisterBtn from "../components/register/registerBtn";
import { registerUser } from "../services/register";
import { registerSchema } from "../validation/user.schema";
import { zodValidate } from "../util/zod.validation";
import { fieldMsg } from "../util/fieldMsg";
import { toast } from "sonner";
import { getData } from "../services/getUserData";
import EmailField from "../components/register/emailField";
import { UserContext } from "../components/context/userProvider";
const Register = () => {
    const { t } = useTranslation();
    //بيانات الفورم
    const [formData, setFormData] = useState({ fullName: "", phoneNumber: "", password: "", email: "" });
    //علشان امنع المستخدم يضغط علي الزرار والبيانات لسا بتتبعت
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target; // بنسحب الـ id بتاع الـ input وقيمته
        setFormData(prev => ({
            ...prev, // بنسخ البيانات القديمة عشان متمسحش
            [id]: value, // بتحدث فقط الحقل اللي اتغير (fullName أو password مثلاً)
        }));
    };

    const navigate = useNavigate();

    //دي فيها تعديل بيانات المستخدم
    const { setData, setDataLoading } = useContext(UserContext);
    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            //بتحقق من البيانات قبل ما ابعتها
            zodValidate(registerSchema, formData);
            //ارسال البيانات ولو فيه مشكله برمي خطأ
            setIsLoading(true);
            const data = await registerUser(formData);
            if (data.status === "success") {
                toast.success(t("register.success.text"));
                //نلاحظ دي مش بتاعت الزرار دي بتاعت حدث التخزين يعني بتتصل تاني بالسيرفر
                await getData(setData, setDataLoading);
                // بنتظر ثانية واحولة
                localStorage.setItem("hasSigned", "true");
                setTimeout(() => {
                    navigate("/otp-check");
                }, 1000);
            }
        } catch (e: any) {
            const { message, fieldName } = e;
            if (message && fieldName) {
                fieldMsg(fieldName, message);
            } else {
                //هنا هعمل حساب الاخطاء الغير متوقعه
                toast.error(t("register.failed.text"));
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex justify-center min-h-screen items-center">
            <form onSubmit={handleForm} className="flex flex-col gap-5 bg-off-white dark:bg-night-sakura  shadow-lg shadow-black/30 rounded-2xl p-5">
                <FormHello />
                <div className="flex flex-col gap-4">
                    <NameField onChange={handleChange} />
                    <PhoneField onChange={handleChange} />
                    <EmailField onChange={handleChange} />
                    <PassField onChange={handleChange} />
                    <RemeberField /> {/*المفروض هبعت دي بردو*/}
                </div>
                <div>
                    <div className="flex flex-col justify-center gap-4">
                        <RegisterBtn isLoading={isLoading} />
                        <div className="flex gap-2">
                            <span>{t("register.span.text")}</span>
                            <Link to="/login" className="capitalize hover:text-deep-pink hover:scale-105 active:scale-95">
                                {t("register.link.text")}
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    );
};
export default Register;
