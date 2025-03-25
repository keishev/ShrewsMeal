import React from "react";

import Logout from "../components/Logout";
import CookNavBar from "../components/CookNavBar";

import './CookSettings.css';

const CookSettings = () => {
    return (
        <div className="main-container">
            <div className="cook-settings-container">
                <Logout/>
            </div>
            <CookNavBar/>
        </div>
    )
}

export default CookSettings;