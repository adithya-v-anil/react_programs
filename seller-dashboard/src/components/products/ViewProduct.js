import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ViewProduct() {
    const { id } = useParams();
    const products = useSelector((store) => store.products.list);

    const product = products.find((p) => p.id === id);

    if (!product) {
        return <h2 className="text-center mt-5">Product Not Found</h2>;
    }

    return (
        <div className="container mt-4">
            <h2>{product.name}</h2>

            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Price:</strong> {product.price}</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>
        </div>
    );
}

export default ViewProduct;
