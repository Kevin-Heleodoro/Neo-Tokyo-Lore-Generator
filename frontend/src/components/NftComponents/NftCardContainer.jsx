import React from 'react';
import styled from 'styled-components';
import NftCard from './NftCard';

const NftCardContainer = ({ nfts }) => {
    return (
        <Container>
            {nfts &&
                nfts.map((nft, index) => <NftCard key={index} nft={nft} />)}
        </Container>
    );
};

export default NftCardContainer;

/**
 * Styled Components
 */

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: row;
    margin: 1rem;
`;
