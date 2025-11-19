import { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const data = { email, password };

    axios.post("https://worksheet-auth.mashupstack.com/login", data)
      .then((response) => {
        console.log("Token:", response.data.token);
        alert("Successfully Logged In");
      })
      .catch((error) => {
        alert(error.response?.data?.message || "Login failed");
      });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
