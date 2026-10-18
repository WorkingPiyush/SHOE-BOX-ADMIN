import { createContext, useState, useEffect, useContext } from "react";
import { fetchAdmin } from "../Api/apiUser";


export const AuthCtxt = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const res = await fetchAdmin();
                setUser(res)
            } catch (error) {
                setUser(null);
                console.log(error)
            } finally {
                setLoading(false);
            }
        }

        checkAdmin();
    }, [])
   
    return (
        <AuthCtxt.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthCtxt.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthCtxt);
}