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

    // Get citizens for wallet
    const handleGetCitizens = async () => {
        setNfts([]);
        setLoading(true);

        const query = searchInputRef.current.value.trim();
        if (query) {
            if (searchType === 'wallet') {
                const citizenNfts = await getCitizenByWallet(query);
                setNfts(citizenNfts);
            } else if (searchType === 'token') {
                const citizenNfts = await getCitizenByTokenId(query, series);
                setNfts(citizenNfts);
            }
        }
        // let wallet = searchInputRef.current.value.toString();
        // if (wallet) {
        //     const citizenNfts = await getCitizenForWallet(wallet);

        //     setNfts(citizenNfts);
        // }

        setLoading(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleGetCitizens();
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleSearchTypeSelect = (type) => {
        setSearchType(type);
        setDropdownOpen(false);
    };

    const handleSeriesSelect = (type) => {
        setSeries(type);
        setDropdownOpen(false);
    };

    return (
        <SearchBody>
            {/* <SearchOptions>
                <label>
                    <input
                        type="radio"
                        value="wallet"
                        checked={searchType === 'wallet'}
                        onChange={() => setSearchType('wallet')}
                        placeholder="Wallet Address"
                    />
                </label>
                <label>
                    <input
                        type="radio"
                        value="token"
                        checked={searchType === 'token'}
                        onChange={() => setSearchType('token')}
                        placeholder="Token ID"
                    />
                </label>
                {searchType === 'token' && (
                    <select
                        value={series}
                        onChange={(e) => setSeries(e.target.value)}
                    >
                        <option value={'S1'}>Series 1</option>
                        <option value={'S2'}>Series 2</option>
                    </select>
                )}
            </SearchOptions> */}
            <SearchBar
                ref={searchInputRef}
                type="text"
                placeholder={
                    searchType === 'wallet'
                        ? 'Search by ENS or Address'
                        : 'Search by Token ID'
                }
                onKeyDown={handleKeyDown}
            />
            <SearchButtonWrapper>
                <SearchButton onClick={handleGetCitizens}>Search</SearchButton>
                <DropdownButton>▼</DropdownButton>
                {dropdownOpen && (
                    <DropdownWrapper>
                        <DropdownMenu>
                            <li onClick={() => setSearchType('wallet')}>
                                Wallet
                            </li>
                            <li onClick={() => setSearchType('token')}>
                                Token ID
                            </li>
                            {searchType === 'token' && (
                                <SubDropdown>
                                    <li onClick={() => setSeries('S1')}>
                                        Series 1
                                    </li>
                                    <li onClick={() => setSeries('S2')}>
                                        Series 2
                                    </li>
                                </SubDropdown>
                            )}
                        </DropdownMenu>
                    </DropdownWrapper>
                )}
            </SearchButtonWrapper>
        </SearchBody>
    );
};

export default SearchContainer;
