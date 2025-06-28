import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div>
        {/* ✅ Navigation Bar */}
        <nav style={{ padding: "1rem", background: "#f0f0f0", display: "flex", gap: "1rem" }}>
          <Link to="/">Home</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        {/* ✅ Route Switcher */}
        <Routes>
          <Route path="/" element={<h1 style={{ padding: "1rem" }}>Welcome to WellnessHub</h1>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
