import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{
      backgroundColor: "#1E40AF",
      padding: "15px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "25px"
    }}>
      <Link to="/" style={{ color: "white", fontWeight: "bold", fontSize: "16px", textDecoration: "none" }}>Home</Link>
      <Link to="/login" style={{ color: "white", fontWeight: "bold", fontSize: "16px", textDecoration: "none" }}>Login</Link>
      <Link to="/signup" style={{ color: "white", fontWeight: "bold", fontSize: "16px", textDecoration: "none" }}>Signup</Link>
      <Link to="/dashboard" style={{ color: "white", fontWeight: "bold", fontSize: "16px", textDecoration: "none" }}>Dashboard</Link>
    </nav>
  );
};

export default Navbar;
