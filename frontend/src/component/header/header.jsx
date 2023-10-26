import "./header.css";
import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import image from "../../assets/icon.svg";

function Header() {
    const [cookies, removeCookie] = useCookies(["jwt"]);
    const jwtToken =
        cookies.jwt !== "undefined" && cookies.jwt !== undefined
            ? jwtDecode(cookies.jwt)
            : undefined;

    return (
        <div className="header">
            <span className="primary">
                <Link className="header-link" to={"/"}>
                    <img className="icon-image" alt="JobHub logo" src={image} />
                </Link>
            </span>
            <div className="link-container">
                {!jwtToken ? (
                    <>
                        <Link className="header-link" to={"/login"}>
                            Login
                        </Link>
                        <Link className="header-link" to={"/sign-up"}>
                            Sign up
                        </Link>
                    </>
                ) : (
                    <span
                        className="header-link"
                        onClick={() => removeCookie("jwt")}
                    >
                        Log out
                    </span>
                )}
                {jwtToken && jwtToken.isadmin === true && (
                    <Link className="header-link" to={"/monitor/advertisement"}>
                        Admin page
                    </Link>
                )}
            </div>
            <div className="login-container">
                <span
                    className="circle"
                    style={
                        jwtToken
                            ? { backgroundColor: "green" }
                            : { backgroundColor: "red" }
                    }
                ></span>
                {jwtToken ? (
                    <span>Your are log in</span>
                ) : (
                    <span>Your aren't log in</span>
                )}
            </div>
        </div>
    );
}

export default Header;
