import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainCertifications from './components/Certifications/MainCertifications';
import SubCertificate from './components/Certifications/SubCertificate';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainCertifications />} />
                <Route path="/certificate/subcertificate/:slug" element={<SubCertificate />} />
                {/* <Route path="/certificate/test-slug" element={<SubCertificate />} /> */}
            </Routes>
        </Router>
    );
};

export default App; 