import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


function Landing() {
  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content">
        <div className="landing-card" style={{ flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          
          {/* Description */}
          <h2 className="fw-bold mb-3">Share Your Recipes 🍳</h2>
          <p>Discover, share, and explore delicious homemade recipes from food lovers around the world. Join our community today and make cooking fun and social!</p>
          
          {/* Image */}
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" 
            alt="Recipe" 
            style={{ width: "180px", height: "180px", borderRadius: "50%", margin: "20px 0", objectFit: "cover", boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }}
          />

          {/* Register Button */}
          <Link to="/register" className="btn btn-primary px-4 py-2">Register Now</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;



