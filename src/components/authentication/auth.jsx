import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../../config/firebase.js';
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    setPersistence,
    browserSessionPersistence,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from 'firebase/auth';
import Header from "../header/Header.jsx";
import About from "../about/About.jsx";


export const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    // Track current user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Register with email and password
    const registerUser = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
            alert('Email already exists!\nPlease log in!');
        }
    };

    // Register or log in with Google
    const registerGoogleUser = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
            alert('Error during Google sign-in!');
        }
    };

    // Login with email and password
    const login = async () => {
        try {
            await setPersistence(auth, browserSessionPersistence);
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
            alert('Email or password is incorrect');
        }
    };

    // Logout
    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
            alert('Error logging out!');
        }
    };

    return (
        <div>
            <Header/>
            {user ? (
                <>
                    <p>Welcome, {user.displayName || user.email}!</p>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <div>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={registerUser} type="submit">Register</button>
                    <button onClick={registerGoogleUser}>Register With Google</button>
                    <button onClick={login} type="submit">Login</button>
                </div>
            )}
            <About/>
        </div>
    );
};

export default Auth;
