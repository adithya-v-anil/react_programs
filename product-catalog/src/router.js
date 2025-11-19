import { createBrowserRouter } from "react-router-dom";

import ProductList from "./components/products/ProductList";
import AddProduct from "./components/products/AddProduct";
import EditProduct from "./components/products/EditProduct";

const router = createBrowserRouter([
  { path: "/", element: <ProductList /> },
  { path: "/products/add", element: <AddProduct /> },
  { path: "/products/edit/:id", element: <EditProduct /> },
]);

export default router;
