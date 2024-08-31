import { useState } from 'react';

import {
    Thumbnail,
    ImageContainer,
    Details,
    NftImage,
} from './NftComponents.styles';

const backupImageUrl = require('../../img/neo_tokyo_filler.png');

const NftThumbnail = ({ nft }) => {
    const [currentSrc, setCurrentSrc] = useState(backupImageUrl);

    const handleImageLoad = () => {
        setCurrentSrc(nft.image.thumbnailUrl);
    };

    const handleImageError = () => {
        console.log(`Error handling image for ${nft.name}`);
        setCurrentSrc(backupImageUrl);
    };

    return (
        <Thumbnail>
            <ImageContainer alt={nft.name}>
                <NftImage
                    src={currentSrc}
                    alt={nft.name}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />
            </ImageContainer>
            <Details>{nft.name}</Details>
        </Thumbnail>
    );
};

export default NftThumbnail;
