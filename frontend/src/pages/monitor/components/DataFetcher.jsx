import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

const DataFetchingComponent = ({ apiUrl, onDataFetched }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl);
                setData(response.data);
                onDataFetched(response.data);
            } catch (error) {
                toast.error("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
};

export default DataFetchingComponent;
