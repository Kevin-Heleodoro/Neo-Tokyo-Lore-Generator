import React from 'react';
import styled from 'styled-components';
import NftCard from './NftCard';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: row;
    margin: 1rem;
`;

const NftCardContainer = ({ nfts }) => {
    return (
        <Container>
            {nfts.map((nft, index) => (
                <NftCard key={index} nft={nft} />
            ))}
        </Container>
    );
};

export default NftCardContainer;
