import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirection
import { db, auth } from '../../config/firebase'; // Firebase config file
import { doc, getDoc } from 'firebase/firestore'; // To fetch user data
import { onAuthStateChanged } from 'firebase/auth'; // To check if the user is logged in
import UserTicketCreation from './UserTicketCreation';
import TechnicianTickets from './TechnicianTickets';
import Header from "../header/Header.jsx";
import About from "../about/About.jsx";

const Tickets = () => {
    const [isAdmin, setIsAdmin] = useState(null); // Initially set to null (loading state)
    const [loading, setLoading] = useState(true); // To show a loading state while checking user data
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is signed in and get their admin status
        const checkUserStatus = async () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    // Fetch user data from Firestore to check if they are an admin
                    const userDocRef = doc(db, 'users', user.uid); // Assuming your user data is in 'users' collection
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setIsAdmin(userData.isAdmin); // Set isAdmin to true/false based on the user's data
                    } else {
                        console.error("User document not found!");
                    }
                } else {
                    // If the user is not signed in, redirect to the login page
                    navigate('/login');
                }
                setLoading(false); // Stop loading once user data is checked
            });
        };

        checkUserStatus();
    }, [navigate]);

    // Show a loading spinner or message while checking the user's admin status
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />

            {isAdmin ? (
                <TechnicianTickets /> // If user is an admin, show the technician view
            ) : (
                <UserTicketCreation /> // If not an admin, show the user ticket creation form
            )}

            <About />
        </div>
    );
};

export default Tickets;
