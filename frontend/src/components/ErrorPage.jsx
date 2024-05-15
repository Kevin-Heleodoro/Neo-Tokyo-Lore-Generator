import { useRouteError } from 'react-router-dom';
import styled from 'styled-components';

const ErrorContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 1rem;
    padding: 1rem;
    background-color: #f8d7da;
    color: #721c24;
    border-color: #f5c6cb;
    border-radius: 0.25rem;
`;

const ErrorMessage = styled.p`
    text-align: center;
    margin: 1rem;
`;

export default function ErrorPage() {
    const error = useRouteError();

    console.error(error);

    return (
        <ErrorContainer id="error-page">
            <h1>Oops!</h1>
            <h2>{error.status}</h2>
            <ErrorMessage>
                An unexpected error has occurred ... most likely your fault.
            </ErrorMessage>
            <ErrorMessage>Here's what we know:</ErrorMessage>
            <ErrorMessage>
                <i>{error.statusText || error.message}</i>
            </ErrorMessage>
        </ErrorContainer>
    );
}
