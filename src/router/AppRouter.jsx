import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '../auth/';
import { CalendarPage } from '../calendar/';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {

    const { checkAuthToken, status } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);

    if(status === 'checking') {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <h3 className="text-primary">Loading...</h3>
            </div>
        );
    }

    return (
        <Routes>
            
            {
                (status === "not-authenticated")
                    ? (
                        <>
                            <Route path="/auth/*" element={ <LoginPage /> } />
                            <Route path="/*" element={ <Navigate to="/auth/login" /> } />    
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={ <CalendarPage /> } />
                            <Route path="/*" element={ <Navigate to="/" /> } />    
                        </>
                    )
            }

        </Routes>
    )
}