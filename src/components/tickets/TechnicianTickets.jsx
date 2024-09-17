import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase'; // Firebase config file
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const TechnicianTickets = () => {
    const [tickets, setTickets] = useState([]);

    // Fetch tickets from Firestore when component mounts
    useEffect(() => {
        const fetchTickets = async () => {
            const ticketsCollection = collection(db, 'tickets');
            const ticketSnapshot = await getDocs(ticketsCollection);
            const ticketList = ticketSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTickets(ticketList);
        };

        fetchTickets();
    }, []);

    // Function to accept a ticket (changes isPending to false and isActive to true)
    const acceptTicket = async (ticketId) => {
        try {
            const ticketRef = doc(db, 'tickets', ticketId);
            await updateDoc(ticketRef, {
                isPending: false,
                isActive: true,
            });
            setTickets(tickets.map(ticket =>
                ticket.id === ticketId ? { ...ticket, isPending: false, isActive: true } : ticket
            ));
        } catch (err) {
            console.error('Error accepting ticket: ', err);
        }
    };

    // Function to close a ticket (changes isActive to false and isClosed to true)
    const closeTicket = async (ticketId) => {
        try {
            const ticketRef = doc(db, 'tickets', ticketId);
            await updateDoc(ticketRef, {
                isActive: false,
                isClosed: true,
            });
            setTickets(tickets.map(ticket =>
                ticket.id === ticketId ? { ...ticket, isActive: false, isClosed: true } : ticket
            ));
        } catch (err) {
            console.error('Error closing ticket: ', err);
        }
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Technician Ticket View</h2>
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Department</th>
                        <th scope="col">Location</th>
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tickets.length > 0 ? (
                        tickets.map(ticket => (
                            <tr key={ticket.id}>
                                <td>{ticket.department}</td>
                                <td>{ticket.location}</td>
                                <td>{ticket.description}</td>
                                <td>
                                    {ticket.isClosed ? (
                                        <span className="badge bg-secondary">Closed</span>
                                    ) : ticket.isPending ? (
                                        <span className="badge bg-warning">Pending</span>
                                    ) : (
                                        <span className="badge bg-success">Active</span>
                                    )}
                                </td>
                                <td>
                                    {ticket.isPending && (
                                        <button
                                            className="btn btn-sm btn-success me-2"
                                            onClick={() => acceptTicket(ticket.id)}
                                        >
                                            Accept
                                        </button>
                                    )}
                                    {ticket.isActive && (
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => closeTicket(ticket.id)}
                                        >
                                            Close
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No tickets available</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TechnicianTickets;
