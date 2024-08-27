import styled from 'styled-components';

export const SearchBody = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: center;
    flex-direction: row;

    @media (max-width: 480px) {
        flex-direction: column;
        align-items: stretch;
        width: 100%;
    }
`;

export const SearchBar = styled.input`
    padding: 10px;
    margin-right: 10px;
    font-size: 1em;
    border: 2px solid #8a2be2;
    border-radius: 10px;
    background-color: #2a2a2a;
    color: white;
    outline: none;
    width: 20rem;
    transition: all 0.3s ease;

    &:focus {
        box-shadow: 0 0 10px #8a2be2;
    }

    @media (max-width: 480px) {
        width: 100%;
        margin-bottom: 10px;
    }
`;

export const SearchButtonWrapper = styled.div`
    display: flex;
    position: relative;

    @media (max-width: 480px) {
        width: 100%;
    }
`;

export const SearchButton = styled.button`
    padding: 0px 20px;
    font-size: 1.1em;
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

    @media (max-width: 480px) {
        width: 100%;
    }
`;
