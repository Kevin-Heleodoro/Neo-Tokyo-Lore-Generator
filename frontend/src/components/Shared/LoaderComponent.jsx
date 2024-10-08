import styled, { keyframes } from 'styled-components';

const LoaderComponent = () => (
    <LoadingOverlay>
        <Loader />
    </LoadingOverlay>
);

export default LoaderComponent;

/**
 * Styled Components
 */
const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
    border: 16px solid #f3f3f3;
    border-top: 16px solid #8a2be2;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: ${spin} 2s linear infinite;
`;

const LoadingOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;
