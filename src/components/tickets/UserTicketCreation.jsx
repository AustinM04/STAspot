import React, { useState } from 'react';
import { db, auth } from '../../config/firebase';
import { Timestamp, setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../header/Header.jsx";
import About from "../about/About.jsx";

const UserTicketCreation = () => {
    const [department, setDepartment] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const ticketName = auth.currentUser?.displayName + Timestamp.now()

    const handleSubmit = async () => {
        const user = auth.currentUser;

        if (!department || !location || !description) {
            setError('Please fill out all fields');
            return;
        }

        try {
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

            alert('Ticket created successfully!');
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Error creating ticket. Please try again.');
        }
    };

    return (
        <>

            <div className="container d-flex justify-content-center align-items-center vh-100">

                <div className="card bg-white mt-5 mx-auto rounded-4 col-6">
                    <div className="card-body p-5">
                        <div className="row mb-4">
                            <h2 className="fw-bold mb-2 text-center">Create a Ticket</h2>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="department" className="form-label">Department</label>
                                    <input type="text" placeholder="Department" className="form-control" id="department" value={department} onChange={(e) => setDepartment(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="location" className="form-label">Location</label>
                                    <input type="text" placeholder="Location" className="form-control" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea placeholder="Description of issue" className="form-control" id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>
                                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit Ticket</button>
                            </form>
                            {error && <p className="text-danger mt-3">{error}</p>}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default UserTicketCreation;
