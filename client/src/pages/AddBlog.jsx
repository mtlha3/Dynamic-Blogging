import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Loader2, PenTool, Calendar, FileText, Send, ArrowLeft } from "lucide-react"
import API from "../../api/api"

const AddBlog = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  })
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  
    useEffect(() => {
    const today = new Date().toISOString().slice(0, 10)
    setFormData((prev) => ({ ...prev, date: today }))
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage("")

    try {
      const res = await API.post("/blogs/add", formData, {
        withCredentials: true,
      })
      setMessage("Blog added successfully!")
      setTimeout(() => {
        navigate("/my-blogs")
      }, 1500)
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to add blog"
      setMessage(errorMsg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 relative overflow-hidden">

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-violet-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto p-6">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center space-x-2 px-4 py-2 bg-white/60 hover:bg-white/80 backdrop-blur-xl border border-white/20 text-violet-700 font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 rounded-2xl"></div>

          <div className="relative z-10">

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                <PenTool className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Create New Blog
              </h1>
              <p className="text-gray-600 mt-2 font-medium">Share your thoughts with the world</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-semibold text-gray-700 block">
                  Blog Title
                </label>
                <div className="relative group">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-violet-500 transition-colors duration-200" />
                  <input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="Enter an engaging title for your blog"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 h-12 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200 hover:bg-white/70"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-semibold text-gray-700 block">
                  Blog Content
                </label>
                <div className="relative group">
                  <PenTool className="absolute left-3 top-4 h-5 w-5 text-gray-400 group-focus-within:text-violet-500 transition-colors duration-200" />
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Write your blog content here... Share your ideas, experiences, or insights."
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={8}
                    className="w-full pl-11 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200 hover:bg-white/70 resize-none"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Write a detailed description of your blog post. Make it engaging and informative.
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-semibold text-gray-700 block">
                  Publication Date
                </label>
                <div className="relative group">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-violet-500 transition-colors duration-200" />
                  <input
                    id="date"
                    type="date"
                    name="date"
                    value={formData.date}
                    readOnly
                    className="w-full pl-11 pr-4 py-3 h-12 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200 hover:bg-white/70"
                  />

                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full h-12 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none focus:outline-none focus:ring-2 focus:ring-violet-500/20 flex items-center justify-center"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Publishing Blog...
                  </>
                ) : (
                  <>
                    Publish Blog
                    <Send className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            {message && (
              <div
                className={`mt-6 p-4 rounded-xl border transition-all duration-300 ${message.includes("successfully") || message.includes("success")
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                  }`}
              >
                <div className="flex items-center space-x-2">
                  {message.includes("successfully") ? (
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                  <p className="text-sm font-medium">{message}</p>
                </div>
              </div>
            )}

            <div className="mt-8 p-4 bg-violet-50/50 rounded-xl border border-violet-100">
              <h3 className="text-sm font-semibold text-violet-800 mb-2">💡 Writing Tips</h3>
              <ul className="text-xs text-violet-700 space-y-1">
                <li>• Use a compelling title that grabs attention</li>
                <li>• Write in a clear, engaging tone</li>
                <li>• Break up long paragraphs for better readability</li>
                <li>• Choose a relevant publication date</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddBlog
