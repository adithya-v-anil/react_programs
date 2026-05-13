import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Navbar() {
  const navigate = useNavigate();
  const path = window.location.pathname;

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {
      // even if logout API fails, clear token
      console.error("Logout error", err);
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div
        className="d-flex w-100 align-items-center"
        style={{ justifyContent: "space-between", padding: "0 15px" }}
      >
        {/* Title */}
        <Link className="navbar-brand fw-bold" to="/">
          RecipeShare
        </Link>

        {/* Right side */}
        {!isLoggedIn && path === "/" && (
          <div className="d-flex gap-1">
            <Link to="/register" className="btn btn-warning">
              Register
            </Link>
            <Link to="/login" className="btn btn-outline-light">
              Login
            </Link>
          </div>
        )}

        {isLoggedIn && (
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
