import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    function submitRegister() {
        axios.post("https://worksheet-product.mashupstack.com/register", {
            user_name: userName,
            email: email,
            password: password
        })
        .then(() => {
            alert("Registration Successful");
            navigate("/login");
        })
        .catch((error) => {
            if (error.response?.data?.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Registration failed");
            }
        })
    }

    return (
        <div className="container mt-4">
            <h2>Register</h2>

            {message && <div className="alert alert-danger">{message}</div>}

            <div className="form-group">
                <label>User Name</label>
                <input className="form-control" type="text" value={userName}
                 onChange={(e) => setUserName(e.target.value)} />
            </div>

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

            <button className="btn btn-primary mt-3" onClick={submitRegister}>
                Register
            </button>
        </div>
    );
}

export default Register;
