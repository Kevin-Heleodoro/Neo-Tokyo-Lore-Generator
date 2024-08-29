import { useState } from 'react';

import {
    Thumbnail,
    ImageContainer,
    Details,
    NftImage,
} from './NftComponents.styles';

const NftThumbnail = ({ nft }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <Thumbnail>
            <ImageContainer src={nft.img} alt={nft.name}>
                <NftImage
                    src={nft.img}
                    alt={nft.name}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageLoaded(false)}
                    style={{ display: imageLoaded ? 'block' : 'none' }}
                />
            </ImageContainer>
            <Details>{nft.name}</Details>
        </Thumbnail>
    );
};

export default NftThumbnail;
