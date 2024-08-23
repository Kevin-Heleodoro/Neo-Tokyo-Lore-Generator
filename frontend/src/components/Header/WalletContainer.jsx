import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import {
    connectWallet,
    disconnectWallet,
    formatAddress,
} from '../../utilities/walletUtility';
import {
    WalletBody,
    WalletButton,
    Dropdown,
    DropdownButton,
} from './WalletContainer.styles';

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
    useEffect(() => {
        if (signerAddress) {
            setWalletAddress(formatAddress(signerAddress));
        }

        if (location.state.signer) {
            setWalletAddress(formatAddress(location.state.signer.address));
        }

        // Cannot set isWalletConnected here to false because it will disconnect everytime the page loads.

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Detect wallet change
    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length > 0) {
                    setWalletAddress(formatAddress(accounts[0]));
                    localStorage.setItem('walletAddress', accounts[0]);
                } else {
                    handleDisconnectWallet();
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
