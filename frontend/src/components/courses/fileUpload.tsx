import { BookUp, FileText, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const FileUpload = ({ onChange }: any) => {
    const { t } = useTranslation();
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            onChange(e); // تمرير الحدث للأب
        }
    };

    const clearFile = (e: React.MouseEvent) => {
        e.preventDefault();
        setFileName(null);
        onChange({ target: { name: "document", files: null } }); // الاسم مطابق لـ FormData
    };

    return (
        <div className="flex-1">
            <label className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-stone/30 border border-[#e5e1da] dark:border-dash-outline/20 hover:border-sakura-pink transition-all cursor-pointer group h-full overflow-hidden">
                <div
                    className={`p-2 rounded-lg transition-colors ${fileName ? "bg-green-100 dark:bg-green-900/20" : "bg-sakura-pink/10 group-hover:bg-sakura-pink/20"}`}
                >
                    {fileName ? <FileText className="text-green-600" size={20} /> : <BookUp className="text-deep-pink" size={20} />}
                </div>

                <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-sm font-bold text-stone/80 dark:text-petal-glow truncate">{fileName ?? t("courseM.file.text")}</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                        {fileName ? t("common.readyToUpload") || "Ready to upload" : "PDF"}
                    </span>
                </div>

                {fileName && (
                    <button onClick={clearFile} className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full text-red-500 transition-colors">
                        <X size={16} />
                    </button>
                )}

                <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf" />
            </label>
        </div>
    );
};

export default FileUpload;
