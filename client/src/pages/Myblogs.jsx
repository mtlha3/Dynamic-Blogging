// "use client"

// import { useEffect, useState } from "react"
// import {
//   Loader2,
//   Edit3,
//   Trash2,
//   Calendar,
//   FileText,
//   Save,
//   X,
//   Plus,
//   BookOpen,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react"
// import API from "../../api/api"

// const MyBlogs = () => {
//   const [blogs, setBlogs] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [message, setMessage] = useState("")
//   const [editingBlogId, setEditingBlogId] = useState(null)
//   const [editData, setEditData] = useState({
//     title: "",
//     description: "",
//     date: "",
//   })
//   const [updating, setUpdating] = useState(false)
//   const [expandedBlogs, setExpandedBlogs] = useState({})

//   useEffect(() => {
//     fetchBlogs()
//   }, [])

//   const fetchBlogs = async () => {
//     try {
//       const res = await API.get("/blogs/my", { withCredentials: true })
//       setBlogs(res.data.blogs)
//     } catch (err) {
//       setMessage("Failed to load your blogs")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleDelete = async (blogId) => {
//     if (!window.confirm("Are you sure you want to delete this blog?")) return
//     try {
//       await API.delete(`/blogs/delete/${blogId}`, { withCredentials: true })
//       fetchBlogs()
//     } catch (err) {
//       alert("Failed to delete blog.")
//     }
//   }

//   const handleEdit = (blog) => {
//     setEditingBlogId(blog.blogId)
//     setEditData({
//       title: blog.title,
//       description: blog.description,
//       date: blog.date.slice(0, 10),
//     })
//   }

//   const handleEditChange = (e) => {
//     setEditData({ ...editData, [e.target.name]: e.target.value })
//   }

//   const handleUpdate = async (e) => {
//     e.preventDefault()
//     setUpdating(true)
//     try {
//       await API.put(`/blogs/edit/${editingBlogId}`, editData, {
//         withCredentials: true,
//       })
//       setEditingBlogId(null)
//       setMessage("Blog updated successfully")
//       window.location.reload()
//     } catch (err) {
//       alert("Failed to update blog.")
//     } finally {
//       setUpdating(false)
//     }
//   }

//   const toggleBlogExpansion = (blogId) => {
//     setExpandedBlogs((prev) => ({
//       ...prev,
//       [blogId]: !prev[blogId],
//     }))
//   }

//   const truncateText = (text, maxLength = 200) => {
//     if (text.length <= maxLength) return text
//     return text.substring(0, maxLength) + "..."
//   }

//   const needsTruncation = (text, maxLength = 200) => {
//     return text.length > maxLength
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 relative overflow-hidden">
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/10 to-violet-600/10 rounded-full blur-3xl"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"></div>
//       </div>

//       <div className="relative z-10 max-w-4xl mx-auto p-6">
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
//             <BookOpen className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
//             My Blogs
//           </h1>
//           <p className="text-gray-600 text-lg font-medium">Manage and edit your published content</p>
//         </div>

//         <div className="mb-8 text-center">
//           <a
//             href="/add-blog"
//             className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//           >
//             <Plus className="w-5 h-5" />
//             <span>Create New Blog</span>
//           </a>
//         </div>

//         {loading ? (
//           <div className="flex items-center justify-center py-12">
//             <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-8">
//               <div className="flex items-center space-x-3">
//                 <Loader2 className="w-6 h-6 animate-spin text-violet-600" />
//                 <p className="text-gray-600 font-medium">Loading your blogs...</p>
//               </div>
//             </div>
//           </div>
//         ) : message && blogs.length === 0 ? (
//           <div className="bg-red-50/80 backdrop-blur-xl rounded-2xl shadow-lg border border-red-200/50 p-6">
//             <p className="text-red-800 font-medium text-center">{message}</p>
//           </div>
//         ) : blogs.length === 0 ? (
//           <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-12 text-center">
//             <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">No blogs yet</h3>
//             <p className="text-gray-600 mb-6">Start sharing your thoughts with the world!</p>
//             <a
//               href="/add-blog"
//               className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
//             >
//               <Plus className="w-5 h-5" />
//               <span>Write Your First Blog</span>
//             </a>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {message && blogs.length > 0 && (
//               <div className="bg-green-50/80 backdrop-blur-xl rounded-2xl shadow-lg border border-green-200/50 p-4">
//                 <div className="flex items-center space-x-2">
//                   <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
//                     <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                       <path
//                         fillRule="evenodd"
//                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                   <p className="text-green-800 font-medium">{message}</p>
//                 </div>
//               </div>
//             )}

