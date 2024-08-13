import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';
import ErrorBoundary from './components/Error/ErrorBoundary';
import ErrorPage from './components/Error/ErrorPage';

export default function App() {
    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(false);

    return (
        <ErrorBoundary>
            <Routes>
                <Route exact path="/" element={<LandingPage />} />
                <Route
                    path="/home"
                    element={
                        <Dashboard
                            nfts={nfts}
                            setNfts={setNfts}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    }
                />
                <Route path="*" element={<ErrorPage is404={true} />} />
            </Routes>
        </ErrorBoundary>
    );
}
