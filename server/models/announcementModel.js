const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add an announcement title'],
      trim: true,
      maxlength: [100, 'Announcement title cannot be more than 100 characters']
    },
    content: {
      type: String,
      required: [true, 'Please add announcement content'],
      maxlength: [5000, 'Content cannot be more than 5000 characters']
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
      // Not required for global announcements
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    isGlobal: {
      type: Boolean,
      default: false
    },
    isPublished: {
      type: Boolean,
      default: true
    },
    publishUntil: {
      type: Date
    },
    attachments: [
      {
        name: String,
        url: String,
        type: String
      }
    ],
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Check if announcement is still active
AnnouncementSchema.virtual('isActive').get(function() {
  if (!this.isPublished) return false;
  if (this.publishUntil && this.publishUntil < Date.now()) return false;
  return true;
});

// Calculate read percentage
AnnouncementSchema.virtual('readPercentage').get(function() {
  if (!this.readBy) return 0;
  
  let totalUsers = 0;
  
  if (this.isGlobal) {
    // For global announcements, consider all users
    // This would need to be updated with actual user count
    totalUsers = 100; // Placeholder
  } else if (this.course && this.course.enrolledStudents) {
    // For course announcements, consider enrolled students
    totalUsers = this.course.enrolledStudents.length;
  }
  
  if (totalUsers === 0) return 0;
  
  return Math.round((this.readBy.length / totalUsers) * 100);
});

module.exports = mongoose.model('Announcement', AnnouncementSchema);