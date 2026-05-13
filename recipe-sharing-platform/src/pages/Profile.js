import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        if (!isMounted) return;
        setUser(res.data);
      } catch (err) {
        console.error("Profile load failed", err);

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  /* ✅ LOADING STATE */
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-5">Loading profile...</div>
      </>
    );
  }

  /* ✅ ERROR / FALLBACK STATE (CRITICAL FIX) */
  if (!user) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-5 text-danger">
          Failed to load profile. Please refresh or login again.
        </div>
      </>
    );
  }

  /* ✅ NORMAL RENDER */
  return (
    <div className="page-container profile-bg">
      <Navbar />

      {/* Mobile hamburger */}
      <button
        className="btn btn-outline-dark d-md-none m-2"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      <div className="app-body">
        <Sidebar />

        <main className="main-content">
          <h3 className="fw-bold mb-4">My Profile</h3>

          {/* Avatar + info */}
          <div className="d-flex align-items-center gap-3 mb-4">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.fullname
              )}`}
              className="profile-avatar-small"
              alt="avatar"
            />

            <div>
              <h6 className="mb-1">{user.fullname}</h6>
              <p className="text-muted mb-0">{user.email}</p>
            </div>
          </div>

          {/* Actions */}
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => navigate("/my-recipes")}
          >
            My Recipes
          </button>

          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/change-password")}
          >
            Change Password
          </button>

          {/* Logout */}
          <div className="profile-logout mt-5">
            <button
              className="btn btn-danger btn-sm px-4"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
