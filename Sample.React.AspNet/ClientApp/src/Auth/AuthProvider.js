import React, { createContext, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const login = (token) => {
        parseJwt(token)
    };

    const logout = () => {
        setUser(null);
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

function parseJwt(token) {
    var arrayToken = token.split('.');

    if (arrayToken.length !== 3)
        return null;

    var base64Url = arrayToken[1];

    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}