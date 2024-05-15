import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './components/Error/ErrorBoundary';
import ErrorPage from './components/Error/ErrorPage';

// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <App />,
//         errorElement: <ErrorPage />,
//     },
//     {
//         path: '*',
//         element: <ErrorPage />,
//     },
// ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="*" element={<App />} />
                {/* <Route path="*" element={<ErrorPage is404={true} />} /> */}
            </Routes>
        </Router>
    </React.StrictMode>
);

// <Route
//                     path="/"
//                     element={
//                         <ErrorBoundary>
//                             <App />
//                         </ErrorBoundary>
//                     }
//                 />

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
