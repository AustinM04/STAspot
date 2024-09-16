import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase'; // Ensure your Firebase setup is configured
import { signOut } from 'firebase/auth';
import './header.css'; // Ensure this file exists and has the appropriate styles

const Header = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Monitor the current user's authentication status
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe(); // Cleanup the listener on component unmount
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login'); // Redirect to the login page after logout
        } catch (err) {
            console.error('Logout error', err);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg webercolor navbar-dark py-1">
            <div className="container-fluid align-items-baseline">
                <NavLink className="navbar-brand" to="/">
                    <i className="bi bi-cpu fs-1 me-2"></i>
                    <h2 className="d-inline-flex bg-white webertext p-1 rounded-3 me-1">STA</h2>
                    Spot
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav" id="topNavBar">
                        <NavLink className="nav-link" to="/" id="home">
                            Home
                        </NavLink>
                        <NavLink className="nav-link" to="/ous">
                            Maps & OUs
                        </NavLink>

                        {/* Dropdown for Imaging and Post-Image */}
                        <div className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="imagingDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Imaging
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="imagingDropdown">
                                <li>
                                    <NavLink className="dropdown-item" to="/imaging">
                                        Imaging Process
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="dropdown-item" to="/post-image">
                                        Post-Image
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        <NavLink className="nav-link" to="/office-organization">
                            Office Organization
                        </NavLink>
                        <NavLink className="nav-link" to="/readiness">
                            Readiness
                        </NavLink>
                        <NavLink className="nav-link" to="/tickets">
                            Tickets
                        </NavLink>
                    </div>

                    {/* Auth Buttons */}
                    <div className="ms-auto">
                        {user ? (
                            <div className="d-flex align-items-center">
                                <span className="navbar-text me-3">
                                    Welcome, {auth.currentUser?.displayName}
                                </span>
                                <button className="btn btn-outline-light" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div>
                                <NavLink className="btn btn-outline-light me-2" to="/login">
                                    Login
                                </NavLink>
                                <NavLink className="btn btn-light" to="/register">
                                    Register
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
