import styled from 'styled-components';

export const SearchBody = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: center;
    flex-direction: row;

    @media (max-width: 1200px) {
        justify-content: flex-end;
        width: 100%;
    }

    @media (max-width: 900px) {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    @media (max-width: 480px) {
        justify-content: center;
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
    width: 16rem;
    transition: all 0.3s ease;

    &:focus {
        box-shadow: 0 0 10px #8a2be2;
    }

    @media (max-width: 900px) {
        font-size: 1em;
        margin-bottom: 10px;
    }

    @media (max-width: 480px) {
        width: 80%;
        margin-bottom: 10px;
    }
`;

export const SearchButtonWrapper = styled.div`
    display: flex;
    position: relative;

    @media (max-width: 900px) {
        justify-content: center;
        align-items: center;
    }

    @media (max-width: 480px) {
        flex-direction: column;
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

    @media (max-width: 900px) {
        padding: 10px 20px;
        width: 90%;
    }

    @media (max-width: 480px) {
        margin-bottom: 10px;
    }
`;
