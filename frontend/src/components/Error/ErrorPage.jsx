import { useContext } from 'react';
import styled from 'styled-components';

import { ErrorContext } from './ErrorContext';

export default function ErrorPage({ is404 = false }) {
    const error = useContext(ErrorContext);

    const title = is404 ? '404' : 'Oops!';
    const errorStatus = is404 ? '' : error ? error.status : '';
    const message = is404
        ? 'The page you are looking for does not exist.'
        : 'An unexpected error has occurred ... most likely your fault.';
    const errorDetail = is404
        ? 'You may have mistyped the address or the page may have moved.'
        : error
        ? error.statusText || error.message
        : '... very little';

    return (
        <PageContainer>
            <ErrorContainer id="error-page">
                <ErrorTitle>{title}</ErrorTitle>
                <ErrorStatus>{errorStatus}</ErrorStatus>
                <ErrorMessage>{message}</ErrorMessage>
                <ErrorMessage>Here's what we know:</ErrorMessage>
                <ErrorMessage>
                    <i>{errorDetail}</i>
                </ErrorMessage>
            </ErrorContainer>
        </PageContainer>
    );
}

const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; // Full viewport height
    background-color: #1f1f1f; // Dark background similar to NftCard
`;

const ErrorContainer = styled.div`
    display: flex;
    width: 60%;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 1rem;
    padding: 2rem;
    background-color: #1f1f1f; // Dark background to match NftCard
    color: white; // White text color
    border: 2px solid #8a2be2; // Border to match NftCard
    border-radius: 15px; // Border radius to match NftCard
    box-shadow: 0 0 15px rgba(138, 43, 226, 0.7); // Shadow effect
    font-family: 'Roboto', sans-serif; // Font to match NftCard
`;

const ErrorTitle = styled.h1`
    font-size: 2em;
    color: #8a2be2; // Title color matching border color
    margin: 0.5rem 0;
`;

const ErrorStatus = styled.h2`
    font-size: 1.5em;
    color: #8a2be2; // Status color matching title color
    margin: 0.5rem 0;
`;

const ErrorMessage = styled.p`
    text-align: center;
    margin: 0.5rem;
    color: #ffffff; // White text for messages
`;
