import { Eye, EyeClosed } from "lucide-react";

const MakePassVisable = ({ isVisable, setIsVisable }: any) => {
    return (
        <button type="button" className={`z-1 cursor-pointer`} onClick={_ => setIsVisable(!isVisable)}>
            {isVisable ? (
                <Eye size={25} className=" hover:scale-90 active:scale-90" />
            ) : (
                <EyeClosed size={25} className="hover:scale-90 active:scale-90" />
            )}
        </button>
    );
};
export default MakePassVisable;
