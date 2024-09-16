import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../header/Header.jsx";
import About from "../about/About.jsx";

const Err403Page = () => {
    return (
        <>
            <Header/>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card text-white transparent-black p-5" style={{ maxWidth: '600px' }}>
                    <div className="card-body text-center">
                        <h1 className="mb-4">403 - ACCESS DENIED</h1>
                        <h4 className="mb-4">Oops, you don't have permission to access this page.</h4>
                        <p className="mb-4">
                            A web server may return a 403 Forbidden HTTP status code in response to a request from a
                            client for a web page or resource. The server can be reached but refuses to take any further action.
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
