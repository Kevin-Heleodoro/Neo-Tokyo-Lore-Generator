import React from 'react';

import NftCard from './NftCard';
import NftThumbnail from './NftThumbnail';
import {
    Backdrop,
    Container,
    EmptyMessage,
    Paragraph,
} from './NftComponents.styles';

const NftCardContainer = ({ nfts, setDashboardView, dashboardView }) => {
    return (
        <Backdrop>
            <Container>
                {nfts?.length > 0 ? (
                    nfts.map((nft, index) =>
                        dashboardView ? (
                            <NftThumbnail
                                key={nft.tokenId || index}
                                nft={nft}
                            />
                        ) : (
                            <NftCard key={nft.tokenId || index} nft={nft} />
                        )
                    )
                ) : (
                    <EmptyMessage>
                        <Paragraph>Smells like meatbag in here ...</Paragraph>
                        <Paragraph>
                            No citizen found. Try searching for a different
                            wallet address or token ID.
                        </Paragraph>
                    </EmptyMessage>
                )}
            </Container>
        </Backdrop>
    );
};

export default NftCardContainer;
