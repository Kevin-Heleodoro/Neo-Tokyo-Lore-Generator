import styled from 'styled-components';

/**
 * NftCardContainer
 */

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: row;
    margin: 1rem;
`;

export const EmptyMessage = styled.div`
    background-color: #1f1f1f;
    border: 2px solid #8a2be2;
    border-radius: 15px;
    padding: 20px;
    max-width: 400px;
    margin: auto;
    color: white;
    box-shadow: 0 0 15px rgba(138, 43, 226, 0.7);
    font-family: 'Roboto', sans-serif;
`;

export const Paragraph = styled.p`
    margin-bottom: 10px;
`;

/**
 * NftCard
 */

export const Card = styled.div`
    background-color: #1f1f1f;
    border: 2px solid #8a2be2;
    border-radius: 15px;
    padding: 20px;
    max-width: 400px;
    margin: auto;
    color: white;
    box-shadow: 0 0 15px rgba(138, 43, 226, 0.7);
    font-family: 'Roboto', sans-serif;
`;

export const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

export const NftImage = styled.img`
    border-radius: 10px;
    width: 100%;
`;

export const Details = styled.div`
    margin-bottom: 10px;
    text-align: center;
`;

export const Button = styled.button`
    padding: 10px 20px;
    font-size: 1em;
    color: #ffffff;
    background-color: #8a2be2;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        background-color: #7a1ed2;
        box-shadow: 0 0 10px #7a1ed2;
    }
`;

export const BackstoryContainer = styled.div`
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #8a2be2;
    border-radius: 10px;
    background-color: #2a2a2a;
    box-shadow: 0 0 10px rgba(138, 43, 226, 0.7);
    max-height: 40vh;
    overflow-y: auto;

    @media (max-width: 480px) {
        max-height: 150px;
    }
`;

/**
 * NftThumbnail
 */

export const Thumbnail = styled.div`
    background-color: #1f1f1f;
    border: 2px solid #8a2be2;
    border-radius: 15px;
    padding: 5px;
    max-width: 150px;
    margin: auto;
    color: white;
    box-shadow: 0 0 15px rgba(138, 43, 226, 0.7);
    font-family: 'Roboto', sans-serif;
`;
