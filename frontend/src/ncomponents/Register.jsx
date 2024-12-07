import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/register", { email, password });
      setMessage(response.data.message);
      if (response.data.message === "Registration successful!") {
        history.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
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
        <button type="submit" className="btn btn-dark">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
