import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

const AddBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/blogs/add", formData, {
        withCredentials: true
      });

      setMessage("Blog added successfully!");
      navigate("/my-blogs");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to add blog";
      setMessage(errorMsg);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <textarea
          name="description"
          placeholder="Blog Description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={5}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Submit Blog
        </button>
      </form>

      {message && <p style={{ marginTop: "15px", color: "green" }}>{message}</p>}
    </div>
  );
};

export default AddBlog;
