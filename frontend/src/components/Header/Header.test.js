import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';

// Mock the SearchContainer component
jest.mock('./SearchContainer', () => () => <div>SearchContainer Mock</div>);

describe('HeaderComponent', () => {
    test('renders the header with title and search container', () => {
        render(
            <Router>
                <Header setNfts={jest.fn()} setLoading={jest.fn()} />
            </Router>
        );

        // Check if the title is rendered
        expect(screen.getByText(/NeoScribe/i)).toBeInTheDocument();

        // Check if the SearchContainer is rendered
        expect(screen.getByText(/SearchContainer Mock/i)).toBeInTheDocument();
    });

    test('toggles the hamburger menu and displays MobileSearchContainer', () => {
        render(
            <Router>
                <Header setNfts={jest.fn()} setLoading={jest.fn()} />
            </Router>
        );

        const hamburgerMenu = screen.getByTestId('hamburger-button');
        const mobileSearchContainer =
            screen.queryByText(/SearchContainer Mock/i);

        // Initially, the MobileSearchContainer should not be visible
        expect(mobileSearchContainer).not.toBeVisible();

        // Click the hamburger menu to open it
        fireEvent.click(hamburgerMenu);

        // Now the MobileSearchContainer should be visible
        expect(screen.getByText(/SearchContainer Mock/i)).toBeVisible();

        // Click the hamburger menu again to close it
        fireEvent.click(hamburgerMenu);

        // Now the MobileSearchContainer should not be visible again
        expect(screen.queryByText(/SearchContainer Mock/i)).not.toBeVisible();
    });

    test('MobileSearchContainer is not displayed on desktop screens', () => {
        render(
            <Router>
                <Header setNfts={jest.fn()} setLoading={jest.fn()} />
            </Router>
        );

        // Check if the SearchWrapper is displayed (indicating a desktop view)
        expect(screen.getByText(/SearchContainer Mock/i)).toBeVisible();

        // Check that the MobileSearchContainer is not in the document
        const mobileSearchContainer = screen.queryByTestId(
            'mobile-search-container'
        );
        expect(mobileSearchContainer).toBeNull();
    });
});
