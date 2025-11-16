import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Home";
import About from "../About";
import Contact from "../Contact";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/about", element: <About /> },
            { path: "/contact", element: <Contact /> }
        ]
    }
]);

export default router;
