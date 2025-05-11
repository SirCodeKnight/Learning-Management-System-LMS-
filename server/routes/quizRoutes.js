const express = require('express');
const { check } = require('express-validator');
const {
  getQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  reorderQuestions,
  submitQuiz,
  getQuizResults,
  getUserQuizAttempts,
  resetQuizAttempts,
  getQuizStats,
  publishQuiz,
  unpublishQuiz,
  makeQuizPreview,
  removeQuizPreview
} = require('../controllers/quizController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.get('/course/:courseId', getQuizzes);
router.get('/:id', getQuiz);

// Protected routes (all users)
router.use(protect);
router.post('/:id/submit', submitQuiz);
router.get('/:id/results', getQuizResults);
router.get('/user/attempts', getUserQuizAttempts);

// Teacher/Admin routes
router.use(authorize('teacher', 'admin'));
router.post('/',
  [
    check('title', 'Title is required').notEmpty(),
    check('description', 'Description is required').notEmpty(),
    check('course', 'Course ID is required').isMongoId(),
    check('section', 'Section ID is required').isMongoId(),
    check('order', 'Order is required').isNumeric(),
    check('passingScore', 'Passing score must be between 0 and 100')
      .isInt({ min: 0, max: 100 })
  ],
  createQuiz
);
router.put('/:id', updateQuiz);
router.delete('/:id', deleteQuiz);
router.post('/:id/questions',
  [
    check('question', 'Question text is required').notEmpty(),
    check('questionType', 'Question type is required')
      .isIn(['multiple-choice', 'true-false', 'fill-blank', 'matching', 'essay']),
    check('points', 'Points must be a positive number').isInt({ min: 1 })
  ],
  addQuestion
);
router.put('/:id/questions/:questionId', updateQuestion);
router.delete('/:id/questions/:questionId', deleteQuestion);
router.put('/:id/questions/reorder', reorderQuestions);
router.put('/:id/reset-attempts/:userId', resetQuizAttempts);
router.get('/:id/stats', getQuizStats);
router.put('/:id/publish', publishQuiz);
router.put('/:id/unpublish', unpublishQuiz);
router.put('/:id/preview', makeQuizPreview);
router.put('/:id/preview/remove', removeQuizPreview);

module.exports = router;