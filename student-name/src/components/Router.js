import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Student from "../Student";

const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/student/:name", element: <Student /> }
]);

export default router;
