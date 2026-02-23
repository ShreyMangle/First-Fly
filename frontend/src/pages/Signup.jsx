import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
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

    // TODO: Connect to backend register endpoint
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1>Create Account</h1>

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

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;