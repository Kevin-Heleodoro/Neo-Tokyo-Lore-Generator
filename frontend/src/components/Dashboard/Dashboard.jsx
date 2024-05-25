import { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { useLocation } from 'react-router-dom';

import NftCardContainer from '../NftComponents/NftCardContainer';
import HeaderComponent from '../Header/Header';
import LoaderComponent from '../Shared/LoaderComponent';

/**
 * This component is the dashboard for the application. It displays the header and
 * the NFT card container. It also sets the global styles for the application.
 */
const Dashboard = ({ nfts, setNfts, loading, setLoading }) => {
    const location = useLocation();
    const [isConnected, setIsConnected] = useState(true);
    const [walletAddress, setWalletAddress] = useState('');
    const [signer, setSigner] = useState('');

    useEffect(() => {
        let signer = location.state.signer;
        if (signer) {
            setSigner(signer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div id="app">
            <GlobalStyle />
            <HeaderComponent
                signerAddress={signer.address}
                setSigner={setSigner}
                nfts={nfts}
                setNfts={setNfts}
                loading={loading}
                setLoading={setLoading}
                walletAddress={walletAddress}
                setWalletAddress={setWalletAddress}
                isConnected={isConnected}
                setIsConnected={setIsConnected}
            />
            {loading ? (
                <LoaderComponent />
            ) : (
                <NftCardContainer nfts={nfts} walletAddress={walletAddress} />
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
        overflow: hidden;

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
    ${
        '' /* body {
        margin: 0;
        padding: 0;
        background-image: url('/img/neo-tokyo-mobile.jpeg');
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
        font-family: 'Roboto', sans-serif;
        color: white;
    } */
    }
`;
