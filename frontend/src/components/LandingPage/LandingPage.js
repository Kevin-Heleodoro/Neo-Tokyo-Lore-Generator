import React from 'react';
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

const LandingPage = () => {
    return (
        <PageContainer>
            <ConnectButton onClick={() => console.log('Connect Wallet')}>
                Connect Wallet
            </ConnectButton>
        </PageContainer>
    );
};

export default LandingPage;
