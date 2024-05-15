import { useContext } from 'react';
import styled from 'styled-components';

import { ErrorContext } from './ErrorContext';

const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; // Full viewport height
`;

const ErrorContainer = styled.div`
    display: flex;
    width: 60%;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 1rem;
    padding: 1rem;
    background-color: #f8d7da;
    color: var(--text-color);
    border-color: var(--border-color);
    border-radius: 0.25rem;
    font-family: 'Courier New', monospace; // Monospace fonts are often associated with code and tech
    background-color: #f0f0f0; // Light grey background
    color: #333; // Dark grey text
`;

const ErrorMessage = styled.p`
    text-align: center;
    margin: 1rem;
    color: #ff4500; // Orange text for error messages
`;

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
                <h1>{title}</h1>
                <h2>{errorStatus}</h2>
                <ErrorMessage>{message}</ErrorMessage>
                <ErrorMessage>Here's what we know:</ErrorMessage>
                <ErrorMessage>
                    <i>{errorDetail}</i>
                </ErrorMessage>
            </ErrorContainer>
        </PageContainer>
    );
}
