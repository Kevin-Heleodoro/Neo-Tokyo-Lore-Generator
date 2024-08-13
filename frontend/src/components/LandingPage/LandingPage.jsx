import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

/**
 * This component is the landing page for the application. It displays an "Enter Citizen"
 * button that, when clicked, will route the user to the home page.
 *
 * @returns <LandingPage />
 */
const LandingPage = () => {
    const navigate = useNavigate();

    async function handleEnter() {
        navigate('/home');
    }

    return (
        <PageContainer>
            <ConnectButton onClick={handleEnter}>Enter Citizen</ConnectButton>
        </PageContainer>
    );
};

export default LandingPage;

/**
 * Styled Components
 */

const PageContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('/img/neo-tokyo-background.jpeg');
    background-size: cover;
`;

const ConnectButton = styled.button`
    padding: 30px 40px;
    font-size: 1.75em;
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
