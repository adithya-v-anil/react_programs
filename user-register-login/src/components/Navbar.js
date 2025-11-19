import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Register</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default Navbar;
