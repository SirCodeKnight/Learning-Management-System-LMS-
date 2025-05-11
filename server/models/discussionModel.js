const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a discussion title'],
      trim: true,
      maxlength: [100, 'Discussion title cannot be more than 100 characters']
    },
    content: {
      type: String,
      required: [true, 'Please add discussion content'],
      maxlength: [5000, 'Content cannot be more than 5000 characters']
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson'
      // Not required for general course discussions
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    tags: [String],
    isSticky: {
      type: Boolean,
      default: false
    },
    isAnnouncement: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['open', 'closed', 'resolved'],
      default: 'open'
    },
    replies: [
      {
        content: {
          type: String,
          required: true,
          maxlength: [2000, 'Reply cannot be more than 2000 characters']
        },
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        createdAt: {
          type: Date,
          default: Date.now
        },
        updatedAt: {
          type: Date,
          default: Date.now
        },
        isInstructor: {
          type: Boolean,
          default: false
        },
        isAnswer: {
          type: Boolean,
          default: false
        },
        upvotes: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          }
        ],
        attachments: [
          {
            name: String,
            url: String,
            type: String
          }
        ]
      }
    ],
    views: {
      type: Number,
      default: 0
    },
    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    attachments: [
      {
        name: String,
        url: String,
        type: String
      }
    ],
    watchers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    lastActivity: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Update lastActivity when adding a reply
DiscussionSchema.pre('save', function(next) {
  if (this.isModified('replies')) {
    this.lastActivity = Date.now();
  }
  next();
});

// Virtual for reply count
DiscussionSchema.virtual('replyCount').get(function() {
  return this.replies ? this.replies.length : 0;
});

// Virtual for upvote count
DiscussionSchema.virtual('upvoteCount').get(function() {
  return this.upvotes ? this.upvotes.length : 0;
});

// Virtual for watcher count
DiscussionSchema.virtual('watcherCount').get(function() {
  return this.watchers ? this.watchers.length : 0;
});

// Indexing for faster queries
DiscussionSchema.index({ course: 1, createdAt: -1 });
DiscussionSchema.index({ course: 1, lastActivity: -1 });
DiscussionSchema.index({ author: 1 });
DiscussionSchema.index({ isSticky: 1 });
DiscussionSchema.index({ status: 1 });

module.exports = mongoose.model('Discussion', DiscussionSchema);