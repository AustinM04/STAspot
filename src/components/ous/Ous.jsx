import React, { useState } from 'react';
import Header from "../header/Header.jsx";
import About from "../about/About.jsx";
import { service } from "./service.js";

const Ous = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredServices = service.filter(s => {
        const searchText = searchTerm.toLowerCase();
        return s.name.toLowerCase().includes(searchText) ||
            s.building.toLowerCase().includes(searchText) ||
            s.room.toLowerCase().includes(searchText) ||
            s.ou.toLowerCase().includes(searchText);
    });

    return (
        <div>
            <main>
                <Header />
                <div className="container-fluid col-12 col-md-10 offset-md-1 mt-5">
                    <div className="d-flex justify-content-center mt-5">
                        <h1 className="display-5 fw-bold text-light bg-dark d-inline-flex p-2 rounded-start bg-opacity-75 rounded-top-4">
                            Maps & OUs
                        </h1>
                    </div>

                    <hr className="border-white" />

                    <div className="card bg-white border-0">
                        <div className="card-header fs-3 webercolor text-white">What is an OU?</div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0 text-black">
                                <p>
                                    In Active Directory (AD), an "OU" stands for "Organizational Unit." It is a
                                    container within an Active
                                    Directory domain that is used to organize and manage objects, such as users, groups,
                                    computers, and other
                                    resources. OUs provide a way to structure and group these objects in a logical and
                                    hierarchical manner,
                                    making it easier to manage and apply policies to them.
                                </p>
                            </blockquote>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="container-fluid d-inline-flex ms-0 ps-0 mt-4">
                            <div className="col-12 col-md-5">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="gridsearch"
                                    placeholder="Search here..."
                                    onChange={handleSearch}
                                />
                            </div>
                            <div className="col-1 d-lg-block text-white d-none d-md-inline-flex ms-3 fs-4">
                                <i className="bi bi-search"></i>
                            </div>
                        </div>
                        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3 my-2">
                            {filteredServices.map(s => (
                                <div key={s.id} className="col">
                                    <div className="card h-100 cardhov border-0">
                                        <div className="card-header webercolor text-white">
                                            {s.name}
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">Building: {s.building}</li>
                                            <li className="list-group-item">Room: {s.room}</li>
                                            <li className="list-group-item">OU: {s.ou}</li>
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="container-fluid col-md-12 mt-5">
                        <img src="" alt="" className="img-fluid" />
                    </div>
                </div>
            </main>
            <About />
        </div>
    );
};

export default Ous;
