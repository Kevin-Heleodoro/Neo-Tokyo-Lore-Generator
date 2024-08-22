import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NftCard from './NftCard';
import { getLoreForCitizen } from '../../services/interfaces';

// Mock the getLoreForCitizen function
jest.mock('../../services/interfaces', () => ({
    getLoreForCitizen: jest.fn(),
}));

describe('NftCard Component', () => {
    const nftMock = {
        name: 'Citizen #1234',
        img: 'image-url',
        contract: { address: '0x123' },
        tokenId: '1234',
        raw: {
            metadata: {
                attributes: [
                    { trait_type: 'Name', value: 'Citizen #1234' },
                    { trait_type: 'Role', value: 'Warrior' },
                ],
            },
        },
    };

    test('renders NFT card with basic details', () => {
        render(<NftCard nft={nftMock} />);

        // Check if the NFT name is rendered
        expect(screen.getByText(/Citizen #1234/i)).toBeInTheDocument();

        // Check if the NFT image is rendered
        expect(screen.getByAltText(/Citizen #1234/i)).toHaveAttribute(
            'src',
            'image-url'
        );

        // Check if the "Who am I?" button is rendered
        expect(screen.getByText(/Who am I\?/i)).toBeInTheDocument();
    });

    test('displays loader while generating backstory', async () => {
        // Set the mock function to return a resolved promise
        getLoreForCitizen.mockResolvedValueOnce({
            backstory: 'This is the backstory.',
        });

        render(<NftCard nft={nftMock} />);

        const button = screen.getByText(/Who am I\?/i);

        // Click the button to generate the backstory
        fireEvent.click(button);

        // Check if the loader is displayed
        expect(screen.getByTestId('loader')).toBeInTheDocument();

        // Wait for the backstory to be displayed
        await screen.findByText(/This is the backstory/i);
    });

    test('displays backstory after generating it', async () => {
        // Set the mock function to return a resolved promise with a backstory
        getLoreForCitizen.mockResolvedValueOnce({
            backstory: 'This is the backstory.',
        });

        render(<NftCard nft={nftMock} />);

        const button = screen.getByText(/Who am I\?/i);

        // Click the button to generate the backstory
        fireEvent.click(button);

        // Wait for the backstory to be displayed
        await screen.findByText(/This is the backstory/i);
    });

    test('logs error and stops loading if backstory generation fails', async () => {
        console.error = jest.fn(); // Mock console.error to suppress error logs in test output

        // Set the mock function to return a rejected promise
        getLoreForCitizen.mockRejectedValueOnce(new Error('API Error'));

        render(<NftCard nft={nftMock} />);

        const button = screen.getByText(/Who am I\?/i);

        // Click the button to generate the backstory
        fireEvent.click(button);

        // Wait for the loader to disappear and "Who am I?" button to reappear
        await screen.findByText(/Who am I\?/i);

        // Ensure the error was logged
        expect(console.error).toHaveBeenCalledWith(expect.any(Error));
    });
});
