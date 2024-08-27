import { useRef, useState } from 'react';

import { validateInput } from '../../utilities/validator';
import {
    getCitizenByWallet,
    getCitizenByTokenId,
} from '../../services/interfaces';
import {
    SearchBar,
    SearchButton,
    SearchBody,
    SearchButtonWrapper,
} from './SearchContainer.styles';

const SearchContainer = ({ setNfts, setLoading }) => {
    const searchInputRef = useRef(null);
    const [series, setSeries] = useState('S1'); // "S1" or "S2"

    const handleGetCitizens = async () => {
        const query = searchInputRef.current.value.trim();
        let queryType = validateInput(query);

        if (queryType === 'invalid') {
            // alert(
            //     'Invalid input. Please enter a valid ETH address or Token ID.'
            // );
            return;
        }

        setLoading(true);
        let citizenNfts;

        if (queryType === 'wallet') {
            citizenNfts = await getCitizenByWallet(query);
        } else if (queryType === 'token') {
            citizenNfts = await getCitizenByTokenId(query, series);
        }

        setNfts(citizenNfts);
        setLoading(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleGetCitizens();
        }
    };

    return (
        <SearchBody>
            <SearchBar
                ref={searchInputRef}
                type="text"
                placeholder={'Search by ETH address or Token ID'}
                onKeyDown={handleKeyDown}
            />
            <SearchButtonWrapper>
                <SearchButton onClick={handleGetCitizens}>Search</SearchButton>
            </SearchButtonWrapper>
        </SearchBody>
    );
};

export default SearchContainer;
