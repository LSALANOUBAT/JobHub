import React, { useState, useEffect } from "react";

import NavBar from "./NavBar";
import axios from "axios";
import DataFetchingComponent from "./DataFetcher";
import DataTableComponent from "./DataTable";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { toast } from "sonner";

const GenericPage = ({ pageTitle, apiUrl, columns }) => {
    const [fetchedData, setFetchedData] = useState([]);

    const [cookies] = useCookies(["jwt"]);
    const navigate = useNavigate();

    useEffect(() => {
        const jwtToken = cookies.jwt;
        try {
            if (jwtToken) {
                const decodedToken = jwtDecode(jwtToken);
                if (!decodedToken?.isadmin) {
                    navigate("/");
                    toast.error("Access denied");
                }
            } else if (jwtToken === undefined) {
                navigate("/");
            }
        } catch (error) {
            toast.error("Access denied");
            navigate("/");
        }
    }, [cookies.jwt, navigate]);

    const fetchData = async () => {
        try {
            const response = await axios.get(apiUrl);
            setFetchedData(response.data);
        } catch (error) {}
    };

    const handleDataFetched = (data) => {
        setFetchedData(data);
    };

    const handleItemDeleted = () => {
        fetchData();
    };

    return (
        <div>
            <NavBar />
            <h2 style={{ color: "white", textAlign: "center" }}>{pageTitle}</h2>
            <DataFetchingComponent
                apiUrl={apiUrl}
                onDataFetched={handleDataFetched}
            />
            <DataTableComponent
                data={fetchedData}
                apiUrl={apiUrl}
                columns={columns}
                onDataFetched={handleItemDeleted}
            />
        </div>
    );
};

export default GenericPage;
