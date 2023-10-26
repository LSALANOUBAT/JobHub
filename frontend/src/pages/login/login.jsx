import "../../component/form/form.css";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

function Login() {
    const email = useRef();
    const password = useRef();

    const handleLogin = () => {
        const emailValue = email.current.value;
        const passwordValue = password.current.value;
        if (emailValue && passwordValue) {
            axios
                .post(
                    "http://localhost:8080/user/signIn",
                    {
                        email: emailValue,
                        password: passwordValue,
                    },
                    {
                        withCredentials: true,
                    }
                )
                .then((response) => {
                    if (response.status === 200) {
                        toast.success("You are now connected !");
                        setTimeout(() => {
                            if (response.data.isadmin) {
                                window.location.href = "/monitor/advertisement";
                            } else {
                                window.location.href = "/";
                            }
                        }, 2000);
                    }
                })
                .catch((err) => {
                    toast.error(err.response.data);
                });
        }
    };

    return (
        <div className="page">
            <div className="container">
                <h1 className="title">Login</h1>
                <div className="input-container">
                    <span className="input-label">E-mail adress</span>
                    <input
                        className="input"
                        type="text"
                        ref={email}
                        placeholder="Type your email adress"
                    />
                </div>
                <div className="input-container">
                    <span className="input-label">Password</span>
                    <input
                        className="input"
                        type="password"
                        ref={password}
                        placeholder="Type your password"
                    />
                </div>
                <Link className="forgot-password link" to={"/forgot-password"}>
                    Forgot password ?
                </Link>
                <button className="primary-button" onClick={handleLogin}>
                    Login
                </button>
                <Link className="link" to={"/sign-up"}>
                    Sign up
                </Link>
            </div>
        </div>
    );
}

export default Login;
