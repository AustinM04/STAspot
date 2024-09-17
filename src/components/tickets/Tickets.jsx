import React from 'react';
import UserTicketCreation from './UserTicketCreation';
import TechnicianTickets from './TechnicianTickets';
import Header from "../header/Header.jsx";
import About from "../about/About.jsx"; // Assuming you use Firebase for auth
import ProtectedRoute from "../protected route/ProtectedRoute.jsx";

const Tickets = () => {
    const isAdmin = <ProtectedRoute/>


    return (
        <div>
            <Header/>

            {isAdmin ? (
                    <TechnicianTickets /> // If admin, show technician's view
                ) : (
                    <UserTicketCreation /> // Else show the user ticket creation form
                )}

            <About/>
        </div>
    );
};

export default Tickets;
