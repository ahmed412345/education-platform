import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import FlagsSelect from "react-flags-select";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import i18n from "../../lang/language";

const ARAB_COUNTRIES = [
    { code: "+20", iso: "EG" },
    { code: "+966", iso: "SA" },
    { code: "+249", iso: "SD" },
    { code: "+971", iso: "AE" },
    { code: "+965", iso: "KW" },
    { code: "+964", iso: "IQ" },
    { code: "+974", iso: "QA" },
    { code: "+962", iso: "JO" },
    { code: "+961", iso: "LB" },
    { code: "+212", iso: "MA" },
    { code: "+213", iso: "DZ" },
    { code: "+216", iso: "TN" },
    { code: "+218", iso: "LY" },
    { code: "+968", iso: "OM" },
    { code: "+973", iso: "BH" },
    { code: "+967", iso: "YE" },
    { code: "+970", iso: "PS" },
    { code: "+211", iso: "SS" },
];

type PhoneFieldProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PhoneField = ({ onChange }: PhoneFieldProps) => {
    const { t } = useTranslation();
    const [countryCode, setCountryCode] = useState("EG");
    const [localNumber, setLocalNumber] = useState("");

    // للحصول على الكود الدولي من iso
    const getDialCode = (iso: string) => {
        const country = ARAB_COUNTRIES.find(c => c.iso === iso);
        return country ? country.code : "";
    };

    useEffect(() => {
        const fullNumber = `${getDialCode(countryCode)}${localNumber}`;
        const phoneNumber = parsePhoneNumberFromString(fullNumber);
        const valueToSend = phoneNumber ? phoneNumber.number : fullNumber;

        onChange({
            target: {
                id: "phoneNumber",
                value: valueToSend,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    }, [countryCode, localNumber]);

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="phoneNumber">{t("register.phoneLabel.text")}</label>

            <div className="flex gap-1 items-center justify-center phone-field" dir="ltr">
                <FlagsSelect
                    countries={ARAB_COUNTRIES.map(c => c.iso)}
                    customLabels={ARAB_COUNTRIES.reduce(
                        (acc, c) => {
                            acc[c.iso] = c.code;
                            return acc;
                        },
                        {} as Record<string, string>,
                    )}
                    selected={countryCode}
                    onSelect={code => setCountryCode(code)}
                    placeholder="🌐"
                    // التعديل هنا 👇
                    className="pb-0! text-black!" // بنشيل أي padding bottom افتراضي
                    selectButtonClassName="border-none! bg-sakura-pink! dark:bg-deep-pink! text-black dark:text-off-white!"
                />

                <input
                    type="text"
                    id="phoneNumber"
                    dir={i18n.language === "ar" ? "rtl" : "ltr"}
                    value={localNumber}
                    onChange={e => setLocalNumber(e.target.value.replace(/\D/g, ""))}
                    className="flex-1 p-2 bg-sakura-pink dark:bg-deep-pink  border-none rounded-sm outline-none"
                    placeholder={t("register.phoneLabel.input")}
                />
            </div>
        </div>
    );
};

export default PhoneField;
