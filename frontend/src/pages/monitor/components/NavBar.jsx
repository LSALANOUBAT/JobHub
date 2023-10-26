import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
    return (
        <div className="navbar">
            <div className="nav-item">
                <Link to="/monitor/advertisement">Advertisement</Link>
            </div>
            <div className="nav-item">
                <Link to="/monitor/company">Company</Link>
            </div>
            <div className="nav-item">
                <Link to="/monitor/user">User</Link>
            </div>
            <div className="nav-item">
                <Link to="/monitor/application">Application</Link>
            </div>
        </div>
    );
};

export default NavBar;
