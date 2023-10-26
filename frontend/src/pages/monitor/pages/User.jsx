import React from "react";
import GenericPage from "../components/GenericPage";

const UserMonitor = () => {
    const CompanyColumns = [
        { key: "id", header: "ID", type: "number" },
        { key: "firstname", header: "First Name", type: "text" },
        { key: "lastname", header: "Last Name", type: "text" },
        { key: "password", header: "Password", type: "text" },
        { key: "email", header: "Email", type: "email" },
        { key: "isadmin", header: "isadmin", type: "boolean" },
    ];
    return (
        <GenericPage
            pageTitle="Users"
            apiUrl={"http://localhost:8080/user"}
            columns={CompanyColumns}
        ></GenericPage>
    );
};

export default UserMonitor;
