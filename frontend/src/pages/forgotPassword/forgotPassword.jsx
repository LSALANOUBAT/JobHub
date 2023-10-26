import "../../component/form/form.css";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'sonner';

function Login() {
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();

    const handleForgotPassword = () => {
        const emailValue = email.current.value;
        const passwordValue = password.current.value;
        const confirmPasswordValue = confirmPassword.current.value;

        if (emailValue && passwordValue && confirmPasswordValue && (passwordValue === confirmPasswordValue)) {
            axios
                .put("http://localhost:8080/user/resetPassword",
                    {
                        email: emailValue,
                        password: passwordValue
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
                <h1 className="title">Forgot password</h1>
                <div className="input-container">
                    <span className="input-label">E-mail adress</span>
                    <input className="input" type="text" ref={email} placeholder="Type your email adress" />
                </div>
                <div className="input-container">
                    <span className="input-label">Password</span>
                    <input className="input" type="password" ref={password} placeholder="Type your password" />
                </div>
                <div className="input-container">
                    <span className="input-label">Confir Password</span>
                    <input className="input" type="password" ref={confirmPassword} placeholder="Confirm your password" />
                </div>
                <button className="primary-button" onClick={handleForgotPassword}>Reset password</button>
                <Link className="link" to={"/login"}>login</Link>
            </div>
        </div>
    );
}

export default Login;
