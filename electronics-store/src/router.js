import { createBrowserRouter } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ProductList from "./components/products/ProductList";
import ProtectedRoute from "./protected/ProtectedRoute";

const router = createBrowserRouter([
    { path: "/", element: <Register /> },
    { path: "/login", element: <Login /> },

    { 
        path: "/products",
        element: (
            <ProtectedRoute>
                <ProductList />
            </ProtectedRoute>
        )
    }
]);

export default router;
