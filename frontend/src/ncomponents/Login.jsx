import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login", { email, password });
      setMessage(response.data.message);
      if (response.data.message === "Login successful!") {
        history.push("/secrets");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-dark">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
