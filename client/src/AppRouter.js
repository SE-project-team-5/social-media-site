import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserPage from './components/userPage/userPage';

import App from './components/App';
import NotFound from './components/NotFound';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserPage/>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;