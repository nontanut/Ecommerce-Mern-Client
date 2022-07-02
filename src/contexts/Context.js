import { createContext, useEffect, useState } from "react";
import GetProducts from "../components/api/Products";
import User from "../components/api/User";
import { getToken } from "../components/service/authorize";
import Category from "../components/api/Category";

export const DataContext = createContext();

export const DataProvider = ({children}) => {
    const [token, setToken] = useState(false);

    // get user data and access token
    useEffect(() => {
        setToken(getToken);
    }, [])
    
    const state = {
        token: [token, setToken],
        getProducts: GetProducts(),
        user: User(token),
        category: Category()
    }
    return (
        <DataContext.Provider value={state}>
            {children}
        </DataContext.Provider>
    )
}