import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { MessageCircle, User, Calendar, Send, Loader2, ChevronDown, ChevronUp } from "lucide-react"
import API from "../../api/api"

const Home = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [user, setUser] = useState(null)
  const [showCommentBox, setShowCommentBox] = useState(null)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState({})
  const [expandedBlogs, setExpandedBlogs] = useState({}) 

  useEffect(() => {
    const fetchUser = async () => {
      API.get("/users/me", { withCredentials: true })
        .then((res) => {
          setUser(res.data)
        })
        .catch((err) => {
          if (err.response?.status !== 401) {
            console.error("Error fetching user:", err)
          }
          setUser(null)
        })
    }
    fetchUser()
  }, [])

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const res = await API.get("/blogs/all")
        setBlogs(res.data.blogs)
      } catch (err) {
        setMessage("Failed to fetch blogs.")
      } finally {
        setLoading(false)
      }
    }
    fetchAllBlogs()
  }, [])

  const fetchComments = async (blogId) => {
    try {
      const res = await API.get(`/comments/${blogId}`)
      setComments((prev) => ({
        ...prev,
        [blogId]: res.data.comments,
      }))
    } catch (err) {
      console.error("Failed to load comments for blog:", blogId)
    }
  }

  const handleSendComment = async (blogId) => {
    if (!commentText.trim()) return
    try {
      await API.post("/comments/add", { commentText, blogId }, { withCredentials: true })
      setCommentText("")
      fetchComments(blogId)
    } catch (err) {
      alert("Failed to send comment.")
    }
  }

  const toggleCommentBox = (blogId) => {
    const isOpen = showCommentBox === blogId
    setShowCommentBox(isOpen ? null : blogId)
    if (!isOpen) fetchComments(blogId)
  }

  const toggleBlogExpansion = (blogId) => {
    setExpandedBlogs((prev) => ({
      ...prev,
      [blogId]: !prev[blogId],
    }))
  }

  const truncateText = (text, maxLength = 200) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  const needsTruncation = (text, maxLength = 200) => {
    return text.length > maxLength
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 relative overflow-hidden">

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/10 to-violet-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-6">
      
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Welcome to Our Blog
          </h1>
          <p className="text-gray-600 text-lg font-medium">Discover amazing stories and share your thoughts</p>
        </div>

        {user && (
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Hello, {user.name}!</h3>
                <p className="text-gray-600">Welcome back to your blog community</p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <MessageCircle className="w-6 h-6 mr-2 text-violet-600" />
            Latest Blogs
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-8">
                <div className="flex items-center space-x-3">
                  <Loader2 className="w-6 h-6 animate-spin text-violet-600" />
                  <p className="text-gray-600 font-medium">Loading blogs...</p>
                </div>
              </div>
            </div>
          ) : message ? (
            <div className="bg-red-50/80 backdrop-blur-xl rounded-2xl shadow-lg border border-red-200/50 p-6">
              <p className="text-red-800 font-medium">{message}</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-8 text-center">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">No blogs found.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {blogs.map((blog) => {
                const isExpanded = expandedBlogs[blog.blogId]
                const showReadMore = needsTruncation(blog.description)

                return (
                  <div
                    key={blog.blogId}
                    className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{blog.title}</h3>

                      <div className="text-gray-600 leading-relaxed">
                        <p className="whitespace-pre-wrap">
                          {isExpanded ? blog.description : truncateText(blog.description)}
                        </p>

                        {showReadMore && (
                          <button
                            onClick={() => toggleBlogExpansion(blog.blogId)}
                            className="inline-flex items-center space-x-1 mt-3 px-3 py-1.5 bg-gradient-to-r from-violet-500/10 to-purple-500/10 hover:from-violet-500/20 hover:to-purple-500/20 text-violet-700 font-medium rounded-lg transition-all duration-200 border border-violet-200/50 hover:border-violet-300/50"
                          >
                            <span>{isExpanded ? "Read Less" : "Read More"}</span>
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-200/50">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span className="font-medium">{blog.userName}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(blog.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs">
                        <span className="px-2 py-1 bg-violet-100 text-violet-700 rounded-full">
                          {blog.description.split(" ").length} words
                        </span>
                      </div>
                    </div>

                    <div>
                      {user ? (
                        <>
                          <button
                            onClick={() => toggleCommentBox(blog.blogId)}
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>{showCommentBox === blog.blogId ? "Hide Comments" : "Add/View Comments"}</span>
                          </button>

                          {showCommentBox === blog.blogId && (
                            <div className="mt-6 p-4 bg-white/50 rounded-xl border border-white/30">
                           
                              <div className="mb-4">
                                <textarea
                                  rows={3}
                                  placeholder="Write your comment..."
                                  value={commentText}
                                  onChange={(e) => setCommentText(e.target.value)}
                                  className="w-full p-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200 resize-none"
                                />
                                <button
                                  onClick={() => handleSendComment(blog.blogId)}
                                  className="mt-2 inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                  <Send className="w-4 h-4" />
                                  <span>Send</span>
                                </button>
                              </div>

                              <div className="space-y-3">
                                {comments[blog.blogId]?.length > 0 ? (
                                  comments[blog.blogId].map((c, idx) => {
                                    const isMyComment = c.userId === user?.userId
                                    return (
                                      <div
                                        key={idx}
                                        className={`flex ${isMyComment ? "justify-end" : "justify-start"}`}
                                      >
                                        <div
                                          className={`max-w-[70%] p-3 rounded-2xl shadow-sm ${
                                            isMyComment
                                              ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white"
                                              : "bg-white/80 text-gray-800 border border-gray-200/50"
                                          }`}
                                        >
                                          <div className="flex items-center space-x-2 mb-1">
                                            <div
                                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                                isMyComment ? "bg-white/20 text-white" : "bg-violet-100 text-violet-600"
                                              }`}
                                            >
                                              {c.userName.charAt(0).toUpperCase()}
                                            </div>
                                            <span
                                              className={`text-sm font-medium ${
                                                isMyComment ? "text-white/90" : "text-gray-700"
                                              }`}
                                            >
                                              {c.userName}
                                            </span>
                                          </div>
                                          <p
                                            className={`text-sm leading-relaxed ${
                                              isMyComment ? "text-white" : "text-gray-700"
                                            }`}
                                          >
                                            {c.commentText}
                                          </p>
                                        </div>
                                      </div>
                                    )
                                  })
                                ) : (
                                  <div className="text-center py-6">
                                    <MessageCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-500 font-medium">No comments yet.</p>
                                    <p className="text-gray-400 text-sm">Be the first to share your thoughts!</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <Link to="/login">
                          <button className="inline-flex items-center space-x-2 px-4 py-2 bg-white/60 hover:bg-white/80 border border-violet-200 hover:border-violet-300 text-violet-700 font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg">
                            <User className="w-4 h-4" />
                            <span>Login to share your views on this blog</span>
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
