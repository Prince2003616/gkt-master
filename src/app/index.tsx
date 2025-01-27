import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from '@/app/course_components/page';
import SubCertificate from '@/app/components/Certifications/SubCertificate';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/course/:slug" element={<Home />} />
                <Route path="/certificate/:slug" element={<SubCertificate />} />
                <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
); 