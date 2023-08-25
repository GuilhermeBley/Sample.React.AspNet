import { useState, useEffect } from 'react';

import fetcher from '../api';

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('jwt');

        if (token) {
            setAuthenticated(true);
        }
        else {
            setAuthenticated(false);
        }

        setLoading(false);
    }, []);

    async function handleLogin() {
        const { data: { token } } = await fetcher('/api/login', { method: "POST" });
        localStorage.setItem('jwt', token);
        setAuthenticated(true);
    }

    function handleLogout() {
        localStorage.removeItem('jwt');
        setAuthenticated(false);
    }

    return { authenticated, loading, handleLogin, handleLogout };
}