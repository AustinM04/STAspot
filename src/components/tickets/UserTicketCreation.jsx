import React, { useEffect, useState } from 'react';
import { db, auth } from '../../config/firebase';
import { Timestamp, setDoc, doc, collection, query, where, getDocs } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Alert, ButtonToolbar, Card, Nav } from 'react-bootstrap';

const UserTicketCreation = () => {
    const [department, setDepartment] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [tickets, setTickets] = useState({ pending: [], active: [], closed: [] }); // Store tickets
    const [activeTab, setActiveTab] = useState('pending'); // Manage active ticket view

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Fetch tickets from Firestore based on the user's ID
    const fetchTickets = async () => {
        const user = auth.currentUser;

        if (!user) {
            setError('User not authenticated.');
            return;
        }

        try {
            const q = query(collection(db, 'tickets'), where('owner', '==', user.uid));
            const querySnapshot = await getDocs(q);

            const pendingTickets = [];
            const activeTickets = [];
            const closedTickets = [];

            querySnapshot.forEach((doc) => {
                const ticket = doc.data();
                if (ticket.isPending) {
                    pendingTickets.push(ticket);
                } else if (ticket.isActive) {
                    activeTickets.push(ticket);
                } else if (ticket.isClosed) {
                    closedTickets.push(ticket);
                }
            });

            setTickets({ pending: pendingTickets, active: activeTickets, closed: closedTickets });
        } catch (err) {
            console.error('Error fetching tickets:', err);
        }
    };

    useEffect(() => {
        fetchTickets(); // Fetch tickets on component mount
    }, [success]); // Refetch tickets when a new one is created

    const handleSubmit = async () => {
        const user = auth.currentUser;

        if (!user) {
            setError('User not authenticated.');
            return;
        }

        if (!department || !location || !description) {
            setError('Please fill out all fields');
            return;
        }

        try {
            const ticketName = `${user.displayName}_${Timestamp.now().toMillis()}`;

            await setDoc(doc(db, 'tickets', ticketName), {
                department,
                location,
                description,
                deviceType: "",
                make: "",
                model: "",
                wTag: "",
                isPending: true,
                isActive: false,
                isClosed: false,
                timeCreated: Timestamp.now(),
                owner: user.uid
            });

            setError(null);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);

            setDepartment('');
            setLocation('');
            setDescription('');
            handleClose();
            fetchTickets(); // Refresh tickets after successful submission
        } catch (err) {
            console.error(err);
            setError('Error creating ticket. Please try again.');
        }
    };

    // Helper function to render tickets in card format
    const renderTickets = (ticketList) => {
        return ticketList.map((ticket, index) => (
            <div key={index} className="col">
                <Card className="h-100 border-0">
                    <Card.Header className="webercolor text-white">
                        {ticket.department}
                    </Card.Header>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Location: {ticket.location}</li>
                        <li className="list-group-item">Description: {ticket.description}</li>
                    </ul>
                </Card>
            </div>
        ));
    };

    return (
        <div className="vh-100">
            {success && (
                <Alert variant="success" className="text-center">
                    Ticket created successfully!
                </Alert>
            )}

            <Button className="p-2 m-5 btn btn-primary" onClick={handleShow}>
                <i className="bi bi-plus"></i> Create a ticket
            </Button>
            <ButtonToolbar></ButtonToolbar>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold mb-2 text-center">Create a Ticket</Modal.Title>
                </Modal.Header>
                <Modal.Body className="container d-flex justify-content-center align-items-center vh-auto">
                    <form style={{ width: '80%' }}>
                        <div className="mb-3">
                            <label htmlFor="department" className="form-label">Department</label>
                            <input
                                type="text"
                                placeholder="Department"
                                className="form-control"
                                id="department"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="location" className="form-label">Location</label>
                            <input
                                type="text"
                                placeholder="Location"
                                className="form-control"
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                placeholder="Description of issue"
                                className="form-control"
                                id="description"
                                rows="4"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                style={{ width: '100%' }}
                            ></textarea>
                        </div>
                        {error && (
                            <Alert variant="danger" className="mt-3">
                                {error}
                            </Alert>
                        )}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                        Submit Ticket
                    </button>
                </Modal.Footer>
            </Modal>

            {/* Nav bar for selecting ticket type */}
            <Nav fill variant="tabs" className="justify-content-center mt-3" defaultActiveKey="pending">
                <Nav.Item>
                    <Nav.Link eventKey="pending" onClick={() => setActiveTab('pending')}>
                        Pending Tickets
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="active" onClick={() => setActiveTab('active')}>
                        Active Tickets
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="closed" onClick={() => setActiveTab('closed')}>
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

export default UserTicketCreation;
