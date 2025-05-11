const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        'announcement',
        'course_enrollment',
        'quiz_result',
        'discussion_reply',
        'course_update',
        'system',
        'mention',
        'reminder',
        'certificate'
      ]
    },
    title: {
      type: String,
      required: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    message: {
      type: String,
      required: true,
      maxlength: [500, 'Message cannot be more than 500 characters']
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    isRead: {
      type: Boolean,
      default: false
    },
    isEmailed: {
      type: Boolean,
      default: false
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson'
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz'
    },
    discussion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Discussion'
    },
    announcement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Announcement'
    },
    url: {
      type: String
    },
    priority: {
      type: String,
      enum: ['low', 'normal', 'high'],
      default: 'normal'
    },
    icon: {
      type: String,
      default: 'bell'
    },
    color: {
      type: String,
      default: 'blue'
    }
  },
  {
    timestamps: true
  }
);

// Indexing for faster queries
NotificationSchema.index({ recipient: 1, createdAt: -1 });
NotificationSchema.index({ recipient: 1, isRead: 1 });

module.exports = mongoose.model('Notification', NotificationSchema);