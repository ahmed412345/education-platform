import Lottie from "lottie-react";
import loadingJson from "../../assets/loadingChery.json";
import { useEffect, useState } from "react";
import gsap from "gsap";

const LoadingScreen = ({ loading }: any) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (!loading) {
            // البيانات خلصت → نخفي الشاشة بالanimation
            const timer = setTimeout(() => {
                if (document.querySelector("#loadinScreen")) {
                    gsap.to("#loadinScreen", { opacity: 0, duration: 1, onComplete: () => setIsVisible(false) });
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [loading]);

    if (!isVisible) return null;

    return (
        <div id="loadinScreen" className="fixed inset-0 flex items-center justify-center bg-white dark:bg-night-sakura z-60">
            <div className="w-64 h-64">
                <Lottie animationData={loadingJson} loop={true} />
            </div>
        </div>
    );
};

export default LoadingScreen;
