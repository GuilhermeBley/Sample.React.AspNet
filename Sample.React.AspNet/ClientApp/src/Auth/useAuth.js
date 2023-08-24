import { useState, useEffect } from 'react';

import api from '../api';

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('jwt');

        if (token) {
            setAuthenticated(true);
        }

        setLoading(false);
    }, []);

    async function handleLogin() {
        const { data: { token } } = await api.post('/api/login');
        localStorage.setItem('jwt', JSON.stringify(token));
        setAuthenticated(true);
    }

    function handleLogout() {
        localStorage.removeItem('jwt');
        setAuthenticated(false);
    }

    return { authenticated, loading, handleLogin, handleLogout };
}