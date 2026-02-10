import FeaturesSection from "../components/home/featureSection";
import Hero from "../components/home/heroSection";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { getPosition } from "../util/getSectionPosition";
import { useTranslation } from "react-i18next";
import WhyUsSection from "../components/home/whyUs";
import TestimonialsSection from "../components/home/testSection";
import FinalCTASection from "../components/home/finalCTA";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.normalizeScroll(true);

const Home = () => {
    const { i18n } = useTranslation();

    // تحديد الاتجاه بناءً على اللغة الحالية
    const currentDir = i18n.language === "ar" ? "rtl" : "ltr";

    const screen = useRef(null); // الكاميرا الثابتة (Viewport)

    const container = useRef(null); // السجادة اللي هتتحرك (Zigzag)

    //بجيب كل الاقسام علشان احدد موقعهم بالظبط واروح ليهم
    const section1 = useRef(null);
    const section2 = useRef(null);
    const section3 = useRef(null);
    const section4 = useRef(null);
    const section5 = useRef(null);

    useGSAP(
        () => {
            let mm = gsap.matchMedia();

            // إضافة الشرط للعمل على الشاشات أكبر من 768px فقط
            mm.add("(min-width: 768px)", () => {
                const sec1Vars = getPosition(section1.current, screen.current);
                const sec2Vars = getPosition(section2.current, screen.current);
                const sec3Vars = getPosition(section3.current, screen.current);
                const sec4Vars = getPosition(section4.current, screen.current);
                const sec5Vars = getPosition(section5.current, screen.current);

                const sections = gsap.utils.toArray(".section");
                const staticRatio = 700;

                const timeLine = gsap.timeline({
                    scrollTrigger: {
                        trigger: screen.current,
                        start: "top top",
                        end: () => `+=${sections.length * staticRatio}`,
                        pin: true,
                        scrub: 0.5,
                        fastScrollEnd: false,
                    },
                });

                timeLine
                    .to(container.current, {
                        xPercent: sec1Vars?.moveXPercent,
                        yPercent: sec1Vars?.moveYPercent,
                        scale: 0.9,
                        duration: 1,
                        ease: "power1.inOut",
                    })
                    .to(container.current, {
                        xPercent: sec2Vars?.moveXPercent,
                        yPercent: sec2Vars?.moveYPercent,
                        scale: 1,
                        duration: 1,
                        ease: "power1.inOut",
                    })
                    .to(container.current, {
                        xPercent: sec3Vars?.moveXPercent,
                        yPercent: sec3Vars?.moveYPercent,
                        scale: 1,
                        duration: 1,
                        ease: "power1.inOut",
                    })
                    .to(container.current, {
                        xPercent: sec4Vars?.moveXPercent,
                        yPercent: sec4Vars?.moveYPercent,
                        scale: 1,
                        duration: 1,
                        ease: "power1.inOut",
                    })
                    .to(container.current, {
                        xPercent: sec5Vars?.moveXPercent,
                        yPercent: sec5Vars?.moveYPercent,
                        scale: 1,
                        duration: 1,
                        ease: "power1.inOut",
                    });
            });

            return () => mm.revert(); // تنظيف الأنميشن عند الخروج
        },
        { scope: screen },
    );

    return (
        /* الـ Wrapper ده هو اللي "ماسك" الكاميرا */
        <main ref={screen} dir="ltr" className="w-screen md:h-screen ">
            {/* الـ Container ده هو اللي بيتحرك زجزاج فعلياً */}
            <div ref={container} dir={currentDir} style={{ willChange: "transform" }} className="w-screen md:h-screen">
                <div ref={section1} className="section">
                    <Hero />
                </div>
                <div ref={section2} className=" md:left-150 relative section">
                    <FeaturesSection />
                </div>

                <div ref={section3} className="section w-screen min-h-screen relative md:left-300">
                    <WhyUsSection />
                </div>
                <div ref={section4} className="section w-screen min-h-screen relative md:left-150">
                    <TestimonialsSection />
                </div>
                <div ref={section5} className="section w-screen min-h-screen">
                    <FinalCTASection />
                </div>
            </div>
        </main>
    );
};

export default Home;
