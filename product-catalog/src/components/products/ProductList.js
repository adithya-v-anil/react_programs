import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  function loadProducts() {
    axios.get("https://worksheet-catalogue.mashupstack.com/products")
      .then((response) => {
        setProducts(response.data);
      });
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function deleteProduct(id) {
    axios.delete(`https://worksheet-catalogue.mashupstack.com/products/${id}`)
      .then(() => {
        loadProducts();
      });
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Product Catalog</h2>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Link to="/products/add">
        <button>Add Product</button>
      </Link>

      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> — ₹{product.price} <br />
            Category: {product.category} | Qty: {product.quantity}
            <br />

            <Link to={`/products/edit/${product.id}`}>
              <button>Edit</button>
            </Link>

            <button onClick={() => deleteProduct(product.id)}> Delete</button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
