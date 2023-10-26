import "./advertisement.css";
import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import ApplicationForm from "./applicationForm";
import { toast } from "sonner";

function Advertisement(props) {
    const { title, location, name, postdate, id, companyid } =
        props.advertisement;
    const [moreInfo, setMoreInfo] = useState(undefined);
    const [showForm, setShowForm] = useState(false);
    const [cookies] = useCookies(["jwt"]);
    const jwt =
        cookies.jwt !== "undefined" && cookies.jwt !== undefined
            ? jwtDecode(cookies.jwt)
            : undefined;

    const HandleSeeMore = () => {
        axios
            .get(`http://localhost:8080/advertisement/${id}`)
            .then((res) => {
                setMoreInfo(res.data);
            })
            .catch((error) => {
                toast.error("Error while retieving more information");
                console.log(error);
            });
    };

    const HandleApply = () => {
        if (jwt?.userId) {
            axios
                .post("http://localhost:8080/application", {
                    advertisementid: id,
                    email: jwt.email,
                    firstname: jwt.firstName,
                    lastname: jwt.lastName,
                })
                .then((response) => {
                    toast.success(
                        `You've applied to the ${title} advertisement`
                    );
                    console.log(response);
                })
                .catch((error) => {
                    toast.error("Error while applying to this advertisement");
                    console.log(error);
                });
        } else {
            setShowForm(true);
        }
    };

    return (
        <div className="advertisement" key={id}>
            <div className="advertisement-header">
                <span className="advertisement-title">{title}</span>
                <span className="label">
                    Work at: <span className="value">{name}</span>
                </span>
            </div>
            <div className="advertisement-information">
                <div className="information-container">
                    <span className="label">
                        Place: <span className="value">{location}</span>
                    </span>
                    <span className="label">
                        Advertisement created at{" "}
                        <span className="value">{postdate}</span>
                    </span>
                </div>
                {moreInfo && (
                    <>
                        <p>{moreInfo.description}</p>
                        <div className="information-container">
                            <span className="label">
                                Wage:{" "}
                                <span className="value wage">
                                    {moreInfo.wage}$
                                </span>
                            </span>
                            <span className="label">
                                Contact:{" "}
                                <span className="value">
                                    {moreInfo.contact}
                                </span>
                            </span>
                        </div>
                    </>
                )}
            </div>
            {(!moreInfo || !showForm) && (
                <div
                    className="button-container"
                    style={
                        !moreInfo
                            ? { justifyContent: "space-between" }
                            : { justifyContent: "flex-end" }
                    }
                >
                    {!moreInfo && (
                        <button
                            className="ad-primary-button"
                            onClick={HandleSeeMore}
                        >
                            See more
                        </button>
                    )}
                    {!showForm && (
                        <button
                            className="ad-primary-button"
                            onClick={HandleApply}
                        >
                            I apply
                        </button>
                    )}
                </div>
            )}
            {showForm && <ApplicationForm props={{ id }} />}
        </div>
    );
}

export default Advertisement;
