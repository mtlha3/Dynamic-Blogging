import express from 'express';
import { signup, login, logout } from '../controllers/userController.js';
import { verifyToken } from '../middleware/middleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', verifyToken, (req, res) => {
  res.status(200).json({ name: req.user.name, userId: req.user.userId });
});
router.post("/logout", logout);

export default router;
