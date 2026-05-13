import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!form.agree) {
      alert("Please accept terms and conditions");
      return;
    }

    try {
      await api.post("/register", {
        fullname: form.fullname,
        email: form.email,
        password: form.password,
      });

      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data || "Registration failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-content">
          <div className="auth-card">

            <div className="image-box">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                alt="Recipe"
                className="img-circle"
              />
            </div>

            <div className="form-box">
              <h3 className="mb-3">Register</h3>

              <form onSubmit={handleRegister}>
                <input
                  className="form-control"
                  name="fullname"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />

                <input
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />

                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />

                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />

                <div className="form-check mt-2 mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="agree"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    I agree to the Terms & Conditions
                  </label>
                </div>

                <button className="btn btn-primary w-100 mt-2">
                  Register
                </button>

                <p className="text-center mt-2 mb-0">
                  Already have an account?{" "}
                  <Link to="/login">Login</Link>
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

export default Register;



