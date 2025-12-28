import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Navbar";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const logged = JSON.parse(localStorage.getItem("loggedUser"));
    if (logged) {
      navigate("/list");
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      alert("Invalid credentials!");
      return;
    }

    localStorage.setItem("loggedUser", JSON.stringify(user));
    navigate("/list");
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4 pt-4">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin} className="mx-auto" style={{ maxWidth: "400px" }}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="text-center mt-3">
          New user? <Link to="/register">Register</Link>
        </p>
      </div>
    </>
  );
}

export default Login;
