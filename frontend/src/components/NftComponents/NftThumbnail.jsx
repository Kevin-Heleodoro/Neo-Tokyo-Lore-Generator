import { useState } from 'react';

import {
    Thumbnail,
    ImageContainer,
    Details,
    NftImage,
} from './NftComponents.styles';

const isDevelopment = process.env.NODE_ENV === 'development';
const isLocalhost = window.location.hostname === 'localhost';

const backupImageUrl = require('../../img/neo_tokyo_filler.png');

const NftThumbnail = ({ nft }) => {
    const [currentSrc, setCurrentSrc] = useState(backupImageUrl);

    const handleImageLoad = () => {
        setCurrentSrc(nft.img);
        // setCurrentSrc(nft.image.thumbnailUrl);
    };

    const handleImageError = () => {
        if (isDevelopment || isLocalhost) {
            console.log(`Error handling image for ${nft.name}`);
        }
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
