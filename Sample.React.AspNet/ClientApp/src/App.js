import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './custom.css';

import { AuthProvider } from './contexts/AuthContext';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <AuthProvider>
                    <Routes>
                        {AppRoutes.map((route, index) => {
                            const { element, ...rest } = route;
                            return <Route key={index} {...rest} element={element} />;
                        })}
                    </Routes>
            </AuthProvider>
        );
    }
}
