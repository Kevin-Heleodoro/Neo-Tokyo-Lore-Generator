import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaBars, FaHome } from 'react-icons/fa';

import SearchContainer from './SearchContainer';
import WalletContainer from './WalletContainer';

/**
 * This component is the header for the application. It displays the title, search bar,
 * and wallet connection button. It also handles the logic for connecting and disconnecting
 * the wallet.
 */
const HeaderComponent = ({
    signerAddress,
    setNfts,
    setLoading,
    isConnected,
    setIsConnected,
    walletAddress,
    setWalletAddress,
    setSigner,
}) => {
    return (
        <Header>
            <Title>
                <Link
                    to="/home"
                    style={{ textDecoration: 'none', color: '#8a2be2' }}
                >
                    Neo Tokyo Lore Generator
                </Link>
            </Title>
            <SearchContainer setNfts={setNfts} setLoading={setLoading} />
            <WalletContainer
                isConnected={isConnected}
                walletAddress={walletAddress}
                signerAddress={signerAddress}
                setSigner={setSigner}
                setIsConnected={setIsConnected}
                setWalletAddress={setWalletAddress}
            />
        </Header>
    );
};

export default HeaderComponent;

/**
 * Styled Components
 */

const Header = styled.header`
    background-color: #1f1f1f;
    color: white;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #8a2be2;
    box-shadow: 0 0 15px rgba(138, 43, 226, 0.7);
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const Title = styled.h1`
    font-size: 1.5em;
    color: #8a2be2;
    margin: 0;

    @media (max-width: 768px) {
        font-size: 1.2em;
    }
`;
