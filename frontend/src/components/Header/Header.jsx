import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { getCitizenForWallet } from '../../services/interfaces';
import {
    connectWallet,
    disconnectWallet,
    formatAddress,
} from '../../utilities/walletUtility';

/**
 * This component is the header for the application. It displays the title, search bar,
 * and wallet connection button. It also handles the logic for connecting and disconnecting
 * the wallet.
 */
const HeaderComponent = ({
    signerAddress,
    nfts,
    setNfts,
    loading,
    setLoading,
    isConnected,
    setIsConnected,
    walletAddress,
    setWalletAddress,
    setSigner,
}) => {
    const searchInputRef = useRef(null);
    const dropdownRef = useRef(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (signerAddress) {
            setWalletAddress(formatAddress(signerAddress));
        }

        // Cannot set isWalletConnected here to false because it will disconnect everytime the page loads.

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setShowDropdown(false);
        }
    };

    const handleConnectWallet = async () => {
        const userSignature = await connectWallet();
        if (userSignature) {
            setIsConnected(true);
            setWalletAddress(formatAddress(signerAddress));
        }
    };

    const handleDisconnectWallet = async () => {
        await disconnectWallet();
        setIsConnected(false);
        setWalletAddress('');
        setSigner('');
        setShowDropdown(false);
        location.state.signer = '';
    };

    const handleGetCitizens = async () => {
        setNfts([]);
        setLoading(true);

        let wallet = searchInputRef.current.value.toString();
        if (wallet) {
            const outArray = await getCitizenForWallet(wallet);

            setNfts(outArray);
            setLoading(false);
        }
    };

    return (
        <Header>
            <Title>Neo Tokyo Lore Generator</Title>
            <SearchContainer>
                <SearchBar
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search by ENS or Address"
                />
                <SearchButton onClick={handleGetCitizens}>
                    Load NFTs
                </SearchButton>
            </SearchContainer>
            <WalletContainer ref={dropdownRef}>
                <WalletButton
                    onClick={
                        isConnected
                            ? () => setShowDropdown(!showDropdown)
                            : handleConnectWallet
                    }
                >
                    {isConnected
                        ? `Wallet: ${walletAddress}`
                        : 'Connect Wallet'}
                </WalletButton>
                {showDropdown && (
                    <Dropdown>
                        <DropdownButton onClick={handleDisconnectWallet}>
                            Disconnect
                        </DropdownButton>
                    </Dropdown>
                )}
            </WalletContainer>
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
    ${'' /* display: flex; */}
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    justify-content: space-evenly;
    align-items: center;
    border-bottom: 2px solid #8a2be2;
    box-shadow: 0 0 15px rgba(138, 43, 226, 0.7);
`;

const Title = styled.h1`
    font-size: 1.5em;
    color: #8a2be2;
    margin: 0;
`;

const SearchBar = styled.input`
    padding: 10px;
    font-size: 1em;
    border: 2px solid #8a2be2;
    border-radius: 10px;
    background-color: #2a2a2a;
    color: white;
    outline: none;
    width: 200px;
    transition: all 0.3s ease;

    &:focus {
        box-shadow: 0 0 10px #8a2be2;
    }
`;

const SearchButton = styled.button`
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

const SearchContainer = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: center;
    flex-direction: row;
`;

const WalletContainer = styled.div`
    display: flex;
    justify-content: right;
    ${'' /* justify-content: center; */}
    align-items: center;
    position: relative;
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
    ${'' /* position: absolute; */}
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
