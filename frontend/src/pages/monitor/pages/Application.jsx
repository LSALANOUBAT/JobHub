import React from "react";
import GenericPage from "../components/GenericPage";

const ApplicationMonitor = () => {
    const ApplicationColumns = [
        { key: "id", header: "ID", type: "number" },
        { key: "advertisementid", header: "Advertisement ID", type: "number" },
        { key: "firstname", header: "First Name", type: "text" },
        { key: "lastname", header: "Last name", type: "text" },
        { key: "email", header: "Email", type: "email" },
    ];
    return (
        <GenericPage
            pageTitle="Advertisements"
            apiUrl={"http://localhost:8080/application"}
            columns={ApplicationColumns}
        ></GenericPage>
    );
};

export default ApplicationMonitor;
