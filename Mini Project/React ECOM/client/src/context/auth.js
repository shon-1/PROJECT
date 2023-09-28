import { useState, useEffect, useContext, createContext } from "react";
import { json } from "react-router-dom";
//import axios from "axios";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",

        // console.log(token)
        //console.log(error)
    });
    useEffect(() => {                                             //print data from local storage
        const data = localStorage.getItem('auth')
        if (data) {
            const parseData = JSON.parse(data)
            {
                setAuth({
                    ...auth,
                    user: parseData.user,
                    token: parseData.token
                })
            }
        }
    }, [auth])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
