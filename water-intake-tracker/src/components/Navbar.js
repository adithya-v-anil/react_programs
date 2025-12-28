import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const logged = JSON.parse(localStorage.getItem("loggedUser"));

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">

        <Link className="navbar-brand" to={logged ? "/list" : "/"}>
          Water Intake Tracker
        </Link>

        <div className="ms-auto">
          {!logged ? (
            <>
              <Link className="btn btn-outline-light me-2" to="/register">
                Register
              </Link>
              <Link className="btn btn-outline-light" to="/login">
                Login
              </Link>
            </>
          ) : (
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;


