import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import SearchContainer from '../SearchContainer/SearchContainer';
import {
    Header,
    Title,
    SearchWrapper,
    HamburgerMenu,
    MobileSearchContainer,
} from './Header.styles';

/**
 * This component is the header for the application. It displays the title and search bar.
 */
const HeaderComponent = ({ setNfts, setLoading }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Header>
            <Title>
                <Link
                    to="/"
                    style={{
                        textDecoration: 'none',
                    }}
                >
                    NeoScribe
                </Link>
            </Title>
            <SearchWrapper>
                <SearchContainer setNfts={setNfts} setLoading={setLoading} />
            </SearchWrapper>
            <HamburgerMenu
                data-testid="hamburger-button"
                onClick={toggleMenu}
                open={menuOpen}
            >
                <span></span>
                <span></span>
                <span></span>
            </HamburgerMenu>
            {menuOpen && (
                <MobileSearchContainer open={menuOpen}>
                    <SearchContainer
                        setNfts={setNfts}
                        setLoading={setLoading}
                    />
                </MobileSearchContainer>
            )}
        </Header>
    );
};

export default HeaderComponent;
