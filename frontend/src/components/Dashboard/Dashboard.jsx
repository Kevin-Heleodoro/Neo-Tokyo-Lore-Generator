import { createGlobalStyle } from 'styled-components';
import { useLocation } from 'react-router-dom';

import NftCardContainer from '../NftComponents/NftCardContainer';
import HeaderComponent from '../Header/Header';

/**
 * This component is the dashboard for the application. It displays the header and
 * the NFT card container. It also sets the global styles for the application.
 */
const Dashboard = ({ nfts, setNfts, loading, setLoading }) => {
    const location = useLocation();
    const signer = location.state.signer || '';

    return (
        <div id="app">
            <GlobalStyle />
            <HeaderComponent
                signerAddress={signer.address}
                nfts={nfts}
                setNfts={setNfts}
                loading={loading}
                setLoading={setLoading}
            />
            <NftCardContainer nfts={nfts} />
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
        background-image: url('/img/neo-tokyo-mobile.jpeg');
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
        font-family: 'Roboto', sans-serif;
        color: white;
    }
`;
