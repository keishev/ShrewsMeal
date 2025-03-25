import React from "react";
import { Link } from "react-router-dom";
import { Home, CalendarCheck, User } from "lucide-react";
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-item">
        <Home size={24} />
        <span className="nav-label">Home</span>
      </Link>
      <Link to="/booking" className="nav-item">
        <CalendarCheck size={24} />
        <span className="nav-label">Make Booking</span>
      </Link>
      <Link to="/tenant-profile" className="nav-item">
        <User size={24} />
        <span className="nav-label">Profile</span>
      </Link>
    </nav>
  );
}
