import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const user = useSelector((store) => store.auth.user);

    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
}

export default ProtectedRoute;
