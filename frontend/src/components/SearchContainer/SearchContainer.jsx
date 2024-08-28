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
import CheckSlider from './CheckSlider';

const SearchContainer = ({
    setNfts,
    setLoading,
    menuOpen,
    setMenuOpen,
    series,
    setSeries,
}) => {
    const searchInputRef = useRef(null);
    // const [series, setSeries] = useState('S1'); // "S1" or "S2"
    const [checked, setChecked] = useState(false);

    const handleGetCitizens = async () => {
        const query = searchInputRef.current.value.trim();
        let queryType = validateInput(query);

        if (queryType === 'invalid') {
            return;
        }

        setLoading(true);
        let citizenNfts;

        if (queryType === 'wallet') {
            citizenNfts = await getCitizenByWallet(query);
        } else if (queryType === 'token') {
            citizenNfts = await getCitizenByTokenId(query, series);
        }

        if (menuOpen) {
            setMenuOpen(false);
        }

        setNfts(citizenNfts);
        setLoading(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleGetCitizens();
        }
    };

    const handleChange = (event) => {
        setChecked(!checked);
        if (checked) {
            setSeries('S1');
        } else {
            setSeries('S2');
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
                <CheckSlider onChange={handleChange} checked={checked} />
            </SearchButtonWrapper>
        </SearchBody>
    );
};

export default SearchContainer;
