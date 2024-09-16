import React from 'react';
import "./home.css";


const Home = () => {
    return (
        <div>
            <div id="jumbo">
                <div className="p-5 mb-4 bg-dark lg jumbo_bg mt-4 wumbo_round">
                    <div className="container-fluid py-5">
                        <div className="d-flex justify-content-center justify-content-md-start">
                            <h1 className="display-5 fw-bold text-light d-inline-flex p-2 rounded-start transparent-black rounded-top-4">
                                STA Spot
                            </h1>
                        </div>
                        <p className="col-md-8 text-responsive text-light p-2 transparent-black rounded">
                            Welcome to the STA spot! This is the information hub for all your STA duties and the info
                            you should know!
                            Here you can find just about any information you will need to do your job easily and
                            efficiently!
                        </p>
                        <div className="d-flex justify-content-center justify-content-md-start">
                            <a href="https://www.weber.edu/sat">
                                <button className="btn btn-primary btn-lg" type="button">Learn More about SAT</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;