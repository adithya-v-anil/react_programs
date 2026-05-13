import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api";

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ prevents double view increment
  const viewCountedRef = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recipeRes, profileRes] = await Promise.all([
          api.get(`/recipes/${id}`),
          api.get("/profile"),
        ]);

        setRecipe(recipeRes.data);
        setUser(profileRes.data);

        // 👁️ increment view ONLY ONCE
        if (!viewCountedRef.current) {
          viewCountedRef.current = true;
          await api.put(`/recipes/${id}/view`);
        }
      } catch {
        alert("Failed to load recipe");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  /* ---------------- DELETE ---------------- */
  const handleDelete = async () => {
    if (!window.confirm("Delete this recipe?")) return;

    try {
      await api.delete(`/recipes/${id}`);
      alert("Recipe deleted");
      navigate(-1);
    } catch (err) {
      alert(err.response?.data || "Delete failed");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-5">Loading recipe...</div>
      </>
    );
  }

  if (!recipe) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-5 text-muted">
          Recipe not found
        </div>
      </>
    );
  }

  const isOwner = recipe.user?.id === user?.id;

  return (
    <>
      <Navbar />

      <div className="page-container">
        <div className="page-content">
          <div
            className="auth-card"
            style={{ maxWidth: "800px", flexDirection: "column" }}
          >
            {/* 🔙 BACK */}
            <button
              className="btn btn-link align-self-start mb-3"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>

            <img
              src={recipe.image || "https://via.placeholder.com/800x300"}
              alt={recipe.title}
              style={{
                width: "100%",
                maxHeight: "300px",
                objectFit: "cover",
                borderRadius: "20px",
              }}
              className="mb-3"
            />

            <h3 className="fw-bold">{recipe.title}</h3>

            <p>
              <strong>Created by:</strong>{" "}
              {recipe.user?.fullname || "Unknown"}
            </p>

            <p className="text-muted mb-3">
              👁️ {recipe.views} views
            </p>

            <div className="w-100 mb-3">
              <h5>Ingredients</h5>
              <p>{recipe.ingredients}</p>
            </div>

            <div className="w-100 mb-3">
              <h5>Steps</h5>
              <p>{recipe.steps}</p>
            </div>

            {isOwner && (
              <div className="d-flex gap-2 w-100">
                <button
                  className="btn btn-outline-primary w-50"
                  onClick={() => navigate(`/edit-recipe/${recipe.id}`)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-outline-danger w-50"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default RecipeDetail;



