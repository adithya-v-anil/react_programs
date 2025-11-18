import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios.post("https://worksheet-catalogue.mashupstack.com/products", form)
      .then(() => {
        navigate("/products");
      });
  }

  return (
    <div>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        Name:
        <input name="name" value={form.name} onChange={handleChange} /> <br />

        Price:
        <input name="price" value={form.price} onChange={handleChange} /> <br />

        Category:
        <input name="category" value={form.category} onChange={handleChange} /> <br />

        Quantity:
        <input name="quantity" value={form.quantity} onChange={handleChange} /> <br />

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddProduct;

