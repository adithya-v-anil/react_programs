import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../../store/productSlice";
import { Link } from "react-router-dom";

function ProductList() {
    const user = useSelector((store) => store.auth.user);
    const products = useSelector((store) => store.products.list);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("https://worksheet-product.mashupstack.com/product", {
            headers: { Authorization: "Bearer " + user.token }
        })
        .then((response) => {
            dispatch(setProducts(response.data));
        })
        .catch(() => console.log("Error fetching products"));
    }, [user, dispatch]);

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
                        <th>View</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((p) => (
                        <tr key={p.id}>
                            <td>{p.name}</td>
                            <td>{p.description}</td>
                            <td>{p.price}</td>
                            <td>{p.quantity}</td>
                            <td>
                                <Link to={`/product/${p.id}`} className="btn btn-info">
                                    View
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
}

export default ProductList;
