import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const generateUserId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < 5; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
};

const isEmail = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

export const signup = async (req, res) => {
  try {
    const { identifier, name, password } = req.body;

    if (!identifier || !name || !password) {
      return res.status(400).json({ message: 'Identifier, name, and password are required.' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
    }

    const existingUser = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }]
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Username or email already in use.' });
    }
    let userId;
    let exists = true;
    while (exists) {
      userId = generateUserId();
      exists = await User.findOne({ userId });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userId,
      name,
      password: hashedPassword,
      ...(isEmail(identifier) ? { email: identifier } : { username: identifier })
    });

    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      userId: newUser.userId
    });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


//========
export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ message: 'Identifier and password are required.' });
    }

    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }]
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { name: user.name, userId: user.userId },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({ message: 'Login successful' });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//=====
export const logout = (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production"
  });
  res.status(200).json({ message: "Logged out successfully" });
};
