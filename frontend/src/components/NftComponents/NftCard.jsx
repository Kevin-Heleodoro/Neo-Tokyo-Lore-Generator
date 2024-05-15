import { useState } from 'react';
import styled from 'styled-components';

import { getLoreForCitizen } from '../../services/interfaces';

/**
 * This component is a card that displays an NFT object. It displays the NFT's name,
 * image, collection, contract address, token ID, and token type.
 *
 * @param {*} nft The NFT object to be displayed
 * @returns <NftCard />
 */
const NftCard = ({ nft }) => {
    const [citizenLore, setCitizenLore] = useState('');

    const handleGetLore = async () => {
        try {
            let lore = await getLoreForCitizen(nft);
            console.log(lore);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card key={nft.contract.address + nft.tokenId}>
            <CardHeader>{nft.name}</CardHeader>
            <CardImage src={nft.img} alt={nft.name} />
            <CardInfo>Collection: {nft.collection.name}</CardInfo>
            <CardInfo>Contract: {nft.contract.address}</CardInfo>
            <CardInfo>Token ID: {nft.tokenId}</CardInfo>
            <CardInfo>Token Type: {nft.tokenType}</CardInfo>

            <button onClick={handleGetLore}>Who am I?</button>
        </Card>
    );
};

export default NftCard;

/**
 * Styled Components
 */

const Card = styled.div`
    border: 1px solid #e2e2e2;
    border-radius: 10px;
    padding: 1rem;
    margin: 1rem;
    width: 300px;
    box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.07);
    background-color: #2a2a2a; // dark background color
    color: #f0f0f0; // light text color
    word-wrap: break-word; // prevent text from spilling out
`;

const CardHeader = styled.h2`
    font-size: 1.25rem;
    margin-bottom: 1rem;
`;

const CardImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: contain; // adjust to prevent excessive cropping
    border-radius: 10px;
    margin-bottom: 1rem;
`;

const CardText = styled.div`
    font-size: 1rem;
    text-align: center;
`;

const CardInfo = styled.div`
    font-size: 0.875rem;
    color: #888;
    margin-bottom: 0.5rem;
`;
