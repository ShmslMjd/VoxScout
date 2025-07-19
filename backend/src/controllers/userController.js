import User from '../models/User.js';
import Software from '../models/Software.js';
import jwt from 'jsonwebtoken';

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register user
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);
    
    // Include profileImage in response
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage, // Make sure this is included
      token
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { name, email, profileImage } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.profileImage = profileImage || user.profileImage;

    // Save updates
    await user.save();

    // Return updated user without password
    const updatedUser = await User.findById(user._id).select('-password');
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add this new controller function
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get user bookmarks
export const getUserBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('bookmarks', 'name logo rating downloads')
      .select('bookmarks');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.bookmarks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add bookmark
export const addBookmark = async (req, res) => {
  try {
    const toolId = req.params.toolId;
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if tool exists
    const tool = await Software.findById(toolId);
    if (!tool) {
      return res.status(404).json({ message: 'Tool not found' });
    }

    // Check if already bookmarked
    if (user.bookmarks.includes(toolId)) {
      return res.status(400).json({ message: 'Tool already bookmarked' });
    }

    // Add to bookmarks
    user.bookmarks.push(toolId);
    await user.save();

    res.json({ message: 'Tool bookmarked successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove bookmark
export const removeBookmark = async (req, res) => {
  try {
    const toolId = req.params.toolId;
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if bookmark exists
    if (!user.bookmarks.includes(toolId)) {
      return res.status(400).json({ message: 'Tool not in bookmarks' });
    }

    // Remove from bookmarks
    user.bookmarks = user.bookmarks.filter(id => id.toString() !== toolId);
    await user.save();

    res.json({ message: 'Tool removed from bookmarks' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};