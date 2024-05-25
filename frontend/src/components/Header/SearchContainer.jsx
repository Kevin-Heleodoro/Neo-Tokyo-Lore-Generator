import { useRef } from 'react';
import styled from 'styled-components';

import { getCitizenForWallet } from '../../services/interfaces';

const SearchContainer = ({ setNfts, setLoading }) => {
    const searchInputRef = useRef(null);

    // Get citizens for wallet
    const handleGetCitizens = async () => {
        setNfts([]);
        setLoading(true);

        let wallet = searchInputRef.current.value.toString();
        if (wallet) {
            const citizenNfts = await getCitizenForWallet(wallet);

            setNfts(citizenNfts);
        }

        setLoading(false);
    };

    return (
        <SearchBody>
            <SearchBar
                ref={searchInputRef}
                type="text"
                placeholder="Search by ENS or Address"
            />
            <SearchButton onClick={handleGetCitizens}>Load NFTs</SearchButton>
        </SearchBody>
    );
};

export default SearchContainer;

/**
 * Styled Components
 */

const SearchBody = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: center;
    flex-direction: row;
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
