import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Nav from "./Components/Nav"
import Login from "./Components/Login"
import Signup from "./components/Signup"
import Home from "./pages/Home"
import AddBlog from "./pages/AddBlog"
import MyBlogs from "./pages/Myblogs"

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/my-blogs" element={<MyBlogs />} />
      </Routes>
    </Router>
  )
}

export default App
