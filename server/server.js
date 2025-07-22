import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser"
import userRoutes from "./routes/userRoutes.js"
import blogRoutes from './routes/blogRoutes.js';
import commentRoutes from "./routes/commentRoutes.js";


dotenv.config();

const app = express();
connectDB();

app.use(cors({
  origin: "https://blog-space-indol.vercel.app",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser())

app.use("/api/users", userRoutes)
app.use('/api/blogs', blogRoutes);
app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
