import { useContext, useEffect } from "react";
import bgDesktop from "../../assets/videos/bg-desktop.webm";

import altBg from "../../assets/images/altBg.webp";
import JoinDashbtn from "./joinDashboardbtn";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import Navbar from "../navbar/navbar";
import { UserContext } from "../context/userProvider";

const Hero = () => {
    const { dataLoading } = useContext(UserContext);
    const { t } = useTranslation();

    // Animate elements from bottom
    useEffect(() => {
        if (!dataLoading) {
            const timer = setTimeout(() => {
                gsap.fromTo(".animate-item", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.5, ease: "back.out" });
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [dataLoading]);

    return (
        <section className={`w-screen min-h-screen relative flex items-center justify-center md:justify-start`}>
            <Navbar />
            <div className="absolute inset-0 bg-black/10 z-10"></div>
            <div>
                <img src={altBg} className="absolute inset-0 w-full h-full object-cover object-bottom-left md:hidden" />{" "}
                <video
                    loop
                    autoPlay
                    muted
                    playsInline
                    poster={altBg}
                    className="absolute inset-0 w-full h-full object-cover object-bottom-left hidden md:block"
                >
                    <source src={bgDesktop} type="video/webm" />
                </video>
            </div>
            <div className="relative z-20 flex flex-col mb-[10vh] items-center md:items-start md:mx-20 justify-center px-4 md:text-left">
                <h2 className="text-off-white text-4xl md:text-6xl text-center md:text-left font-bold mb-4 animate-item">
                    {t("home.hero.span.text")}
                </h2>
                <h1 className="relative text-off-white text-4xl md:text-6xl text-center md:text-left font-bold mb-4 animate-item">
                    {t("home.hero.h1.text")}
                </h1>
                <p className="text-off-white/90 text-sm md:text-lg text-center md:text-left max-w-xl leading-relaxed mb-6 animate-item">
                    {t("home.hero.p.text")}
                </p>
                <div className="flex gap-4 w-full items-center justify-start animate-item">
                    <JoinDashbtn />
                </div>
            </div>
        </section>
    );
};

export default Hero;
