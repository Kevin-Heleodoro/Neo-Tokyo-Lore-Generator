import React from 'react';
import styled from 'styled-components';

const Navbar = styled.div`
    background-color: var(--dark-color);
    color: #fff;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
`;

// const Container = styled.div`
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;
// `;

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark">
            Citizen Lore
        </Navbar>
    );
};

export default Header;
