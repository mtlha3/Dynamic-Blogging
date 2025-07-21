import { useState } from "react";
import API from "../../api/api";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const res = await API.post("/users/forgot-password", { email });
      setMessage(res.data.message);
    } catch (err) {
      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />
        <button
          type="submit"
          disabled={submitting}
          style={{ width: "100%", padding: "10px" }}
        >
          {submitting ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      {message && <p style={{ marginTop: "15px", color: "green" }}>{message}</p>}

      <p style={{ marginTop: "20px" }}>
        Remember your password?{" "}
        <Link to="/login" style={{ color: "blue", textDecoration: "underline" }}>
          Go back to login
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
