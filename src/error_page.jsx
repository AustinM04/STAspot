import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "/src/components/header/Header.jsx";
import About from "/src/components/about/About.jsx";

const Err403Page = () => {
    return (
        <>
            <Header/>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card text-white transparent-black p-5" style={{ maxWidth: '600px' }}>
                    <div className="card-body text-center">
                        <h1 className="mb-4">404 - PAGE NOT FOUND</h1>
                        <h4 className="mb-4">Oops, we can't find this page!.</h4>
                        <p className="mb-4">
                            404 error codes are generated when a user attempts to access a webpage that does not exist,
                            has been moved, or has a dead or broken link. The 404 error code is one of the most frequent
                            errors a web user encounters.
                        </p>
                        <a href="/" className="btn btn-light webertext">Go to homepage</a>
                    </div>
                </div>
            </div>
            <About/>
        </>
    );
};

export default Err403Page;
