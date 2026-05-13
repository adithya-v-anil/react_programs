import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import api from "../api";

function MyRecipes() {
  const navigate = useNavigate();
  const location = useLocation();

  const [recipes, setRecipes] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const ITEMS_PER_PAGE = 3;

  // ✅ RESTORE PAGE FROM NAVIGATION STATE
  const [currentPage, setCurrentPage] = useState(
    location.state?.fromPage || 1
  );

  const totalPages = Math.ceil(recipes.length / ITEMS_PER_PAGE);

  const paginatedRecipes = recipes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const res = await api.get("/recipes/my");
        setRecipes(res.data);
      } catch {
        alert("Failed to load your recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchMyRecipes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this recipe?")) return;

    try {
      await api.delete(`/recipes/${id}`);

      setRecipes((prev) => {
        const updated = prev.filter((r) => r.id !== id);

        const newTotalPages = Math.ceil(updated.length / ITEMS_PER_PAGE);
        if (currentPage > newTotalPages) {
          setCurrentPage(Math.max(newTotalPages, 1));
        }

        return updated;
      });
    } catch (err) {
      alert(err.response?.data || "Delete failed");
    }
  };

  return (
    <div className="page-container">
      <Navbar />

      <button
        className="btn btn-outline-dark d-md-none m-2"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      <div className="app-body">
        <Sidebar isOpen={sidebarOpen} />

        <main className="main-content p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold m-0">My Recipes</h3>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/add-recipe")}
            >
              + Add Recipe
            </button>
          </div>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : paginatedRecipes.length === 0 ? (
            <p className="text-muted text-center">
              You haven’t added any recipes yet 🍳
            </p>
          ) : (
            <div className="row g-4">
              {paginatedRecipes.map((recipe) => (
                <div className="col-md-4" key={recipe.id}>
                  <div
                    className="recipe-card"
                    onClick={() =>
                      navigate(`/recipe/${recipe.id}`, {
                        state: { fromPage: currentPage }
                      })
                    }
                  >
                    <img
                      src={recipe.image || "https://via.placeholder.com/400"}
                      alt={recipe.title}
                    />

                    <div className="overlay">
                      <h5 className="mb-1">{recipe.title}</h5>
                      <p className="mb-2">👁 {recipe.views} views</p>

                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-light"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/edit-recipe/${recipe.id}`);
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(recipe.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default MyRecipes;


