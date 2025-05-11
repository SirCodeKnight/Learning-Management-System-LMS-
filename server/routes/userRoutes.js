const express = require('express');
const { check } = require('express-validator');
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateProfile,
  getUserProfile,
  uploadAvatar,
  updatePreferences,
  getUserStats,
  getUserCourses,
  getUserCompletedCourses,
  getUserInProgressCourses,
  getUserNotifications,
  markNotificationAsRead,
  deleteNotification,
  getCertificates
} = require('../controllers/userController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.get('/profile/:id', getUserProfile);

// Protected routes (all users)
router.use(protect);
router.put(
  '/profile',
  [
    check('name', 'Name is required').optional(),
    check('bio', 'Bio cannot be more than 500 characters').optional().isLength({ max: 500 })
  ],
  updateProfile
);
router.put('/preferences', updatePreferences);
router.post('/avatar', uploadAvatar);
router.get('/stats', getUserStats);
router.get('/courses', getUserCourses);
router.get('/courses/completed', getUserCompletedCourses);
router.get('/courses/in-progress', getUserInProgressCourses);
router.get('/notifications', getUserNotifications);
router.put('/notifications/:id/read', markNotificationAsRead);
router.delete('/notifications/:id', deleteNotification);
router.get('/certificates', getCertificates);

// Admin only routes
router.use(authorize('admin'));
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post(
  '/',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('role', 'Role must be either student, teacher or admin').isIn(['student', 'teacher', 'admin'])
  ],
  createUser
);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;