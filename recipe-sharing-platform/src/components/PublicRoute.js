import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  // ✅ If already logged in → go to home
  if (token) {
    return <Navigate to="/home" replace />;
  }

  // ❌ Not logged in → allow access
  return children;
}

export default PublicRoute;
