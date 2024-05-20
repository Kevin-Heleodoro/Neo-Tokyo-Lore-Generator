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
    const [backstory, setBackstory] = useState(false);

    const handleGenerateBackstory = async () => {
        try {
            const attributeArray = nft.raw.metadata.attributes;

            // Filter out unwanted attributes
            const filteredAttributes = attributeArray.filter(
                (attribute) =>
                    attribute.trait_type !== 'Season' &&
                    attribute.trait_type !== 'Multiplier' &&
                    attribute.trait_type !== 'Timelock' &&
                    attribute.trait_type !== 'Allocation'
            );

            const citizenInput = {
                name: nft.name,
                attributes: filteredAttributes,
            };

            let lore = await getLoreForCitizen(citizenInput);
            console.log(lore);
            // setBackstory(lore);
            setBackstory(
                lore
                    .split('\n')
                    .map((paragraph, index) => (
                        <Paragraph key={index}>{paragraph}</Paragraph>
                    ))
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card key={nft.contract.address + nft.tokenId}>
            <ImageContainer>
                <NftImage src={nft.img} alt={nft.name} />
            </ImageContainer>
            <Details>
                <p>{nft.name}</p>
                <Button onClick={handleGenerateBackstory}>Who am I?</Button>
                {backstory && (
                    <BackstoryContainer>{backstory}</BackstoryContainer>
                )}
            </Details>
        </Card>
    );
};

export default NftCard;

/**
 * Styled Components
 */

const Card = styled.div`
    background-color: #1f1f1f;
    border: 2px solid #8a2be2;
    border-radius: 15px;
    padding: 20px;
    ${'' /* max-width: 350px; */}
    max-width: 400px;
    margin: auto;
    color: white;
    box-shadow: 0 0 15px rgba(138, 43, 226, 0.7);
    font-family: 'Roboto', sans-serif;
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const NftImage = styled.img`
    border-radius: 10px;
    width: 100%;
    ${'' /* max-width: 300px; */}
`;

const Details = styled.div`
    margin-bottom: 20px;
    text-align: center;
`;

const Button = styled.button`
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

const BackstoryContainer = styled.div`
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #8a2be2;
    border-radius: 10px;
    background-color: #2a2a2a;
    box-shadow: 0 0 10px rgba(138, 43, 226, 0.7);
`;

const Paragraph = styled.p`
    margin-bottom: 10px;
`;

// const Card = styled.div`
//     border: 1px solid #e2e2e2;
//     border-radius: 10px;
//     padding: 1rem;
//     margin: 1rem;
//     width: 300px;
//     box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.07);
//     background-color: #2a2a2a; // dark background color
//     color: #f0f0f0; // light text color
//     word-wrap: break-word; // prevent text from spilling out
// `;

// const CardHeader = styled.h2`
//     font-size: 1.25rem;
//     margin-bottom: 1rem;
// `;

// const CardImage = styled.img`
//     width: 100%;
//     height: 200px;
//     object-fit: contain; // adjust to prevent excessive cropping
//     border-radius: 10px;
//     margin-bottom: 1rem;
// `;

// const CardText = styled.div`
//     font-size: 1rem;
//     text-align: center;
// `;

// const CardInfo = styled.div`
//     font-size: 0.875rem;
//     color: #888;
//     margin-bottom: 0.5rem;
// `;
