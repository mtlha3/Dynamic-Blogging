import { useEffect, useState } from "react";
import API from "../../api/api";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [editingBlogId, setEditingBlogId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    date: ""
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs/my", { withCredentials: true });
      setBlogs(res.data.blogs);
    } catch (err) {
      setMessage("Failed to load your blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blogId) => {
  if (!window.confirm("Are you sure you want to delete this blog?")) return;

  try {
    await API.delete(`/blogs/delete/${blogId}`, { withCredentials: true });
    fetchBlogs(); 
  } catch (err) {
    alert("Failed to delete blog.");
  }
};


  const handleEdit = (blog) => {
    setEditingBlogId(blog.blogId);
    setEditData({
      title: blog.title,
      description: blog.description,
      date: blog.date.slice(0, 10)
    });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/blogs/edit/${editingBlogId}`, editData, {
        withCredentials: true
      });

      setEditingBlogId(null);
      setMessage("Blog updated successfully");
      window.location.reload(); 
    } catch (err) {
      alert("Failed to update blog.");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2>My Blogs</h2>
      {loading ? (
        <p>Loading...</p>
      ) : message ? (
        <p>{message}</p>
      ) : blogs.length === 0 ? (
        <p>No blogs posted yet.</p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog.blogId}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px"
            }}
          >
            {editingBlogId === blog.blogId ? (
              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  name="title"
                  value={editData.title}
                  onChange={handleEditChange}
                  required
                  style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
                />
                <textarea
                  name="description"
                  value={editData.description}
                  onChange={handleEditChange}
                  required
                  rows={4}
                  style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
                />
                <input
                  type="date"
                  name="date"
                  value={editData.date}
                  onChange={handleEditChange}
                  required
                  style={{ padding: "8px", marginBottom: "8px" }}
                />
                <button type="submit" style={{ marginRight: "10px" }}>
                  Save
                </button>
                <button type="button" onClick={() => setEditingBlogId(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
                <small>
                  Posted on: {new Date(blog.date).toLocaleDateString()}
                </small>
                <div style={{ marginTop: "10px" }}>
                  <button
                    onClick={() => handleEdit(blog)}
                    style={{ marginRight: "10px", padding: "6px 12px" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.blogId)}
                    style={{
                      padding: "6px 12px",
                      background: "red",
                      color: "white"
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyBlogs;
