import { createBrowserRouter } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

const router = createBrowserRouter([
  { path: "/", element: <Register />, },
  { path: "/login", element: <Login />, },
]);

export default router;
