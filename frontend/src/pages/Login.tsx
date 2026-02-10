import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import React, { useContext, useState } from "react";

import PassField from "../components/register/passField";
import RemeberField from "../components/register/rememberField";
import { loginSchema } from "../validation/user.schema";
import { zodValidate } from "../util/zod.validation";
import { fieldMsg } from "../util/fieldMsg";
import { toast } from "sonner";
import { getData } from "../services/getUserData";
import { loginUser } from "../services/login";
import LoginBtn from "../components/login/loginBtn";
import FormHelloLogin from "../components/login/formHello";
import EmailField from "../components/register/emailField";
import { UserContext } from "../components/context/userProvider";

const Login = () => {
    const { t } = useTranslation();
    //بيانات الفورم
    const [formData, setFormData] = useState({ email: "", password: "" });
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
            zodValidate(loginSchema, formData);
            //ارسال البيانات ولو فيه مشكله برمي خطأ
            setIsLoading(true);
            const data = await loginUser(formData);
            if (data.status === "success") {
                toast.success(t("login.success.text"));
                //نلاحظ دي مش بتاعت الزرار دي بتاعت حدث التخزين يعني بتتصل تاني بالسيرفر
                await getData(setData, setDataLoading);
                // بنتظر ثانية واحولة
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);
            }
        } catch (e: any) {
            const { message, fieldName } = e;
            if (message && fieldName) {
                fieldMsg(fieldName, message, false);
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
            <form
                onSubmit={handleForm}
                className="flex flex-col md:w-100 w-auto gap-5 bg-off-white dark:bg-night-sakura  shadow-lg shadow-black/30 rounded-2xl p-5"
            >
                <FormHelloLogin />
                <div className="flex flex-col gap-4">
                    <EmailField onChange={handleChange} />
                    <PassField onChange={handleChange} />
                    <RemeberField /> {/*المفروض هبعت دي بردو*/}
                </div>
                <div>
                    <div className="flex flex-col justify-center gap-4">
                        <LoginBtn isLoading={isLoading} />
                        <div className="flex gap-2">
                            <span>{t("login.span.text")}</span>
                            <Link to="/register" className="capitalize hover:text-deep-pink hover:scale-105 active:scale-95">
                                {t("login.link.text")}
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    );
};
export default Login;

//المفروض هعدل الللغه فيها لان كلهم تبع register
