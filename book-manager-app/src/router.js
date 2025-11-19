import { createBrowserRouter } from "react-router-dom";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";

const router = createBrowserRouter([
    { path: "", element: <BookList /> },
    { path: "add", element: <AddBook /> },
    { path: "edit/:id", element: <EditBook /> }
]);

export default router;
