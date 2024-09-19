import React, { useState } from 'react';
import { db, auth } from '../../config/firebase';
import { Timestamp, setDoc, doc } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Alert, ButtonToolbar } from 'react-bootstrap';

const UserTicketCreation = () => {
    const [department, setDepartment] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false); // New state for success message

    const handleClose = () => {
        setShow(false);
        // Do not reset the success state here, so the success alert stays visible after the modal is closed
    };

    const handleShow = () => setShow(true);

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
            const ticketName = `${user.displayName}_${Timestamp.now().toMillis()}`; // Create a unique ticket name using displayName and timestamp

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

            setError(null); // Clear any previous error
            setSuccess(true); // Show success alert
            setTimeout(() => setSuccess(false), 3000); // Hide success after 3 seconds

            // Clear the input fields after successful submission
            setDepartment('');
            setLocation('');
            setDescription('');

            handleClose();  // Close the modal after successful submission

        } catch (err) {
            console.error(err);
            setError('Error creating ticket. Please try again.');
        }
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

            {/* Show success alert outside the modal */}


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
        </div>
    );
};

export default UserTicketCreation;
