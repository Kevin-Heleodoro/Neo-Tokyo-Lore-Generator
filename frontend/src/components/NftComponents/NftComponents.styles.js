import styled from 'styled-components';

/**
 * NftCardContainer
 */

export const Backdrop = styled.div`
    background-color: rgba(0, 0, 0, 0.4); /* Opaque backdrop */
    padding: 1rem;
    border-radius: 15px;
    margin: 1rem;
    border: 1px solid black;
    min-width: 150px;
`;

export const Container = styled.div`
    display: ${({ dashboardView }) => (dashboardView ? 'grid' : 'flex')};
    flex-wrap: ${({ dashboardView }) => (dashboardView ? 'nowrap' : 'wrap')};
    justify-content: ${({ dashboardView }) =>
        dashboardView ? 'start' : 'center'};
    grid-template-columns: ${({ dashboardView }) =>
        dashboardView ? 'repeat(5, 1fr)' : '1fr'};
    gap: 1rem;

    @media (max-width: 900px) {
        grid-template-columns: ${({ dashboardView }) =>
            dashboardView ? 'repeat(4, 1fr)' : '1fr'};
    }

    @media (max-width: 600px) {
        grid-template-columns: ${({ dashboardView }) =>
            dashboardView ? 'repeat(3, 1fr)' : '1fr'};
    }

    @media (max-width: 450px) {
        grid-template-columns: ${({ dashboardView }) =>
            dashboardView ? 'repeat(2, 1fr)' : '1fr'};
    }

    @media (max-width: 350px) {
        grid-template-columns: ${({ dashboardView }) =>
            dashboardView ? '1fr' : '1fr'};
    }
`;

export const PageSelectContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    gap: 10px;
`;

export const PageButton = styled.button`
    padding: 10px 15px;
    font-size: 1em;
    color: ${({ isActive }) => (isActive ? '#ffffff' : '#8a2be2')};
    background-color: ${({ isActive }) =>
        isActive ? '#8a2be2' : 'transparent'};
    border: 2px solid #8a2be2;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #7a1ed2;
        box-shadow: 0 0 10px #7a1ed2;
    }

    &:disabled {
        color: #666;
        background-color: #444;
        border: 2px solid #444;
        cursor: not-allowed;
        box-shadow: none;
    }
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
    max-width: 400px;
    margin: auto;
    color: white;
    box-shadow: 0 0 15px rgba(138, 43, 226, 0.7);
    font-family: 'Roboto', sans-serif;
`;
