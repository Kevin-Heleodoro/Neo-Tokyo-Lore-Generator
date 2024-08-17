import styled from 'styled-components';

export const Header = styled.header`
    background-color: #1f1f1f;
    color: white;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #8a2be2;
    box-shadow: 0 0 15px rgba(138, 43, 226, 0.7);
    position: relative;
    height: 3rem;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

export const Title = styled.h1`
    font-size: 1.5em;
    color: #8a2be2;
    margin: 0;
    flex: 0 0 auto;
    position: absolute;
    left: 1rem;
    top: 1.25rem;
`;

export const SearchWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 768px) {
        display: none;
    }
`;

export const HamburgerMenu = styled.div`
    display: none;

    @media (max-width: 768px) {
        display: block;
        position: absolute;
        top: 1.25rem;
        right: 2rem;
        cursor: pointer;
        z-index: 20;

        & span {
            background-color: #8a2be2;
            display: block;
            height: 3px;
            margin: 5px 0;
            transition: all 0.3s ease;
            width: 25px;
        }

        ${({ open }) =>
            open &&
            `
            & span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            & span:nth-child(2) {
                opacity: 0;
            }
            & span:nth-child(3) {
                transform: rotate(-45deg) translate(5px, -5px);
            }
            `}
    }
`;

export const MobileSearchContainer = styled.div`
    display: ${({ open }) => (open ? 'block' : 'none')};
    width: 50%;
    background-color: #1f1f1f;
    padding: 10px 10px;
    position: absolute;
    top: 4rem;
    right: 0;
    z-index: 10;
    transition: max-height 0.3s ease;
    max-height: ${({ open }) => (open ? '100vh' : '0')};
    overflow: hidden;
`;
