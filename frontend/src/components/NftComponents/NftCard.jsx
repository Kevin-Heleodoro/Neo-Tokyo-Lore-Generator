import React from 'react';
import styled from 'styled-components';

// const Card = styled.div`
//     background-color: #fff;
//     border-radius: 10px;
//     padding: 10px;
//     margin: 10px;
//     box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
//     transition: all 0.3s ease-in-out;
//     &:hover {
//         box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
//         transform: scale(1.05);
//     }
//     height: 100%;
//     width: 25rem;
// `;

// const CardHeader = styled.div`
//     font-size: 1.5rem;
//     font-weight: 600;
//     text-align: center;
//     margin-bottom: 1rem;
// `;

// const CardBody = styled.div`
//     font-size: 1rem;
//     text-align: center;
// `;

// const CardImage = styled.img`
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     border-radius: 10px;
//     margin-bottom: 1rem;
// `;

// const CardText = styled.div`
//     font-size: 1rem;
//     text-align: center;
// `;

// const NftCard = ({ nft }) => {
//     return (
//         <Card key={nft.contract.deployedBlockNumer + nft.tokenId} className="">
//             <CardHeader>{nft.name}</CardHeader>
//             <CardImage variant="top" src={nft.img} />
//             <CardBody>
//                 <CardText>{nft.description}</CardText>
//             </CardBody>
//         </Card>
//     );
// };
const Card = styled.div`
    border: 1px solid #e2e2e2;
    border-radius: 10px;
    padding: 1rem;
    margin: 1rem;
    width: 300px;
    box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.07);
    background-color: #2a2a2a; // dark background color
    color: #f0f0f0; // light text color
    word-wrap: break-word; // prevent text from spilling out
`;

const CardHeader = styled.h2`
    font-size: 1.25rem;
    margin-bottom: 1rem;
`;

const CardImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: contain; // adjust to prevent excessive cropping
    border-radius: 10px;
    margin-bottom: 1rem;
`;

const CardText = styled.div`
    font-size: 1rem;
    text-align: center;
`;

const CardInfo = styled.div`
    font-size: 0.875rem;
    color: #888;
    margin-bottom: 0.5rem;
`;

const NftCard = ({ nft }) => {
    return (
        <Card key={nft.contract.address + nft.tokenId}>
            <CardHeader>{nft.name}</CardHeader>
            <CardImage src={nft.img} alt={nft.name} />
            <CardInfo>Collection: {nft.collection.name}</CardInfo>
            <CardInfo>Contract: {nft.contract.address}</CardInfo>
            <CardInfo>Token ID: {nft.tokenId}</CardInfo>
            <CardInfo>Token Type: {nft.tokenType}</CardInfo>
        </Card>
    );
};

export default NftCard;
