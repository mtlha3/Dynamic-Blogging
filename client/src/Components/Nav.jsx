import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/api"; 

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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


  const handleLogout = async () => {
    try {
      await API.post("/users/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 shadow">
      <h1 className="text-xl font-bold">
        <Link to="/">My Blog</Link>
      </h1>

      <div className="space-x-4">
        {!user ? (
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Post your First Blog
          </Link>
        ) : (
          <>
            <Link
              to="/add-blog"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Blog
            </Link>
            <Link
              to="/my-blogs"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              My Blogs
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
