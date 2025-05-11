const express = require('express');
const { check } = require('express-validator');
const {
  getAnnouncements,
  getAnnouncement,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  getGlobalAnnouncements,
  getCourseAnnouncements,
  markAnnouncementAsRead,
  addAttachment,
  removeAttachment
} = require('../controllers/announcementController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getAnnouncements);
router.get('/global', getGlobalAnnouncements);
router.get('/course/:courseId', getCourseAnnouncements);
router.get('/:id', getAnnouncement);

// Protected routes (all users)
router.use(protect);
router.put('/:id/mark-read', markAnnouncementAsRead);

// Teacher/Admin routes
router.use(authorize('teacher', 'admin'));
router.post('/',
  [
    check('title', 'Title is required').notEmpty(),
    check('content', 'Content is required').notEmpty()
  ],
  createAnnouncement
);
router.put('/:id', updateAnnouncement);
router.delete('/:id', deleteAnnouncement);
router.post('/:id/attachments', addAttachment);
router.delete('/:id/attachments/:attachmentId', removeAttachment);

module.exports = router;