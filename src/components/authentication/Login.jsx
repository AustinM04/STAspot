import React, { useState } from 'react';
import { auth, db, googleProvider } from '../../config/firebase';
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    setPersistence,
    browserSessionPersistence
} from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from "../header/Header.jsx";
import About from "../about/About.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { doc, setDoc, getDoc } from 'firebase/firestore';  // Import getDoc for checking Firestore

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    // Handle email/password login
    const handleLogin = async () => {
        try {
            await setPersistence(auth, browserSessionPersistence);
            await signInWithEmailAndPassword(auth, email, password);
            navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
            setError('Login failed. Please check your email or password.');
        }
    };

    // Handle Google login
    const handleGoogleLogin = async () => {
        try {
            // Sign in with Google popup
            const userCredential = await signInWithPopup(auth, googleProvider);
            const currentUser = userCredential.user;

            const usersDocRef = doc(db, "users", currentUser.uid); // Reference to Firestore document
            const userDoc = await getDoc(usersDocRef); // Check if the user document exists

            if (!userDoc.exists()) {
                // If user doesn't exist, add them to Firestore
                const gName = currentUser.displayName;
                const dbEmail = currentUser.email;

                await setDoc(doc(db, "users", currentUser.uid), {
                    first: gName.split(" ")[0],
                    last: gName.split(" ")[1] || gName,  // If last name is missing
                    email: dbEmail,
                    isAdmin: false, // Default isAdmin to false
                    activeTickets: 0,
                    closedTickets: 0,
                    pendingTickets: 0,
                });

                alert('Registered with Google!');
            } else {
                alert('Logged in with Google!');
            }

            navigate(from, { replace: true });  // Redirect to the original route or home page

        } catch (err) {
            console.error(err);
            setError('Google login failed.');
        }
    };

    return (
        <>
            <Header />
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="row w-100 d-flex justify-content-center align-items-center">
                    <div className="col-12">
                        <div className="card bg-white my-5 mx-auto" style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                            <div className="card-body p-5">
                                <h2 className="fw-bold mb-2 text-center">Sign in</h2>
                                <p className="text-muted mb-4 text-center">Please enter your login and password!</p>

                                <div className="mb-4">
                                    <label htmlFor="emailInput" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="emailInput"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="passwordInput" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="passwordInput"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <button onClick={handleLogin} className="btn btn-primary w-100 mb-4">
                                    Login
                                </button>

                                {error && <p className="text-danger text-center">{error}</p>}

                                <hr className="my-4" />

                                <button onClick={handleGoogleLogin} className="btn btn-danger w-100 mb-2">
                                    <i className="bi bi-google mx-2"></i>
                                    Sign in with Google
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <About />
        </>
    );
};

export default SignIn;
