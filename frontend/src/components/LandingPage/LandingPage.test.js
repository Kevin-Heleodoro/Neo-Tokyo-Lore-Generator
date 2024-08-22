import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from './LandingPage';

const mockedNavigate = jest.fn();

// Mock useNavigate hook from react-router-dom
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('LandingPage Component', () => {
    it('renders the LandingPage component correctly', () => {
        render(
            <MemoryRouter>
                <LandingPage />
            </MemoryRouter>
        );

        // Check if the Enter Citizen button is present
        expect(screen.getByText('Enter Citizen')).toBeInTheDocument();
    });

    // it('navigates to /home when the Enter Citizen button is clicked', () => {
    //     // Mock useNavigate to use the mockedNavigate function
    //     jest.mock('react-router-dom', () => ({
    //         ...jest.requireActual('react-router-dom'),
    //         useNavigate: () => mockedNavigate,
    //     }));

    //     render(
    //         <MemoryRouter>
    //             <LandingPage />
    //         </MemoryRouter>
    //     );

    //     const enterButton = screen.getByText('Enter Citizen');
    //     fireEvent.click(enterButton);

    //     // Assert that navigate was called with '/home'
    //     expect(mockedNavigate).toHaveBeenCalledWith('/home');
    // });
});
