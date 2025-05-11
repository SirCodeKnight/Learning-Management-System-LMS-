const express = require('express');
const { check } = require('express-validator');
const {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  updatePassword,
  verifyEmail,
  resendVerificationEmail
} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Register user
router.post(
  '/register',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  register
);

// Login user
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  login
);

// Logout user
router.get('/logout', logout);

// Get current logged in user
router.get('/me', protect, getMe);

// Forgot password
router.post(
  '/forgotpassword',
  [check('email', 'Please include a valid email').isEmail()],
  forgotPassword
);

// Reset password
router.put(
  '/resetpassword/:resettoken',
  [
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  resetPassword
);

// Update password (when logged in)
router.put(
  '/updatepassword',
  protect,
  [
    check('currentPassword', 'Current password is required').notEmpty(),
    check('newPassword', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  updatePassword
);

// Verify email
router.get('/verifyemail/:verificationtoken', verifyEmail);

// Resend verification email
router.post(
  '/resendverification',
  protect,
  resendVerificationEmail
);

module.exports = router;