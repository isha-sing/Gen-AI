import { createContext,useState, useEffect } from "react";
import { getMe } from "./services/auth.api.js";

export const AuthContext = createContext()


export const AuthProvider = ({ children }) => { 

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getMe();
                // Check karein response structure data.user hai ya directly data
                if (data?.user) {
                    setUser(data.user);
                } else if (data) {
                    setUser(data);
                }
            } catch (err) {
                console.error("Auth check failed:", err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);


    return (
        <AuthContext.Provider value={{user,setUser,loading,setLoading}} >
            {children}
        </AuthContext.Provider>
    )

    
}