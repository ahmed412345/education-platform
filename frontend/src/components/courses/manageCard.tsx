const AddCManageCard = ({ icon, title }: any) => {
    return (
        <div
            className="group relative w-full h-70 flex flex-col items-center justify-center 
                        /* الألوان في الوضع الفاتح */
                        bg-off-white border-2 border-[#e5e1da] 
                        /* الألوان في الوضع المظلم */
                        dark:bg-night-sakura dark:border-dash-outline
                        /* تأثيرات التفاعل */
                        transition-all duration-500 cursor-pointer overflow-hidden rounded-3xl
                        hover:border-sakura-pink dark:hover:border-plum-dark
                        shadow-2xl active:scale-90"
        >
            {/* زخرفة خلفية (Glow Effect) */}
            <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700">
                {/* توهج علوي */}
                <div
                    className="absolute top-5 right-10 w-4 h-4 rounded-full blur-xl animate-pulse
                                bg-sakura-pink dark:bg-plum-dark"
                ></div>
                {/* توهج سفلي */}
                <div
                    className="absolute bottom-10 left-10 w-8 h-8 rounded-full blur-2xl
                                bg-petal-glow dark:bg-dash-outline/40"
                ></div>
            </div>

            {/* الدائرة المركزية (Plus Icon) */}
            <div
                className="relative z-1 w-20 h-20 flex items-center justify-center rounded-full 
                            bg-white dark:bg-stone border border-[#eee] dark:border-dash-outline/50 
                            shadow-sm transition-all duration-500
                            group-hover:scale-110 group-hover:border-sakura-pink dark:group-hover:border-plum-dark"
            >
                {icon}
            </div>

            {/* نصوص البطاقة */}
            <div className="mt-6 text-center z-10">
                <p
                    className="mt-1 text-sm font-medium transition-colors duration-300
                              text-night-sakura dark:text-off-white
                              group-hover:text-stone dark:group-hover:text-petal-glow"
                >
                    {title}
                </p>
            </div>
        </div>
    );
};

export default AddCManageCard;
