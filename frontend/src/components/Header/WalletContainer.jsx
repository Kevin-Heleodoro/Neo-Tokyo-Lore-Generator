import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import {
    connectWallet,
    disconnectWallet,
    formatAddress,
} from '../../utilities/walletUtility';

const WalletContainer = ({
    signerAddress,
    walletAddress,
    setWalletAddress,
    setSigner,
    setIsConnected,
    isConnected,
}) => {
    let location = useLocation();
    const dropdownRef = useRef(null);
    const [showDropdown, setShowDropdown] = useState(false);

    // Detect if wallet is already connected
    // useEffect(() => {
    //     if (signerAddress) {
    //         setWalletAddress(formatAddress(signerAddress));
    //     }

    //     // if (location.state.signer) {
    //     //     setWalletAddress(formatAddress(location.state.signer.address));
    //     // }

    //     // Cannot set isWalletConnected here to false because it will disconnect everytime the page loads.

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // Detect wallet change
    // useEffect(() => {
    //     if (window.ethereum) {
    //         window.ethereum.on('accountsChanged', (accounts) => {
    //             if (accounts.length > 0) {
    //                 setWalletAddress(formatAddress(accounts[0]));
    //                 localStorage.setItem('walletAddress', accounts[0]);
    //             } else {
    //                 handleDisconnectWallet();
    //             }
    //         });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // Dropdown logic
    useEffect(() => {
        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setShowDropdown(false);
        }
    };

    // Connect wallet
    const handleConnectWallet = async () => {
        const { signature, signer } = await connectWallet();
        if (signature) {
            setIsConnected(true);
            setWalletAddress(formatAddress(signer.address));
        }
    };

    // Disconnect wallet
    const handleDisconnectWallet = async () => {
        await disconnectWallet();
        setIsConnected(false);
        setWalletAddress('');
        setSigner('');
        setShowDropdown(false);
        location.state.signer = '';
    };

    return (
        <WalletBody ref={dropdownRef}>
            <WalletButton
                onClick={
                    isConnected
                        ? () => setShowDropdown(!showDropdown)
                        : handleConnectWallet
                }
            >
                {isConnected ? `Wallet: ${walletAddress}` : 'Connect Wallet'}
            </WalletButton>
            {showDropdown && (
                <Dropdown>
                    <DropdownButton onClick={handleDisconnectWallet}>
                        Disconnect
                    </DropdownButton>
                </Dropdown>
            )}
        </WalletBody>
    );
};

export default WalletContainer;

/**
 * Styled Components
 */

const WalletBody = styled.div`
    display: flex;
    justify-content: right;
    align-items: center;
    position: relative;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const WalletButton = styled.button`
    padding: 10px 20px;
    font-size: 1em;
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

const Dropdown = styled.div`
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    background-color: #2a2a2a;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(138, 43, 226, 0.7);
    padding: 12px 16px;
    z-index: 1;
    border-radius: 10px;
    color: white;
`;

const DropdownButton = styled.button`
    background-color: #8a2be2;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    width: 100%;

    &:hover {
        background-color: #7a1ed2;
        box-shadow: 0 0 10px #7a1ed2;
    }
`;
