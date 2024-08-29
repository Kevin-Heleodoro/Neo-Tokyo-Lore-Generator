import { useState } from 'react';

import LoaderComponent from '../Shared/LoaderComponent';
import {
    Card,
    ImageContainer,
    NftImage,
    Details,
    Button,
    BackstoryContainer,
    Paragraph,
} from './NftComponents.styles';
import { getLoreForCitizen } from '../../services/interfaces';

const isDevelopment = process.env.NODE_ENV === 'development';
const isLocalhost = window.location.hostname === 'localhost';

/**
 * This component is a card that displays an NFT object. It displays the NFT's name,
 * image, collection, contract address, token ID, and token type.
 *
 * @param {*} nft The NFT object to be displayed
 * @returns <NftCard />
 */
const NftCard = ({ nft, isThumbnail }) => {
    const [backstory, setBackstory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleGenerateBackstory = async () => {
        try {
            setLoading(true);
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

            if (isDevelopment || isLocalhost) {
                console.log(lore);
            }

            setLoading(false);
            setBackstory(
                lore.backstory
                    .split('\n')
                    .map((paragraph, index) => (
                        <Paragraph key={index}>{paragraph}</Paragraph>
                    ))
            );
        } catch (error) {
            setBackstory('Failed to generate backstory. Please try again.');
            if (isDevelopment || isLocalhost) {
                console.log(error);
            }
            setLoading(false);
        }
    };

    return (
        <Card key={nft.contract.address + nft.tokenId}>
            <ImageContainer>
                {!imageLoaded && <LoaderComponent />}
                <NftImage
                    src={nft.img}
                    alt={nft.name}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageLoaded(false)}
                    style={{ display: imageLoaded ? 'block' : 'none' }}
                />
            </ImageContainer>
            {isThumbnail ? (
                <Details>
                    <p>{nft.name}</p>
                </Details>
            ) : (
                <Details>
                    <p>{nft.name}</p>
                    {loading ? (
                        <LoaderComponent />
                    ) : backstory ? (
                        <BackstoryContainer>{backstory}</BackstoryContainer>
                    ) : (
                        <Button onClick={handleGenerateBackstory}>
                            Who am I?
                        </Button>
                    )}
                </Details>
            )}
        </Card>
    );
};

export default NftCard;