//             {blogs.map((blog) => {
//               const isExpanded = expandedBlogs[blog.blogId]
//               const showReadMore = needsTruncation(blog.description)

//               return (
//                 <div
//                   key={blog.blogId}
//                   className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300"
//                 >
//                   {editingBlogId === blog.blogId ? (
//                     <form onSubmit={handleUpdate} className="space-y-6">
//                       <div className="space-y-2">
//                         <label className="text-sm font-semibold text-gray-700 block">Blog Title</label>
//                         <div className="relative group">
//                           <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-violet-500 transition-colors duration-200" />
//                           <input
//                             type="text"
//                             name="title"
//                             value={editData.title}
//                             onChange={handleEditChange}
//                             required
//                             className="w-full pl-11 pr-4 py-3 h-12 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200 hover:bg-white/70"
//                           />
//                         </div>
//                       </div>

//                       <div className="space-y-2">
//                         <label className="text-sm font-semibold text-gray-700 block">Blog Content</label>
//                         <div className="relative group">
//                           <Edit3 className="absolute left-3 top-4 h-5 w-5 text-gray-400 group-focus-within:text-violet-500 transition-colors duration-200" />
//                           <textarea
//                             name="description"
//                             value={editData.description}
//                             onChange={handleEditChange}
//                             required
//                             rows={6}
//                             className="w-full pl-11 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200 hover:bg-white/70 resize-none"
//                           />
//                         </div>
//                       </div>

//                       <div className="space-y-2">
//                         <label className="text-sm font-semibold text-gray-700 block">Publication Date</label>
//                         <div className="relative group">
//                           <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-violet-500 transition-colors duration-200" />
//                           <input
//                             type="date"
//                             name="date"
//                             value={editData.date}
//                             onChange={handleEditChange}
//                             required
//                             className="w-full pl-11 pr-4 py-3 h-12 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200 hover:bg-white/70"
//                           />
//                         </div>
//                       </div>

//                       <div className="flex space-x-3 pt-4">
//                         <button
//                           type="submit"
//                           disabled={updating}
//                           className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
//                         >
//                           {updating ? (
//                             <>
//                               <Loader2 className="w-4 h-4 animate-spin" />
//                               <span>Saving...</span>
//                             </>
//                           ) : (
//                             <>
//                               <Save className="w-4 h-4" />
//                               <span>Save Changes</span>
//                             </>
//                           )}
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => setEditingBlogId(null)}
//                           className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-3 bg-white/60 hover:bg-white/80 border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
//                         >
//                           <X className="w-4 h-4" />
//                           <span>Cancel</span>
//                         </button>
//                       </div>
//                     </form>
//                   ) : (
//                     <>
//                       <div className="mb-4">
//                         <h3 className="text-xl font-bold text-gray-800 mb-3">{blog.title}</h3>

//                         <div className="text-gray-600 leading-relaxed">
//                           <p className="whitespace-pre-wrap">
//                             {isExpanded ? blog.description : truncateText(blog.description)}
//                           </p>

//                           {showReadMore && (
//                             <button
//                               onClick={() => toggleBlogExpansion(blog.blogId)}
//                               className="inline-flex items-center space-x-1 mt-3 px-3 py-1.5 bg-gradient-to-r from-violet-500/10 to-purple-500/10 hover:from-violet-500/20 hover:to-purple-500/20 text-violet-700 font-medium rounded-lg transition-all duration-200 border border-violet-200/50 hover:border-violet-300/50"
//                             >
//                               <span>{isExpanded ? "Read Less" : "Read More"}</span>
//                               {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//                             </button>
//                           )}
//                         </div>
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-4">
//                           <div className="flex items-center space-x-2 text-sm text-gray-500">
//                             <Calendar className="w-4 h-4" />
//                             <span>Published on {new Date(blog.date).toLocaleDateString()}</span>
//                           </div>
//                           <div className="flex items-center space-x-1 text-xs">
//                             <span className="px-2 py-1 bg-violet-100 text-violet-700 rounded-full">
//                               {blog.description.split(" ").length} words
//                             </span>
//                           </div>
//                         </div>

