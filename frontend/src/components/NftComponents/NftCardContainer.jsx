import React from 'react';

import NftCard from './NftCard';
import NftThumbnail from './NftThumbnail';
import { Container, EmptyMessage, Paragraph } from './NftComponents.styles';

const NftCardContainer = ({ nfts, setDashboardView, dashboardView }) => {
    return (
        <Container>
            {nfts?.length > 0 ? (
                nfts.map((nft, index) =>
                    dashboardView ? (
                        <NftThumbnail key={nft.tokenId || index} nft={nft} />
                    ) : (
                        <NftCard key={nft.tokenId || index} nft={nft} />
                    )
                )
            ) : (
                <EmptyMessage>
                    <Paragraph>Smells like meatbag in here ...</Paragraph>
                    <Paragraph>
                        No citizen found. Try searching for a different wallet
                        address or token ID.
                    </Paragraph>
                </EmptyMessage>
            )}
        </Container>
    );
};

export default NftCardContainer;

// /**
//  * Styled Components
//  */

// const Container = styled.div`
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;
//     flex-direction: row;
//     margin: 1rem;
// `;

// const EmptyMessage = styled.div`
//     background-color: #1f1f1f;
//     border: 2px solid #8a2be2;
//     border-radius: 15px;
//     padding: 20px;
//     max-width: 400px;
//     margin: auto;
//     color: white;
//     box-shadow: 0 0 15px rgba(138, 43, 226, 0.7);
//     font-family: 'Roboto', sans-serif;
// `;

// const Paragraph = styled.p`
//     margin-bottom: 10px;
// `;
