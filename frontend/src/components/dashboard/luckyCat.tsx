import Lottie from "lottie-react";
import luckyCat from "../../assets/LuckyCat.json";

const LuckyCat = () => {
    return (
        <div className="flex items-center justify-center bg-white dark:bg-night-sakura ">
            <div className="w-64 h-64 dark:invert-100">
                <Lottie animationData={luckyCat} loop={true} />
            </div>
        </div>
    );
};

export default LuckyCat;
