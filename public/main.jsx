import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../src/App.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from '../src/root.jsx';
import ErrorPage from '../src/error_page.jsx';
import Ous from '../src/components/ous/Ous.jsx';
import Tickets from '../src/components/tickets/Tickets.jsx';

import Register from "../src/components/authentication/Register.jsx"; // Registration page
import SignIn from "../src/components/authentication/Login.jsx";// Login page
import ProtectedRoute from "../src/components/protected route/ProtectedRoute.jsx";
import Err403Page from "../src/components/error/err403Page.jsx"; // The ProtectedRoute component

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />
    },
    {
        path: '/ous',
        element: (
            <ProtectedRoute>
                <Ous />
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage />
    },
    {
        path: '/tickets',
        element: <Tickets />,
        errorElement: <ErrorPage />
    },
    {
        path: '/login', // Separate login page
        element: <SignIn />,
        errorElement: <ErrorPage />
    },
    {
        path: '/register', // Separate register page
        element: <Register />,
        errorElement: <ErrorPage />
    },
    {
        path: '/error403',
        element: <Err403Page />,
        errorElement: <ErrorPage />
    },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
