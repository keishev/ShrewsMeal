import React from "react";
import { Link } from "react-router-dom";
import { Home, UserPlus, Settings } from "lucide-react";
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/register" className="nav-item">
        <UserPlus size={24} />
        <span className="nav-label">Add Account</span>
      </Link>
      <Link to="/dashboard" className="nav-item">
        <Home size={24} />
        <span className="nav-label">Dashboard</span>
      </Link>
      <Link to="/cook-settings" className="nav-item">
        <Settings size={24} />
        <span className="nav-label">Settings</span>
      </Link>
    </nav>
  );
}
