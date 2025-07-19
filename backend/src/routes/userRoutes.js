import express from 'express';
import { register, login, getProfile, updateProfile, changePassword, getUserBookmarks, addBookmark, removeBookmark } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.put('/change-password', auth, changePassword);
router.get('/bookmarks', auth, getUserBookmarks);
router.post('/bookmarks/:toolId', auth, addBookmark);
router.delete('/bookmarks/:toolId', auth, removeBookmark);

export default router;