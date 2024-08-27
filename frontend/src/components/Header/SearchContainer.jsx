import { useRef, useState } from 'react';

import {
    getCitizenByWallet,
    getCitizenByTokenId,
} from '../../services/interfaces';
import {
    SearchBar,
    SearchButton,
    SearchBody,
    DropdownWrapper,
    DropdownButton,
    DropdownMenu,
    SubDropdown,
    SearchButtonWrapper,
} from './SearchContainer.styles';

const SearchContainer = ({ setNfts, setLoading }) => {
    const searchInputRef = useRef(null);
    const [searchType, setSearchType] = useState('wallet'); // "wallet" or "token"
    const [series, setSeries] = useState('S1'); // "S1" or "S2"
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [subDropdownOpen, setSubDropdownOpen] = useState(false);

    // Get citizens for wallet or token
    const handleGetCitizens = async () => {
        setNfts([]);
        setLoading(true);
        let citizenNfts;

        const query = searchInputRef.current.value.trim();
        if (query) {
            if (searchType === 'wallet') {
                citizenNfts = await getCitizenByWallet(query);
            } else if (searchType === 'token') {
                citizenNfts = await getCitizenByTokenId(query, series);
            }
        }

        // if (!citizenNfts) {
        //     setLoading(false);
        //     return;
        // }

        setNfts(citizenNfts);
        setLoading(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleGetCitizens();
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
        setSubDropdownOpen(false); // Close subdropdown when toggling main dropdown
    };

    const handleSearchTypeSelect = (type) => {
        setSearchType(type);
        if (type === 'wallet') {
            setDropdownOpen(false);
        }
        setSubDropdownOpen(false); // Close subdropdown when selecting a type
    };

    const handleSeriesSelect = (type) => {
        setSeries(type);
        setDropdownOpen(false);
        setSubDropdownOpen(false); // Close subdropdown when selecting a series
    };

    return (
        <SearchBody>
            <SearchBar
                ref={searchInputRef}
                type="text"
                placeholder={
                    searchType === 'wallet'
                        ? 'Search by ENS or Address'
                        : `Search by Token ID (${series})`
                }
                onKeyDown={handleKeyDown}
            />
            <SearchButtonWrapper>
                <SearchButton onClick={handleGetCitizens}>Search</SearchButton>
                <DropdownWrapper>
                    <DropdownButton onClick={toggleDropdown}>▼</DropdownButton>
                    {dropdownOpen && (
                        <DropdownMenu
                            open={dropdownOpen}
                            onMouseLeave={() => setDropdownOpen(false)}
                        >
                            <li
                                onClick={() => handleSearchTypeSelect('wallet')}
                            >
                                Wallet
                            </li>
                            <li
                                onMouseEnter={() => setSubDropdownOpen(true)}
                                onMouseLeave={() => setSubDropdownOpen(false)}
                                onClick={() => handleSearchTypeSelect('token')}
                            >
                                Token ID &gt;
                                {subDropdownOpen && (
                                    <SubDropdown>
                                        <li
                                            onClick={() =>
                                                handleSeriesSelect('S1')
                                            }
                                        >
                                            Series 1
                                        </li>
                                        <li
                                            onClick={() =>
                                                handleSeriesSelect('S2')
                                            }
                                        >
                                            Series 2
                                        </li>
                                    </SubDropdown>
                                )}
                            </li>
                        </DropdownMenu>
                    )}
                </DropdownWrapper>
            </SearchButtonWrapper>
        </SearchBody>
    );
};

export default SearchContainer;
