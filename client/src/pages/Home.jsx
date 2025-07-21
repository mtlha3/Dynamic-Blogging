import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/api";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const [showCommentBox, setShowCommentBox] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState({});

  // Get current user
  useEffect(() => {
  const fetchUser = async () => {
    API.get("/users/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        if (err.response?.status !== 401) {
          console.error("Error fetching user:", err);
        }
        setUser(null);
      });
  };

  fetchUser();
}, []);



  // Get all blogs
  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const res = await API.get("/blogs/all");
        setBlogs(res.data.blogs);
      } catch (err) {
        setMessage("Failed to fetch blogs.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllBlogs();
  }, []);

  const fetchComments = async (blogId) => {
    try {
      const res = await API.get(`/comments/${blogId}`);
      setComments((prev) => ({
        ...prev,
        [blogId]: res.data.comments,
      }));
    } catch (err) {
      console.error("Failed to load comments for blog:", blogId);
    }
  };

  const handleSendComment = async (blogId) => {
    if (!commentText.trim()) return;
    try {
      await API.post(
        "/comments/add",
        { commentText, blogId },
        { withCredentials: true }
      );
      setCommentText("");
      fetchComments(blogId);
    } catch (err) {
      alert("Failed to send comment.");
    }
  };

  const toggleCommentBox = (blogId) => {
    const isOpen = showCommentBox === blogId;
    setShowCommentBox(isOpen ? null : blogId);
    if (!isOpen) fetchComments(blogId);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Welcome to Home Page</h1>
      <h2 style={{ marginTop: "30px" }}>All Blogs</h2>

      {loading ? (
        <p>Loading blogs...</p>
      ) : message ? (
        <p>{message}</p>
      ) : blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog.blogId}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "25px",
            }}
          >
            <h3>{blog.title}</h3>
            <p>{blog.description}</p>
            <small>
              Posted by: {blog.userName} on{" "}
              {new Date(blog.date).toLocaleDateString()}
            </small>

            <div style={{ marginTop: "10px" }}>
              {user ? (
                <>
                  <button
                    style={{ padding: "6px 12px", marginTop: "10px" }}
                    onClick={() => toggleCommentBox(blog.blogId)}
                  >
                    {showCommentBox === blog.blogId
                      ? "Hide Comments"
                      : "Add/View Comments"}
                  </button>

                  {showCommentBox === blog.blogId && (
                    <div
                      style={{
                        marginTop: "10px",
                        borderTop: "1px solid #ccc",
                        paddingTop: "10px",
                      }}
                    >
                      <textarea
                        rows={3}
                        placeholder="Write your comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px",
                          marginBottom: "8px",
                        }}
                      />
                      <button
                        onClick={() => handleSendComment(blog.blogId)}
                        style={{
                          padding: "6px 12px",
                          backgroundColor: "#4caf50",
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                          marginBottom: "10px",
                        }}
                      >
                        Send
                      </button>

                      {/* Comments Section */}
                      {comments[blog.blogId]?.length > 0 ? (
                        comments[blog.blogId].map((c, idx) => {
                          const isMyComment = c.userId === user?.userId;
                          return (
                            <div
                              key={idx}
                              style={{
                                display: "flex",
                                justifyContent: isMyComment
                                  ? "flex-end"
                                  : "flex-start",
                                marginBottom: "10px",
                              }}
                            >
                              <div
                                style={{
                                  maxWidth: "70%",
                                  background: isMyComment
                                    ? "#d1e7dd"
                                    : "#f8d7da",
                                  padding: "10px",
                                  borderRadius: "8px",
                                }}
                              >
                                <strong>{c.userName}</strong>
                                <p style={{ margin: "5px 0" }}>
                                  {c.commentText}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p>No comments yet.</p>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <Link to="/login">
                  <button
                    style={{
                      padding: "6px 12px",
                      marginTop: "10px",
                      background: "#f0f0f0",
                    }}
                  >
                    Login to share your views on this blog
                  </button>
                </Link>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
