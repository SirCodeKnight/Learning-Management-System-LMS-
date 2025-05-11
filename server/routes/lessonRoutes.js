const express = require('express');
const { check } = require('express-validator');
const {
  getLessons,
  getLesson,
  createLesson,
  updateLesson,
  deleteLesson,
  uploadLessonVideo,
  uploadLessonPDF,
  addLessonResource,
  removeLessonResource,
  reorderLessons,
  getLessonStats,
  publishLesson,
  unpublishLesson,
  makeLessonPreview,
  removeLessonPreview
} = require('../controllers/lessonController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.get('/course/:courseId', getLessons);
router.get('/:id', getLesson);

// Protected routes (all users)
router.use(protect);

// Teacher/Admin routes
router.use(authorize('teacher', 'admin'));
router.post('/',
  [
    check('title', 'Title is required').notEmpty(),
    check('description', 'Description is required').notEmpty(),
    check('course', 'Course ID is required').isMongoId(),
    check('section', 'Section ID is required').isMongoId(),
    check('order', 'Order is required').isNumeric(),
    check('duration', 'Duration is required').isNumeric(),
    check('content.type', 'Content type is required').isIn(['video', 'article', 'pdf', 'iframe'])
  ],
  createLesson
);
router.put('/:id', updateLesson);
router.delete('/:id', deleteLesson);
router.post('/:id/upload/video', uploadLessonVideo);
router.post('/:id/upload/pdf', uploadLessonPDF);
router.post('/:id/resources',
  [
    check('title', 'Resource title is required').notEmpty(),
    check('type', 'Resource type is required').isIn(['pdf', 'doc', 'image', 'link', 'code', 'other']),
    check('url', 'Resource URL is required').notEmpty()
  ],
  addLessonResource
);
router.delete('/:id/resources/:resourceId', removeLessonResource);
router.put('/section/:sectionId/reorder', reorderLessons);
router.get('/:id/stats', getLessonStats);
router.put('/:id/publish', publishLesson);
router.put('/:id/unpublish', unpublishLesson);
router.put('/:id/preview', makeLessonPreview);
router.put('/:id/preview/remove', removeLessonPreview);

module.exports = router;