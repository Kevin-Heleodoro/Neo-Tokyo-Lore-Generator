import { useNavigate } from 'react-router-dom';

import { PageContainer, ConnectButton } from './LandingPage.styles';

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
