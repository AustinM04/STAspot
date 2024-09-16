import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '/src/config/firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '/src/config/firebase.js';

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                // User not logged in, redirect to login page
                navigate('/login');
            } else {
                setUser(currentUser);
                try {
                    // Fetch the user's document from Firestore using their uid
                    const userDoc = await getDoc(doc(db, 'users', currentUser.uid));

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        if (userData.isAdmin) {
                            setIsAdmin(true); // Set if user is admin
                        } else {
                            // Redirect to /error403 if the user is not an admin
                            navigate('/error403');
                        }
                    } else {
                        // User document doesn't exist, redirect to error page
                        navigate('/error403');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    navigate('/error403'); // Redirect on error as well
                }
            }
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup listener
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // If the user is an admin, render the protected content
    return isAdmin ? children : null;
};

export default ProtectedRoute;
