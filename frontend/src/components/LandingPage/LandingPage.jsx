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
    padding: 20px 30px;
    font-size: 1.75em;
    color: white;
    background-color: #ab68ff;
    border: 2px solid white;
    border-radius: 30px;
    cursor: pointer;
    transition: background-color 0.5s, color 0.5s;

    &:hover {
        background-color: white;
        border-color: #ab68ff;
        color: black;
        box-shadow: 0 0 15px #ffffff;

        &::before {
            width: 120%;
            height: 120%;
            opacity: 1;
        }
    }
`;
