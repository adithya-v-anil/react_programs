import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ChangePassword from "./pages/ChangePassword";
import MyRecipes from "./pages/MyRecipes";
import AddRecipe from "./pages/AddRecipe";
import RecipeDetail from "./pages/RecipeDetail";
import EditRecipe from "./pages/EditRecipe";

const router = createBrowserRouter([

   /* 🔓 PUBLIC BUT BLOCKED WHEN LOGGED IN */
  {
    path: "/",
    element: (
      <PublicRoute>
        <Landing />
      </PublicRoute>
    )
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    )
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    )
  },

  /* 🔒 PROTECTED ROUTES */
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    )
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    )
  },
  {
    path: "/change-password",
    element: (
      <ProtectedRoute>
        <ChangePassword />
      </ProtectedRoute>
    )
  },
  {
    path: "/my-recipes",
    element: (
      <ProtectedRoute>
        <MyRecipes />
      </ProtectedRoute>
    )
  },
  {
    path: "/add-recipe",
    element: (
      <ProtectedRoute>
        <AddRecipe />
      </ProtectedRoute>
    )
  },
  {
    path: "/recipe/:id",
    element: (
      <ProtectedRoute>
        <RecipeDetail />
      </ProtectedRoute>
    )
  },
  {
    path: "/edit-recipe/:id",
    element: (
      <ProtectedRoute>
        <EditRecipe />
      </ProtectedRoute>
    )
  }
]);

export default router;
