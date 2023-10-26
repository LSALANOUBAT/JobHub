import React from "react";
import GenericPage from "../components/GenericPage";

const CompanyMonitor = () => {
    const CompanyColumns = [
        { key: "id", header: "ID", type: "number" },
        { key: "name", header: "Company Name", type: "text" },
        { key: "employees", header: "Number of employees", type: "number" },
        { key: "description", header: "Description", type: "textarea" },
    ];
    return (
        <GenericPage
            pageTitle="Companies"
            apiUrl={"http://localhost:8080/companies"}
            columns={CompanyColumns}
        ></GenericPage>
    );
};

export default CompanyMonitor;
