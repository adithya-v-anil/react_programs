import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api";

function ChangePassword() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await api.post("/change-password", {
        currentPassword,
        newPassword,
        confirmNewPassword: confirmPassword,
      });

      alert("Password changed successfully");
      navigate("/profile");
    } catch (err) {
      alert(err.response?.data || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-content">
          <div
            className="auth-card"
            style={{ maxWidth: "450px", flexDirection: "column" }}
          >
            {/* Back */}
            <button
              className="btn btn-link align-self-start mb-3"
              onClick={() => navigate("/profile")}
            >
              ← Back to Profile
            </button>

            <h4 className="mb-3 fw-bold">Change Password</h4>

            <form onSubmit={handleChangePassword} className="w-100">
              <input
                type="password"
                className="form-control mb-2"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />

              <input
                type="password"
                className="form-control mb-2"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <button
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Updating..." : "Change Password"}
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ChangePassword;

