import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ProductList() {
    const user = useSelector((store) => store.auth.user);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("https://worksheet-product.mashupstack.com/product", {
            headers: {
                Authorization: "Bearer " + user.token
            }
        })
        .then((response) => setProducts(response.data))
        .catch(() => console.log("Error fetching products"));
    }, [user]);

    return (
        <div className="container mt-4">
            <h2>Product List</h2>

            <table className="table table-bordered table-striped mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((p) => (
                        <tr key={p.id}>
                            <td>{p.name}</td>
                            <td>{p.description}</td>
                            <td>${p.price}</td>
                            <td>{p.quantity}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
}

export default ProductList;
