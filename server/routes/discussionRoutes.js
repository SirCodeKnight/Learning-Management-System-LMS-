const express = require('express');
const { check } = require('express-validator');
const {
  getDiscussions,
  getDiscussion,
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  getCourseDiscussions,
  getLessonDiscussions,
  addReply,
  updateReply,
  deleteReply,
  markReplyAsAnswer,
  upvoteDiscussion,
  downvoteDiscussion,
  upvoteReply,
  downvoteReply,
  watchDiscussion,
  unwatchDiscussion,
  addAttachment,
  removeAttachment,
  setDiscussionStatus
} = require('../controllers/discussionController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Protected routes (all users)
router.use(protect);
router.get('/', getDiscussions);
router.get('/course/:courseId', getCourseDiscussions);
router.get('/lesson/:lessonId', getLessonDiscussions);
router.get('/:id', getDiscussion);
router.post('/',
  [
    check('title', 'Title is required').notEmpty(),
    check('content', 'Content is required').notEmpty(),
    check('course', 'Course ID is required').isMongoId()
  ],
  createDiscussion
);
router.put('/:id', updateDiscussion);
router.delete('/:id', deleteDiscussion);
router.post('/:id/replies',
  [
    check('content', 'Content is required').notEmpty()
  ],
  addReply
);
router.put('/:id/replies/:replyId', updateReply);
router.delete('/:id/replies/:replyId', deleteReply);
router.put('/:id/upvote', upvoteDiscussion);
router.put('/:id/downvote', downvoteDiscussion);
router.put('/:id/replies/:replyId/upvote', upvoteReply);
router.put('/:id/replies/:replyId/downvote', downvoteReply);
router.put('/:id/watch', watchDiscussion);
router.put('/:id/unwatch', unwatchDiscussion);
router.post('/:id/attachments', addAttachment);
router.delete('/:id/attachments/:attachmentId', removeAttachment);

// Teacher/Admin routes
router.use(authorize('teacher', 'admin'));
router.put('/:id/replies/:replyId/mark-answer', markReplyAsAnswer);
router.put('/:id/status', setDiscussionStatus);

module.exports = router;