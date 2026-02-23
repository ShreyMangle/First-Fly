import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Replace with real backend login API
    const fakeToken = "demo-jwt-token";
    login(fakeToken);

    navigate("/app");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          style={{ display: "block", marginBottom: "1rem", width: "100%" }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          style={{ display: "block", marginBottom: "1rem", width: "100%" }}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;