import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import API from "../../api/api";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const response = await API.post("/users/login", formData, {
        withCredentials: true
      });

      setMessage(response.data.message);
      navigate("/");
      window.location.reload(); // Optional: reload to reflect auth state
    } catch (error) {
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Login failed");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "5px" }}
        />

        <div style={{ textAlign: "right", marginBottom: "15px" }}>
          <Link to="/forgot-password" style={{ fontSize: "0.9em", color: "blue" }}>
            Forgot password?
          </Link>
        </div>

        <button type="submit" disabled={submitting} style={{ width: "100%", padding: "10px" }}>
          {submitting ? "Logging in..." : "Login"}
        </button>
      </form>

      {message && <p style={{ marginTop: "15px", color: "red" }}>{message}</p>}

      <p style={{ marginTop: "20px" }}>
        Don&apos;t have an account?{" "}
        <Link to="/signup" style={{ color: "blue", textDecoration: "underline" }}>
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
