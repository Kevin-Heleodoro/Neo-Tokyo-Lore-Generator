import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { connectWallet } from '../../utilities/walletUtility';

/**
 * This component is the landing page for the application. It displays a "Connect Wallet"
 * button that, when clicked, will connect the user's wallet to the application.
 *
 * @param {*} setIsWalletConnected State setter for wallet connection
 * @returns <LandingPage />
 */
const LandingPage = ({ setIsWalletConnected }) => {
    const navigate = useNavigate();

    async function handleConnectWallet() {
        const { signature, signer } = await connectWallet();
        if (signature) {
            // setIsWalletConnected(true);
            navigate('/home', { state: { signer } });
        } else {
            console.log('User denied account access');
        }
    }

    return (
        <PageContainer>
            <ConnectButton onClick={handleConnectWallet}>
                Connect Wallet
            </ConnectButton>
        </PageContainer>
    );
};

export default LandingPage;

/**
 * Styled Components
 */

const PageContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('/img/neo-tokyo-background.jpeg');
    background-size: cover;
`;

const ConnectButton = styled.button`
    padding: 30px 40px;
    font-size: 1.75em;
    color: #ffffff;
    background-color: #8a2be2;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        background-color: #7a1ed2;
        box-shadow: 0 0 10px #7a1ed2;
    }
`;
