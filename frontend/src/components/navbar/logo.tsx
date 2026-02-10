import { useLocation } from "react-router-dom";

const LogoElement = ({ logo }: { logo: string }) => {
    const loca = useLocation();

    return (
        <div className="flex items-center">
            <img className="w-15" fetchPriority="high" src={logo} alt="sakura-logo" />
            <div className="flex flex-col">
                <span className="capitalize text-xl text-deep-pink dark:text-sakura-pink">noura</span>
                <span className={`capitalize ${loca.pathname === "/" || loca.pathname === "/home" ? "text-off-white" : ""} text-xs ml-5`}>
                    sensei
                </span>
            </div>
        </div>
    );
};

export default LogoElement;
