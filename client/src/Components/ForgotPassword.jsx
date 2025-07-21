import { useState } from "react";
import API from "../../api/api";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // Step 1: email, Step 2: OTP, Step 3: new password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const res = await API.post("/users/forgot-password", { email });
      setMessage(res.data.message || "OTP sent to your email.");
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const res = await API.post("/users/verify-otp", { email, otp });
      setMessage(res.data.message || "OTP verified successfully.");
      setStep(3);
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid OTP.");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const res = await API.post("/users/reset-password", {
        email,
        otp,
        password: newPassword,
      });
      setMessage(res.data.message || "Password updated successfully.");
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Forgot Password</h2>

      {step === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
          />
          <button type="submit" disabled={submitting} style={{ width: "100%", padding: "10px" }}>
            {submitting ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleOtpSubmit}>
          <input
            type="text"
            placeholder="Enter the OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
          />
          <button type="submit" disabled={submitting} style={{ width: "100%", padding: "10px" }}>
            {submitting ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handlePasswordSubmit}>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={8}
            style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
          />
          <button type="submit" disabled={submitting} style={{ width: "100%", padding: "10px" }}>
            {submitting ? "Saving..." : "Save New Password"}
          </button>
        </form>
      )}

      {message && <p style={{ marginTop: "15px", color: "green" }}>{message}</p>}

      {step !== 3 && (
        <p style={{ marginTop: "20px" }}>
          Remember your password?{" "}
          <Link to="/login" style={{ color: "blue", textDecoration: "underline" }}>
            Go back to login
          </Link>
        </p>
      )}
    </div>
  );
};

export default ForgotPassword;
