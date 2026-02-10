import { Link } from "react-router-dom";

const Card = ({ url, path, title, Icon, subTitle = "学習" }: any) => {
    return (
        <Link
            to={path}
            style={{ backgroundImage: `url(${url})` }}
            className="group cursor-pointer relative min-h-80 w-full overflow-hidden rounded-2xl border-4 border-dash-outline bg-cover bg-center shadow-lg transition-all duration-500 hover:-translate-y-2 active:scale-90"
        >
            <div className="absolute inset-0 bg-linear-to-t from-night-sakura via-night-sakura/40 to-transparent opacity-100 md:opacity-90 transition-opacity group-hover:opacity-100" />

            <div className="absolute bottom-0 p-5 w-full">
                <span className="font-japan text-sakura-pink text-sm tracking-widest block mb-1">{subTitle}</span>

                <h3 className="font-main text-off-white text-2xl font-bold flex items-center justify-between">
                    {title}
                    <span className="opacity-100 md:opacity-0 transition-all duration-300 transform translate-x-0 md:translate-x-4 group-hover:opacity-100 group-hover:translate-x-0">
                        {Icon}
                    </span>
                </h3>

                <div className="mt-2 h-1 w-full md:w-0 bg-deep-pink transition-all duration-500 group-hover:w-full rounded-full" />
            </div>
        </Link>
    );
};

export default Card;
