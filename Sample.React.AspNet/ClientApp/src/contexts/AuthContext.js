import { createContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const itemKey = "user_token";

    useEffect(() => {
        const userToken = localStorage.getItem("user_token");

        if (userToken === null)
            return;

        var decodedResult;
        try {
            decodedResult = jwtDecode(userToken);
        }
        catch {
            return;
        }

        if (decodedResult === null)
            return;

        let currentDate = new Date();

        if (decodedResult.exp * 1000 < currentDate.getTime()) {
            signout();
            console.log("Token expired.");
            return;
        } 

        setUser(decodedResult);

    }, []);

    const signin = (token) => {

        if (token === null)
            return;

        var decodedResult;
        try {
            decodedResult = jwtDecode(token);
        }
        catch {
            return;
        }

        let currentDate = new Date();

        if (decodedResult.exp * 1000 < currentDate.getTime()) {
            signout();
            console.log("Token expired.");
            return;
        }

        localStorage.setItem(itemKey, token);
        setUser(decodedResult);
    };

    const signout = () => {
        setUser(null);
        localStorage.removeItem(itemKey);
    };

    return (
        <AuthContext.Provider
            value={{ user, signed: !!user, signin, signout }}
        >
            {children}
        </AuthContext.Provider>
    );
};