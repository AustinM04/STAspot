import React from 'react';

const Lcards = () => {
    const cardData = [
        {
            id: "maps&ouscard",
            title: "Maps & OUs",
            content: `As an STA you will need to know who we service, where they are, and what their OU is. This page
                      includes basic mapping and OUs, this page will show you what departments we service, where those
                      departments are, and their specific OU in active directory. This page can be exceptionally helpful 
                      for new employees but will also prove useful to more seasoned STAs.`,
            link: "/ous",
            linkText: "Go to Maps & OUs"
        },
        {
            id: "imaging-card",
            title: "Imaging",
            content: `A walkthrough of our imaging process, for both testing and standard user computers. This page
                      includes images of the process at nearly every step as well as a short walkthrough of the steps 
                      and a video walkthrough. It also describes our OU naming conventions, policies, and best practices.`,
            link: "/",
            linkText: "Go to Imaging"
        },
        {
            id: "post-image",
            title: "Post-Image",
            content: `This page contains the post-image process and the programs we install, along with updates and 
                      processes to finalize an image for testing centers, standard users, labs, and Mac devices. 
                      It provides an understanding of best practices and how to efficiently serve users.`,
            link: "",
            linkText: "Go to Post-Image"
        },
        {
            id: "officeorganization",
            title: "Office Organization",
            content: `This page contains valuable information for STAs to understand the organization of the office, 
                      which allows them to serve users with peak efficiency.`,
            link: "/",
            linkText: "Go to Office Organization"
        },
        {
            id: "readiness",
            title: "Readiness",
            content: `This page covers a range of readiness topics, from what to bring to a task to understanding 
                      how to set up a printer. It provides STAs with a foundational readiness reference from day one.`,
            link: "/",
            linkText: "Go to Readiness"
        },
        {
            id: "tickets",
            title: "Tickets",
            content: `This page provides ticket management. Allowing STAs to manage ticket progress and details.
                      This page also allows for staff to request tickets and view progress and details of active
                      and past tickets.`,
            link: "/tickets",
            linkText: "Go to Tickets"
        }
    ];

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 my-2">
                {cardData.map((card) => (
                    <div className="col g-col-6" key={card.id}>
                        <div className="card bg-light h-100" id={card.id}>
                            <h5 className="card-header webercolor fs-4">{card.title}</h5>
                            <div className="card-body">
                                <p className="card-text fs-5">{card.content}</p>
                            </div>
                            <div className="card-footer border-0 mb-3 bg-light">
                                <a href={card.link} className="btn webercolor">{card.linkText}</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Lcards;
