import { useState } from 'react';
import styled from 'styled-components';

/**
 * This component is the header for the application. It displays the application
 * name and the user's wallet address. If the user is not connected, it displays
 * a "Connect Wallet" button. If the user is connected, it displays the user's
 * wallet address and a "Disconnect" button.
 *
 * @param {*} walletAddress User's wallet address
 * @returns <Header />
 */
const HeaderComponent = ({ walletAddress }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    let formattedAddress = `${walletAddress.slice(
        0,
        6
    )} ... ${walletAddress.slice(-4)}`;

    const handleDisconnect = () => {
        console.log('Disconnecting wallet...');
    };

    return (
        <Header>
            <Logo>Neo Tokyo Lore Generator</Logo>
            <DropDown>
                <NavLink onClick={() => setDropdownOpen(!dropdownOpen)}>
                    {walletAddress ? formattedAddress : 'Connect Wallet'}
                </NavLink>
                <DropDownContent open={dropdownOpen}>
                    <WalletAddress>{formattedAddress}</WalletAddress>
                    <DisconnectButton onClick={handleDisconnect}>
                        Disconnect
                    </DisconnectButton>
                </DropDownContent>
            </DropDown>
        </Header>
    );
};

export default HeaderComponent;

/**
 * Styled Components
 */

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: linear-gradient(
        90deg,
        var(--primary-color),
        var(--secondary-color)
    );
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    height: 2rem;
`;

const Logo = styled.h1`
    font-size: 2rem;
    color: var(--light-color);
    text-shadow: 0 0 10px var(--light-color), 0 0 20px var(--light-color),
        0 0 30px var(--light-color), 0 0 40px var(--light-color);
`;

const Nav = styled.nav`
    display: flex;
    gap: 1rem;
`;

const NavLink = styled.a`
    color: var(--light-color);
    cursor: pointer;
    text-decoration: none;
    text-shadow: 0 0 10px var(--light-color), 0 0 20px var(--light-color),
        0 0 30px var(--light-color), 0 0 40px var(--light-color);
`;

const DropDown = styled.div`
    position: relative;
    display: inline-block;
`;

const DropDownContent = styled.div`
    display: ${(props) => (props.open ? 'block' : 'none')};
    position: absolute;
    right: 0;
    ${'' /* background-color: #f9f9f9; */}
    background-color: var(--dark-color);
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 12px 16px;
    z-index: 1;
`;

const WalletAddress = styled.p`
    margin: 0;
    font-size: 0.875rem;
    color: var(--light-color);
`;

const DisconnectButton = styled.button`
    display: block;
    width: 100%;
    padding: 0.5rem;
    margin-top: 1rem;
    background-color: var(--primary-color);
    color: var(--light-color);
    border: none;
    cursor: pointer;
    border-radius: 4px;
`;
