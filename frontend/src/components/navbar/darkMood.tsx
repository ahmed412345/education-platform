import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const DarkModeToggle = () => {
    const [isDark, setIsDark] = useState(() => {
        return (
            localStorage.getItem("theme") === "dark" || (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
        );
    });
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);
    return (
        <>
            <button
                onClick={_ => setIsDark(!isDark)}
                className="relative p-2 w-10 h-10 flex items-center justify-center rounded-lg ring-2 md:ring-0 hover:ring-2 ring-sakura-pink dark:ring-deep-pink transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
                aria-label="Toggle Dark Mode"
            >
                {isDark ? <Sun className="text-amber-300" size={40} /> : <Moon size={40} />}
            </button>
        </>
    );
};

export default DarkModeToggle;
