import { createContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

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

    const signin = (email) => {

        var loginRequestModel = {
            userName : email
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginRequestModel)
        };

        fetch("api/login", options)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    };

    const signout = () => {
        setUser(null);
        localStorage.removeItem("user_token");
    };

    return (
        <AuthContext.Provider
            value={{ user, signed: !!user, signin, signout }}
        >
            {children}
        </AuthContext.Provider>
    );
};