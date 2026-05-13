import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import api from "../api";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  /* ---------------- RESTORE PAGE ON BACK ---------------- */
  useEffect(() => {
    if (location.state?.restorePage) {
      setCurrentPage(location.state.restorePage);
    }
  }, [location.state]);

  /* ---------------- PAGINATION ---------------- */
  const totalPages = Math.ceil(recipes.length / ITEMS_PER_PAGE);

  const paginatedRecipes = recipes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    let isMounted = true;

    const loadInitialData = async () => {
      try {
        const [profileRes, myRes, allRes] = await Promise.all([
          api.get("/profile"),
          api.get("/recipes/my"),
          api.get("/recipes"),
        ]);

        if (!isMounted) return;

        setUser(profileRes.data);

        const myIds = new Set(myRes.data.map((r) => r.id));
        setRecipes(allRes.data.filter((r) => !myIds.has(r.id)));
      } catch (err) {
        console.error("Failed to load home data", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadInitialData();
    return () => (isMounted = false);
  }, []);

  /* ---------------- SEARCH ---------------- */
  useEffect(() => {
    if (loading) return;

    const searchRecipes = async () => {
      try {
        setCurrentPage(1); // ✅ reset page on search

        if (!search.trim()) {
          const [myRes, allRes] = await Promise.all([
            api.get("/recipes/my"),
            api.get("/recipes"),
          ]);

          const myIds = new Set(myRes.data.map((r) => r.id));
          setRecipes(allRes.data.filter((r) => !myIds.has(r.id)));
          return;
        }

        const [searchRes, myRes] = await Promise.all([
          api.get("/recipes/search", { params: { title: search } }),
          api.get("/recipes/my"),
        ]);

        const myIds = new Set(myRes.data.map((r) => r.id));
        setRecipes(searchRes.data.filter((r) => !myIds.has(r.id)));
      } catch (err) {
        console.error("Search failed", err);
      }
    };

    const delay = setTimeout(searchRecipes, 400);
    return () => clearTimeout(delay);
  }, [search, loading]);

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-5">Loading recipes...</div>
      </>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="page-container">
      <Navbar />

      {/* Mobile hamburger */}
      <button
        className="btn btn-outline-dark d-md-none m-2"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      <div className="app-body">
        <Sidebar isOpen={sidebarOpen} />

        <main className="main-content">
          <h2 className="fw-bold mb-3">
            Welcome{user?.fullname ? `, ${user.fullname}` : ""} 👋
          </h2>

          {/* Search */}
          <div className="input-group mb-4" style={{ maxWidth: "400px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search recipes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Recipes */}
          {paginatedRecipes.length === 0 ? (
            <p className="text-muted">No recipes found 🍽️</p>
          ) : (
            <div className="row g-4">
              {paginatedRecipes.map((recipe) => (
                <div className="col-md-4" key={recipe.id}>
                  <div
                    className="recipe-card"
                    onClick={() =>
                      navigate(`/recipe/${recipe.id}`, {
                        state: { fromPage: currentPage },
                      })
                    }
                  >
                    <img
                      src={recipe.image || "https://via.placeholder.com/400"}
                      alt={recipe.title}
                    />
                    <div className="overlay">
                      <h5 className="mb-1">{recipe.title}</h5>
                      <p className="mb-1">
                        👤 {recipe.user?.fullname || "Unknown"}
                      </p>
                      <small>👁 {recipe.views || 0} views</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
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

export default Home;
