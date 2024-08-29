import { useState, useEffect, useRef } from 'react';
import { createGlobalStyle } from 'styled-components';

import NftCardContainer from '../NftComponents/NftCardContainer';
import HeaderComponent from '../Header/Header';
import LoaderComponent from '../Shared/LoaderComponent';
import { getAllCitizens } from '../../services/interfaces';

/**
 * This component is the dashboard for the application. It displays the header and
 * the NFT card container. It also sets the global styles for the application.
 */
const Dashboard = ({ nfts, setNfts, loading, setLoading }) => {
    const [series, setSeries] = useState('S1'); // "S1" or "S2"
    const [offset, setOffset] = useState('');
    const [limit] = useState(20);
    const [dashboardView, setDashboardView] = useState(true);
    const hasMounted = useRef(false);

    const loadCitizens = async (reset) => {
        setLoading(true);
        setNfts([]);
        setDashboardView(true);
        if (reset) {
            setOffset('');
        }
        const data = await getAllCitizens(series, reset ? '' : offset, limit);
        setNfts(data.nfts);
        setOffset(data.nextOffset);
        setLoading(false);
    };

    useEffect(() => {
        if (!hasMounted.current) {
            loadCitizens();
            hasMounted.current = true;
        }
    }, []);

    useEffect(() => {
        if (hasMounted.current) {
            setOffset('');
            loadCitizens(true);
        }
    }, [series]);

    return (
        <div id="app">
            <GlobalStyle />
            <HeaderComponent
                setNfts={setNfts}
                setLoading={setLoading}
                setSeries={setSeries}
                series={series}
                loadCitizens={loadCitizens}
                setDashboardView={setDashboardView}
            />
            {loading ? (
                <LoaderComponent />
            ) : (
                <NftCardContainer
                    nfts={nfts}
                    dashboardView={dashboardView}
                    setDashboardView={setDashboardView}
                    loadCitizens={loadCitizens}
                />
            )}
        </div>
    );
};

export default Dashboard;

/**
 * Styled Components
 */
const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: 'Roboto', sans-serif;
        color: white;
        position: relative;
        overflow: auto;

        &::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('/img/neo-tokyo-mobile.jpeg');
            background-size: cover;
            background-repeat: no-repeat;
            background-attachment: fixed;
            filter: blur(4px) opacity(0.8);
            z-index: -1;
        }
    }
`;
