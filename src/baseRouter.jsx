import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Router from './router';

const BaseRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Router />} />
            </Routes>
        </BrowserRouter>
    )
}   

export default BaseRouter;