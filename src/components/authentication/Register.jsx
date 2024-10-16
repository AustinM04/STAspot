import React, { useState } from 'react';
import { auth, db, googleProvider } from '../../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import Header from "../header/Header.jsx";
import About from "../about/About.jsx";


const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const fullName = firstName.trim() + " " + lastName.trim();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    // Handle user registration with email and password
    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Firebase registration
            const currentUser = userCredential.user;

            await setDoc(doc(db, "users", currentUser.uid), {
                first: firstName,
                last: lastName,
                email: email,
                isAdmin: false, // Default isAdmin to false
                activeTickets: 0,
                closedTickets: 0,
                pendingTickets: 0,
            });

            await updateProfile(currentUser, { displayName: fullName });

            alert('User registered successfully!');
            navigate(from, { replace: true }); // Redirect to the protected route or "/"
        } catch (err) {
            console.error(err);
            setError('Failed to create account. Email might already be in use.');
        }
    };

    // Handle Google sign-up
    const handleGoogleSignUp = async () => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            const currentUser = userCredential.user;

            const gName = currentUser.displayName;
            const dbEmail = currentUser.email;

            await setDoc(doc(db, "users", currentUser.uid), {
                first: gName.split(" ")[0],
                last: gName.split(" ")[1] || gName,
                email: dbEmail,
                isAdmin: false, // Default isAdmin to false
                activeTickets: 0,
                closedTickets: 0,
                pendingTickets: 0,
            });

            alert('Registered with Google!');
            navigate(from, { replace: true }); // Redirect to the protected route or "/"
        } catch (err) {
            console.error(err);
            setError('Google sign-up failed.');
        }
    };

    return (
        <>
            <Header />
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card bg-white mt-5 mx-auto" style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                    <div className="card-body p-5">
                        <h2 className="fw-bold mb-2 text-center">Register</h2>
                        <p className="text-black-50 mb-3 text-center">Please create an account!</p>

                        <div className="row mb-4">
                            <div className="col">
                                <label htmlFor="fnameInput" className="form-label">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="lnameInput" className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="emailInput" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="passwordInput" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="confirmPasswordInput" className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button onClick={handleRegister} className="btn btn-primary w-100 mb-4">
                            Register
                        </button>

                        {error && <p className="text-danger text-center">{error}</p>}

                        <hr className="my-4"/>

                        <button onClick={handleGoogleSignUp} className="btn btn-danger w-100 mb-2">
                            <i className="bi bi-google mx-2"></i>
                            Register with Google
                        </button>
                    </div>
                </div>
            </div>
            <About/>
        </>
    );
};

export default Register;
