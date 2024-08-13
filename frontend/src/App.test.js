// App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
// import LandingPage from './components/LandingPage/LandingPage';
// import Dashboard from './components/Dashboard/Dashboard';
// import ErrorPage from './components/Error/ErrorPage';

// Mock the child components for focused testing
jest.mock('./components/LandingPage/LandingPage', () => () => (
    <div>Landing Page</div>
));
jest.mock('./components/Dashboard/Dashboard', () => () => <div>Dashboard</div>);
jest.mock('./components/Error/ErrorPage', () => ({ is404 }) => (
    <div>{is404 ? '404 Error Page' : 'Error Page'}</div>
));

describe('App Component', () => {
    it('renders LandingPage component for the default route', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByText('Landing Page')).toBeInTheDocument();
    });

    it('renders Dashboard component for /home route', () => {
        render(
            <MemoryRouter initialEntries={['/home']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('renders ErrorPage component for unknown routes', () => {
        render(
            <MemoryRouter initialEntries={['/unknown']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByText('404 Error Page')).toBeInTheDocument();
    });
});
