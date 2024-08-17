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
    width: 200px;
    transition: all 0.3s ease;

    &:focus {
        box-shadow: 0 0 10px #8a2be2;
    }

    @media (max-width: 480px) {
        width: 100%;
        margin-bottom: 10px;
    }
`;

export const SearchButton = styled.button`
    padding: 0px 20px;
    font-size: 1.1em;
    color: #ffffff;
    background-color: #8a2be2;
    border-right: 1px solid #1f1f1f;
    border-radius: 10px 0px 0px 10px;
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

export const DropdownWrapper = styled.div`
    position: relative;
    margin-right: 10px;
`;

export const DropdownButton = styled.button`
    padding: 0.3rem;
    font-size: 1rem;
    color: #ffffff;
    background-color: #8a2be2;
    border-left: 1px solid #1f1f1f;
    border-radius: 0px 10px 10px 0px;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        background-color: #7a1ed2;
        box-shadow: 0 0 10px #7a1ed2;
    }
`;

export const DropdownMenu = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    background-color: #2a2a2a;
    border-radius: 10px;
    position: absolute;
    top: 50px;
    left: 0;
    min-width: 120px;
    z-index: 10;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

    li {
        padding: 10px 20px;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #8a2be2;
        }
    }
`;

export const SubDropdown = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    background-color: #1f1f1f;
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 120px;
    min-width: 80px;
    z-index: 20;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

    li {
        padding: 10px 20px;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #8a2be2;
        }
    }
`;

export const SearchButtonWrapper = styled.div`
    display: flex;
    overflow: hidden;

    @media (max-width: 480px) {
        width: 100%;
    }
`;
