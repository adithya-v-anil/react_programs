import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api";

function AddRecipe() {
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
    steps: "",
    cookingTime: "",
    difficulty: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = () => {
    if (!imageFile) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setRecipe((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(imageFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imagePreview) {
      alert("Please upload an image");
      return;
    }

    setLoading(true);

    try {
      await api.post("/recipes", recipe);
      alert("Recipe added successfully");
      navigate("/my-recipes");
    } catch (err) {
      alert(err.response?.data || "Failed to add recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-content">
          <div
            className="auth-card"
            style={{ maxWidth: "600px", flexDirection: "column" }}
          >
            <button
              className="btn btn-link align-self-start mb-2"
              onClick={() => navigate("/my-recipes")}
            >
              ← Back to My Recipes
            </button>

            <h4 className="fw-bold mb-3">Add Recipe</h4>

            <form onSubmit={handleSubmit} className="w-100">
              <input
                type="text"
                name="title"
                className="form-control mb-2"
                placeholder="Recipe Title"
                value={recipe.title}
                onChange={handleChange}
                required
              />

              <textarea
                name="ingredients"
                className="form-control mb-2"
                placeholder="Ingredients"
                rows="3"
                value={recipe.ingredients}
                onChange={handleChange}
                required
              />

              <textarea
                name="steps"
                className="form-control mb-2"
                placeholder="Steps"
                rows="4"
                value={recipe.steps}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="cookingTime"
                className="form-control mb-2"
                placeholder="Cooking Time (e.g., 45 mins)"
                value={recipe.cookingTime}
                onChange={handleChange}
                required
              />

              {/* Difficulty */}
              <div className="position-relative mb-3">
                <select
                  name="difficulty"
                  className="form-control select-with-arrow"
                  value={recipe.difficulty}
                  onChange={handleChange}
                  required
                >
                  <option value="">Difficulty Level</option>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
                <span className="select-arrow">▾</span>
              </div>

              {/* Image upload */}
              <input
                type="file"
                className="form-control mb-2"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />

              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-dark btn-sm mb-3"
                  onClick={handleImageUpload}
                  disabled={!imageFile}
                >
                  ⬆ Upload Image
                </button>
              </div>

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="preview"
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "15px",
                  }}
                />
              )}

              <button
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Recipe"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddRecipe;

