import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function attemptLogin() {
        axios.post("https://worksheet-product.mashupstack.com/login", {
            email: email,
            password: password
        })
        .then((response) => {
            const userData = {
                email: email,
                token: response.data.token
            };

            dispatch(setUser(userData));
            alert("Successfully Logged In");
            navigate("/products");
        })
        .catch((error) => {
            if (error.response?.data?.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Login failed");
            }
        });
    }

    return (
        <div className="container mt-4">
            <h2>Login</h2>

            {message && <div className="alert alert-danger">{message}</div>}

            <div className="form-group">
                <label>Email</label>
                <input className="form-control" type="text" value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input className="form-control" type="password" value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button className="btn btn-primary mt-3" onClick={attemptLogin}>
                Login
            </button>
        </div>
    );
}

export default Login;
