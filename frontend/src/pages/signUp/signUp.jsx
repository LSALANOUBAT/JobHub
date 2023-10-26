import "../../component/form/form.css";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'sonner';

function SignUp() {
    const email = useRef();
    const password = useRef();
    const firstName = useRef();
    const lastName = useRef();

    const handleSignUp = () => {
        const emailValue = email.current.value;
        const passwordValue = password.current.value;
        const firstNameValue = firstName.current.value;
        const lastNameValue = lastName.current.value;

        if (emailValue && passwordValue && firstNameValue && lastNameValue) {
            axios
                .post("http://localhost:8080/user",
                    {
                        email: emailValue,
                        password: passwordValue,
                        firstname: firstNameValue,
                        lastname: lastNameValue
                    })
                .then((response) => {
                    if (response.status === 200) {
                        toast.success('You are now connected !');
                        setTimeout(() => {
                            window.location.href = "/login";
                        }, "1300");
                    }
                })
                .catch(err => {
                    toast.error(err.response.data);
                });
        }
    }

    return (
        <div className="page">
            <div className="container">
                <h1 className="title">Sign up</h1>
                <div className="input-container">
                    <span className="input-label">E-mail adress</span>
                    <input className="input" type="text" ref={email} placeholder="Type your email adress" />
                </div>
                <div className="input-container">
                    <span className="input-label">Firstname</span>
                    <input className="input" type="text" ref={firstName} placeholder="Type your firstname" />
                </div>
                <div className="input-container">
                    <span className="input-label">Lastname</span>
                    <input className="input" type="text" ref={lastName} placeholder="Type your lastname" />
                </div>
                <div className="input-container">
                    <span className="input-label">Password</span>
                    <input className="input" type="password" ref={password} placeholder="Type your password" />
                </div>
                <button className="primary-button" onClick={handleSignUp}>Sign Up</button>
                <Link className="link" to={"/login"}>Login</Link>
            </div>
        </div>
    );
}

export default SignUp;
