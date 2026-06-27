import User from '../models/user.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../config/token.js'

const isProduction = process.env.NODE_ENV === 'production';

const cookieOptions = {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000, 
  secure: isProduction,                
  sameSite: isProduction ? 'none' : 'lax', 
};

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'username, email and password are required.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hashedPassword });

    const token = generateToken(newUser._id);
    if (!token) {
      return res.status(500).json({ message: 'Failed to generate token. Check JWT_SECRET.' });
    }

    res.cookie('token', token, cookieOptions);
    await newUser.save();

    
    const { password: _pw, ...userSafe } = newUser.toObject();
    return res.status(201).json(userSafe);
  } catch (error) {
    console.error('SignUp error:', error.message);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email does not exist.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password.' });
    }

    const token = generateToken(user._id);
    if (!token) {
      return res.status(500).json({ message: 'Failed to generate token. Check JWT_SECRET.' });
    }

    res.cookie('token', token, cookieOptions);

    const { password: _pw, ...userSafe } = user.toObject();
    return res.status(200).json(userSafe);
  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const Logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
    });
    return res.status(200).json({ message: 'Logged out successfully.' });
  } catch (error) {
    console.error('Logout error:', error.message);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};