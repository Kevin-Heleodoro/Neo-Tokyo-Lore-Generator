import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease-in-out;
    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        transform: scale(1.05);
    }
    height: 100%;
    width: 25rem;
`;

const CardHeader = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 1rem;
`;

const CardBody = styled.div`
    font-size: 1rem;
    text-align: center;
`;

const CardImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 1rem;
`;

const CardText = styled.div`
    font-size: 1rem;
    text-align: center;
`;

const NftCard = ({ nft }) => {
    return (
        <Card key={nft.contract.deployedBlockNumer + nft.tokenId} className="">
            <CardHeader>{nft.name}</CardHeader>
            <CardImage variant="top" src={nft.img} />
            <CardBody>
                <CardText>{nft.description}</CardText>
            </CardBody>
        </Card>
    );
};

export default NftCard;
