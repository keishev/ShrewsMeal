import React from "react";
import { useNavigate } from "react-router-dom";

import { userLogout } from "../api/logout";

import './Logout.css'

const Logout = () => {
    const navigate = useNavigate ();

    const handleLogout = async (e) => {
        e.preventDefault ();

        try {
            const res = await userLogout ();
            if (res.Status === "Success") {
                navigate ('/');
            }

        } catch (error) {
            console.error ("Logout failed");
        }
    };

    return (
        <div className="logout-container">
            <button className="logout-btn" onClick={handleLogout}>LOG OUT</button>
        </div>
    )
}

export default Logout;