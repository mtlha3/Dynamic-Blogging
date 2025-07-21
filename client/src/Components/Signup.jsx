import { useState } from "react";
import { Link } from "react-router-dom"; // <-- Import Link
import API from "../../api/api";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    identifier: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/users/signup", formData);
      setMessage(response.data.message);
    } catch (error) {
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Signup failed");
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="text"
          name="identifier"
          placeholder="Email or Username"
          value={formData.identifier}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 8 chars)"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Register
        </button>
      </form>

      {message && <p style={{ marginTop: "15px" }}>{message}</p>}

      <p style={{ marginTop: "20px" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "blue", textDecoration: "underline" }}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
