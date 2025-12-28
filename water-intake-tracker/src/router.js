import { createBrowserRouter } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import WaterList from "./components/pages/WaterList";
import Home from "./components/pages/Home";

const router = createBrowserRouter([
  { path: "/", element: <Home /> }, 
{ path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/list", element: <WaterList /> },
]);

export default router;
