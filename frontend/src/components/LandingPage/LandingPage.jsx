import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

const LandingPage = ({ setIsWalletConnected }) => {
    const navigate = useNavigate();

    async function connectWallet() {
        console.log('connectWallet called');
        let provider;
        let signer = null;

        if (window.ethereum == null) {
            console.log('No ethereum provider found');
            provider = ethers.getDefaultProvider();
        } else {
            try {
                provider = new ethers.BrowserProvider(window.ethereum);
                await provider.send('eth_requestAccounts', []);
                signer = await provider.getSigner();
                console.log(`Account: ${await signer.getAddress()}`);
                setIsWalletConnected(true);
                navigate('/home');
                return signer;
            } catch (error) {
                console.log(`User denied account access: ${error}`);
            }
        }
    }

    return (
        <PageContainer>
            <ConnectButton onClick={connectWallet}>
                Connect Wallet
            </ConnectButton>
        </PageContainer>
    );
};

export default LandingPage;
