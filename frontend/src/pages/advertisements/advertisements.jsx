import "./advertisements.css";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Advertisement from "./component/advertisement";
import image from "../../assets/icon.svg";
import { toast } from "sonner";

function Advertisements() {
    const [advertisement, setAdvertisement] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/advertisement")
            .then((res) => {
                setAdvertisement(res.data);
            })
            .catch((error) => {
                toast.error("Error while retieving the advertisements");
                console.log(error);
            });
    }, []);

    return (
        <div className="page">
            {advertisement.length !== 0 ? (
                <div className="advertisements-container">
                    <h1 className="advertisements-title">
                        {advertisement.length} annonces en ligne
                    </h1>
                    {advertisement.map((advertisement, key) => (
                        <Advertisement
                            advertisement={advertisement}
                            key={key}
                        />
                    ))}
                </div>
            ) : (
                <img className="logo" alt="JobHub Logo" src={image} />
            )}
        </div>
    );
}

export default Advertisements;
