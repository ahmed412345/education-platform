import { createContext, useEffect, useState } from "react";
import { getData } from "../../services/getUserData";

export const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: any) => {
    const [data, setData] = useState(null);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        getData(setData, setDataLoading);
    }, []);

    //انا مررت لها حالتين والمفروض استدعيهم لما اجي اجيب بيانات المستخدم من ME
    return <UserContext.Provider value={{ data, setData, dataLoading, setDataLoading }}>{children}</UserContext.Provider>;
};
