import React from 'react';

import ErrorPage from './ErrorPage';
import { ErrorContext } from './ErrorContext';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <ErrorContext.Provider value={this.state.error}>
                    <ErrorPage />
                </ErrorContext.Provider>
            );
        }

        return this.props.children;
    }
}
