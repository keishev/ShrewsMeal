import React from "react";

import Logout from "../components/Logout";
import TenantNavBar from "../components/TenantNavBar";

import './TenantProfile.css';

const TenantProfile = () => {
    return (
        <div className="main-container">
            <div className="tenant-profile-container">
                <Logout/>
            </div>
            <TenantNavBar/>
        </div>
    )
}

export default TenantProfile;