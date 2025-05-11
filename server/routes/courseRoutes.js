const express = require('express');
const { check } = require('express-validator');
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  uploadCourseImage,
  enrollCourse,
  unenrollCourse,
  getEnrolledStudents,
  getFeaturedCourses,
  getPopularCourses,
  getRecentCourses,
  addCourseRating,
  getCourseRatings,
  getCourseStats,
  publishCourse,
  unpublishCourse,
  getCourseSections,
  addCourseToFavorites,
  removeFromFavorites,
  completeCourse,
  getCompletedLessons,
  markLessonAsComplete
} = require('../controllers/courseController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getCourses);
router.get('/featured', getFeaturedCourses);
router.get('/popular', getPopularCourses);
router.get('/recent', getRecentCourses);
router.get('/:id', getCourse);
router.get('/:id/ratings', getCourseRatings);
router.get('/:id/sections', getCourseSections);

// Protected routes (all users)
router.use(protect);
router.post('/:id/enroll', enrollCourse);
router.delete('/:id/enroll', unenrollCourse);
router.post('/:id/ratings', 
  [
    check('rating', 'Rating must be between 1 and 5').isInt({ min: 1, max: 5 }),
    check('comment', 'Comment cannot be more than 500 characters').optional().isLength({ max: 500 })
  ],
  addCourseRating
);
router.post('/:id/favorites', addCourseToFavorites);
router.delete('/:id/favorites', removeFromFavorites);
router.post('/:id/complete', completeCourse);
router.get('/:id/completed-lessons', getCompletedLessons);
router.post('/:courseId/lessons/:lessonId/complete', markLessonAsComplete);

// Teacher/Admin routes
router.use(authorize('teacher', 'admin'));
router.post('/',
  [
    check('title', 'Title is required').notEmpty(),
    check('description', 'Description is required').notEmpty(),
    check('shortDescription', 'Short description is required').notEmpty(),
    check('category', 'Category is required').notEmpty(),
    check('level', 'Level is required').notEmpty(),
    check('duration', 'Duration is required').isNumeric()
  ],
  createCourse
);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);
router.post('/:id/image', uploadCourseImage);
router.get('/:id/students', getEnrolledStudents);
router.get('/:id/stats', getCourseStats);
router.put('/:id/publish', publishCourse);
router.put('/:id/unpublish', unpublishCourse);

module.exports = router;