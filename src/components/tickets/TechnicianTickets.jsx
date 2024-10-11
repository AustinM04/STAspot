import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase'; // Firebase config file
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { Button, Card, Nav, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import reactRefresh from "eslint-plugin-react-refresh";


const TechnicianTickets = () => {
    const [tickets, setTickets] = useState({ pending: [], active: [], closed: [] }); // Separate tickets by type
    const [activeTab, setActiveTab] = useState('pending'); // Tab to track the active view
    const [successMessage, setSuccessMessage] = useState(null);

    // Fetch all tickets from Firestore when the component mounts
    useEffect(() => {
        const fetchTickets = async () => {
            const ticketsCollection = collection(db, 'tickets');
            const ticketSnapshot = await getDocs(ticketsCollection);
            const ticketList = ticketSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Sort tickets into categories
            const pendingTickets = [];
            const activeTickets = [];
            const closedTickets = [];

            ticketList.forEach(ticket => {
                if (ticket.isPending) pendingTickets.push(ticket);
                else if (ticket.isActive) activeTickets.push(ticket);
                else if (ticket.isClosed) closedTickets.push(ticket);
            });

            setTickets({ pending: pendingTickets, active: activeTickets, closed: closedTickets });
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
            setTickets((prevTickets) => ({
                ...prevTickets,
                pending: prevTickets.pending.filter(ticket => ticket.id !== ticketId),
                active: [...prevTickets.active, prevTickets.pending.find(ticket => ticket.id === ticketId)],
            }));
            setSuccessMessage('Ticket accepted successfully!');
            setTimeout(() => setSuccessMessage(null), 3000);
            await(3000)


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
            setTickets((prevTickets) => ({
                ...prevTickets,
                active: prevTickets.active.filter(ticket => ticket.id !== ticketId),
                closed: [...prevTickets.closed, prevTickets.active.find(ticket => ticket.id === ticketId)],
            }));
            setSuccessMessage('Ticket closed successfully!');
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            console.error('Error closing ticket: ', err);
        }
    };



    // Helper function to render tickets in card format
    const renderTickets = (ticketList) => {
        return ticketList.map((ticket) => (
            <div key={ticket.id} className="col">
                <Card className="h-100 border-0">
                    <Card.Header className="webercolor text-white">
                        {ticket.department}
                    </Card.Header>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Location: {ticket.location}</li>
                        <li className="list-group-item">Description: {ticket.description}</li>
                        <li className="list-group-item">
                            {ticket.isClosed ? (
                                <span className="badge bg-secondary">Closed</span>
                            ) : ticket.isPending ? (
                                <span className="badge bg-warning">Pending</span>
                            ) : (
                                <span className="badge bg-success">Active</span>
                            )}
                        </li>
                        <li className="list-group-item">
                            {ticket.isPending && (
                                <Button className="btn btn-sm btn-success me-2" onClick={() => acceptTicket(ticket.id)}>
                                    Accept
                                </Button>
                            )}
                            {ticket.isActive && (
                                <Button className="btn btn-sm btn-danger" onClick={() => closeTicket(ticket.id)}>
                                    Close
                                </Button>
                            )}
                        </li>
                    </ul>
                </Card>
            </div>
        ));
    };

    return (
        <div className="vh-100">
            {successMessage && (
                <Alert variant="success" className="text-center">
                    {successMessage}
                </Alert>
            )}

            <h2 className="text-center m-4 webercolor flex-column col-3 p-3 rounded-4">Technician Ticket View</h2>

            {/* Nav bar for selecting ticket type */}
            <Nav fill variant="tabs" className="justify-content-center mt-3 webercolor " defaultActiveKey="pending">
                <Nav.Item>
                    <Nav.Link className="text-info" eventKey="pending" onClick={() => setActiveTab('pending')}>
                        Pending Tickets
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="text-info" eventKey="active" onClick={() => setActiveTab('active')}>
                        Active Tickets
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="text-info" eventKey="closed" onClick={() => setActiveTab('closed')}>
                        Closed Tickets
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            <div className="container-fluid col-12 col-md-10 offset-md-1 mt-5">
                {/* Render tickets based on the selected tab */}
                {activeTab === 'pending' && (
                    <>
                        <h2 className="text-light">Pending Tickets</h2>
                        <div className="row row-cols-1 row-cols-md-3 g-3">
                            {renderTickets(tickets.pending)}
                        </div>
                    </>
                )}
                {activeTab === 'active' && (
                    <>
                        <h2 className="text-light">Active Tickets</h2>
                        <div className="row row-cols-1 row-cols-md-3 g-3">
                            {renderTickets(tickets.active)}
                        </div>
                    </>
                )}
                {activeTab === 'closed' && (
                    <>
                        <h2 className="text-light">Closed Tickets</h2>
                        <div className="row row-cols-1 row-cols-md-3 g-3">
                            {renderTickets(tickets.closed)}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TechnicianTickets;
