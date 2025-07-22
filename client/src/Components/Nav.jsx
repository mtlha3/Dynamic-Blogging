import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { User, Plus, BookOpen, LogOut, PenTool, Menu, X } from "lucide-react"
import API from "../../api/api"

const Navbar = () => {
  const [user, setUser] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

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

  const handleLogout = async () => {
    try {
      await API.post("/users/logout", {}, { withCredentials: true })
      setUser(null)
      navigate("/")
      window.location.reload()
    } catch (err) {
      console.error("Logout failed", err)
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200 transform group-hover:scale-105">
                <PenTool className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                BlogSpace
              </h1>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <Link
                to="/login"
                className="inline-flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <PenTool className="w-4 h-4" />
                <span>Start Blogging</span>
              </Link>
            ) : (
              <>
                <div className="flex items-center space-x-3 px-4 py-2 bg-white/60 rounded-xl border border-white/30">
                  <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">Hi, {user.name}</span>
                </div>

                <Link
                  to="/add-blog"
                  className="inline-flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Blog</span>
                </Link>

                <Link
                  to="/my-blogs"
                  className="inline-flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>My Blogs</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-700 hover:text-violet-600 hover:bg-white/60 transition-all duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-3 bg-white/60 backdrop-blur-xl rounded-2xl mt-2 border border-white/20 shadow-lg">
              {!user ? (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg"
                >
                  <PenTool className="w-5 h-5" />
                  <span>Start Blogging</span>
                </Link>
              ) : (
                <>
                  <div className="flex items-center space-x-3 px-4 py-3 bg-white/80 rounded-xl border border-white/40">
                    <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-800 font-semibold">Hello, {user.name}!</p>
                      <p className="text-gray-600 text-sm">Welcome back</p>
                    </div>
                  </div>

                  <Link
                    to="/add-blog"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-xl transition-all duration-200 shadow-md"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add New Blog</span>
                  </Link>

                  <Link
                    to="/my-blogs"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-200 shadow-md"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>My Blogs</span>
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-xl transition-all duration-200 shadow-md w-full"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
