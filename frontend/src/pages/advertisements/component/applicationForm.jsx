import "./applicationForm.css"
import React, { useRef } from "react";
import axios from "axios";
import { toast } from 'sonner';

function ApplicationForm(props) {
    const email = useRef();
    const firstName = useRef();
    const lastName = useRef();

    const HandleApply = () => {
        const emailValue = email.current.value;
        const firstNameValue = firstName.current.value;
        const lastNameValue = lastName.current.value;
        if (
            emailValue &&
            firstNameValue &&
            lastNameValue &&
            props.props.id &&
            props.props.id
        ) {
            axios
                .post("http://localhost:8080/application", {
                    advertisementid: props.props.id,
                    companyid: props.props.companyid,
                    email: emailValue,
                    firstname: firstNameValue,
                    lastname: lastNameValue,
                })
                .then((response) => {
                    toast.success(`You've applied to this advertisement`)
                    console.log(response);
                })
                .catch((error) => {
                    toast.error("Error while applying to this advertisement")
                    console.log(error);
                });
        }
    };

    return (
        <div className="ad-form-container">
            <input type="text" className="input" ref={email} placeholder="Type your email" />
            <input
                type="text"
                ref={firstName}
                className="input"
                placeholder="Type your firstname"
            />
            <input
                type="text"
                ref={lastName}
                className="input"
                placeholder="Type your lastname"
            />
            <button className="ad-primary-button" onClick={HandleApply}>Apply as Stranger</button>
        </div>
    );
}

export default ApplicationForm;
