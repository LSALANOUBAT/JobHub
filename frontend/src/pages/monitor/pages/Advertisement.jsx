import React from "react";
import GenericPage from "../components/GenericPage";

const AdvertisementMonitor = () => {
    const AdvertisementColumns = [
        { key: "id", header: "ID", type: "number" },
        { key: "companyid", header: "Company ID", type: "number" },
        { key: "title", header: "Job Title", type: "text" },
        { key: "description", header: "Description", type: "textarea" },
        { key: "location", header: "Location", type: "text" },
        { key: "wage", header: "Wage", type: "number" },
        { key: "contact", header: "Contact", type: "email" },
    ];
    return (
        <GenericPage
            pageTitle="Advertisements"
            apiUrl={"http://localhost:8080/advertisement/monitor"}
            columns={AdvertisementColumns}
        ></GenericPage>
    );
};

export default AdvertisementMonitor;
