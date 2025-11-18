import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
  });

  useEffect(() => {
    axios.get(`https://worksheet-catalogue.mashupstack.com/products/${id}`)
      .then((response) => {
        setForm(response.data);
      });
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .put(`https://worksheet-catalogue.mashupstack.com/products/${id}`, form)
      .then(() => {
        navigate("/products");
      });
  }

  return (
    <div>
      <h2>Edit Product</h2>

      <form onSubmit={handleSubmit}>
        Name:
        <input name="name" value={form.name} onChange={handleChange} /> <br />

        Price:
        <input name="price" value={form.price} onChange={handleChange} /> <br />

        Category:
        <input name="category" value={form.category} onChange={handleChange} /> <br />

        Quantity:
        <input name="quantity" value={form.quantity} onChange={handleChange} /> <br />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditProduct;

