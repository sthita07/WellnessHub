import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-primary text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Brand Name */}
        <h1 className="text-2xl font-bold">WellnessHub</h1>

        {/* Links */}
        <div className="flex space-x-6 items-center">
          <Link to="/" className="hover:text-accent transition">
            Home
          </Link>
          <Link to="/signup" className="hover:text-accent transition">
            Signup
          </Link>
          <Link to="/login" className="hover:text-accent transition">
            Login
          </Link>
          <Link to="/journal" className="hover:text-accent transition">
            Journal
          </Link>
          <Link to="/dashboard" className="hover:text-accent transition">
            Dashboard
          </Link>

          {/* Logout Button (visible only if logged in) */}
          {token && (
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
