import styled from 'styled-components';

export const WalletBody = styled.div`
    display: flex;
    justify-content: right;
    align-items: center;
    position: relative;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

export const WalletButton = styled.button`
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

export const Dropdown = styled.div`
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

export const DropdownButton = styled.button`
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
