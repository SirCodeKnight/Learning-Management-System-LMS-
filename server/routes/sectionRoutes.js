const express = require('express');
const { check } = require('express-validator');
const {
  getSections,
  getSection,
  createSection,
  updateSection,
  deleteSection,
  reorderSections,
  getSectionLessons
} = require('../controllers/sectionController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.get('/course/:courseId', getSections);
router.get('/:id', getSection);
router.get('/:id/lessons', getSectionLessons);

// Protected routes (teacher/admin only)
router.use(protect);
router.use(authorize('teacher', 'admin'));
router.post('/',
  [
    check('title', 'Title is required').notEmpty(),
    check('course', 'Course ID is required').isMongoId(),
    check('order', 'Order is required').isNumeric()
  ],
  createSection
);
router.put('/:id', updateSection);
router.delete('/:id', deleteSection);
router.put('/course/:courseId/reorder', reorderSections);

module.exports = router;