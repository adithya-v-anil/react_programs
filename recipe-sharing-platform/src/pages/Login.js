import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      // ✅ Store ONLY token
      localStorage.setItem("token", res.data.token);

      alert("Login successful");
      navigate("/home");
    } catch (err) {
      alert(err.response?.data || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-content">
          <div className="auth-card">

            {/* Image */}
            <div className="image-box">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                alt="Recipe"
                className="img-circle"
              />
            </div>

            {/* Form */}
            <div className="form-box">
              <h3 className="mb-3">Login</h3>
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  className="btn btn-success w-100 mt-2"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
                <p className="text-center mt-2 mb-0">
                  New user? <Link to="/register">Register</Link>
                </p>
              </form>
            </div>

          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Login;




