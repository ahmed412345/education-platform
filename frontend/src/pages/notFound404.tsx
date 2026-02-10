import Lottie from "lottie-react";
import notFound from "../assets/notFound.json";

const NotFounded = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-night-sakura z-5">
            <div className="w-64 h-64">
                <Lottie animationData={notFound} loop={true} />
            </div>
        </div>
    );
};

export default NotFounded;