//                         <div className="flex space-x-3">
//                           <button
//                             onClick={() => handleEdit(blog)}
//                             className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
//                           >
//                             <Edit3 className="w-4 h-4" />
//                             <span>Edit</span>
//                           </button>
//                           <button
//                             onClick={() => handleDelete(blog.blogId)}
//                             className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                             <span>Delete</span>
//                           </button>
//                         </div>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               )
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default MyBlogs

"use client";

import { useEffect, useState } from "react";
import {
  Loader2,
  Edit3,
  Trash2,
  Calendar,
  FileText,
  Save,
  X,
  Plus,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import API from "../../api/api";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [updating, setUpdating] = useState(false);
  const [expandedBlogs, setExpandedBlogs] = useState({});

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
      date: blog.date.slice(0, 10),
    });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await API.put(`/blogs/edit/${editingBlogId}`, editData, {
        withCredentials: true,
      });
      setEditingBlogId(null);
      setMessage("Blog updated successfully");
      fetchBlogs();
    } catch (err) {
      alert("Failed to update blog.");
    } finally {
      setUpdating(false);
    }
  };

  const toggleBlogExpansion = (blogId) => {
    setExpandedBlogs((prev) => ({
      ...prev,
      [blogId]: !prev[blogId],
    }));
  };

  const truncateText = (text, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const needsTruncation = (text, maxLength = 200) => {
    return text.length > maxLength;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/10 to-violet-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
            My Blogs
          </h1>
          <p className="text-gray-600 text-lg font-medium">Manage and edit your published content</p>
        </div>

        <div className="mb-8 text-center">
          <Link
            to="/add-blog"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Blog</span>
          </Link>
        </div>

        {loading ? (
          <div className="text-center text-gray-600 font-medium">Loading your blogs...</div>
        ) : message && blogs.length === 0 ? (
          <div className="text-center text-red-600 font-medium">{message}</div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-gray-600 font-medium">No blogs yet. Start by adding one!</div>
        ) : (
          <div className="space-y-6">
            {blogs.map((blog) => {
              const isExpanded = expandedBlogs[blog.blogId];
              const showReadMore = needsTruncation(blog.description);

              return (
                <div
                  key={blog.blogId}
                  className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300"
                >
                  {editingBlogId === blog.blogId ? (
                    <form onSubmit={handleUpdate} className="space-y-4">
                      <input
                        type="text"
                        name="title"
                        value={editData.title}
                        onChange={handleEditChange}
                        required
                        placeholder="Title"
                        className="w-full p-2 border rounded"
                      />
                      <textarea
                        name="description"
                        value={editData.description}
                        onChange={handleEditChange}
                        required
                        rows={4}
                        placeholder="Description"
                        className="w-full p-2 border rounded"
                      />
                      <input
                        type="date"
                        name="date"
                        value={editData.date}
                        onChange={handleEditChange}
                        required
                        className="w-full p-2 border rounded"
                      />
                      <div className="flex gap-3">
                        <button
                          type="submit"
                          disabled={updating}
                          className="px-4 py-2 bg-green-500 text-white rounded"
                        >
                          {updating ? "Saving..." : "Save"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingBlogId(null)}
                          className="px-4 py-2 bg-gray-300 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold">{blog.title}</h3>
                      <p className="text-gray-700">
                        {isExpanded ? blog.description : truncateText(blog.description)}
                      </p>
                      {showReadMore && (
                        <button
                          onClick={() => toggleBlogExpansion(blog.blogId)}
                          className="text-sm text-violet-700 mt-2"
                        >
                          {isExpanded ? "Read Less" : "Read More"}
                        </button>
                      )}
                      <p className="text-sm text-gray-500 mt-2">
                        Published on {new Date(blog.date).toLocaleDateString()}
                      </p>
                      <div className="flex gap-4 mt-4">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(blog.blogId)}
                          className="px-4 py-2 bg-red-500 text-white rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
