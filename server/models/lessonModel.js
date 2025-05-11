const mongoose = require('mongoose');
const slugify = require('slugify');

const LessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a lesson title'],
      trim: true,
      maxlength: [100, 'Lesson title cannot be more than 100 characters']
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [2000, 'Description cannot be more than 2000 characters']
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Section',
      required: true
    },
    order: {
      type: Number,
      required: true
    },
    duration: {
      type: Number, // Duration in minutes
      required: [true, 'Please add lesson duration']
    },
    content: {
      type: {
        type: String,
        enum: ['video', 'article', 'pdf', 'iframe'],
        required: [true, 'Please specify content type']
      },
      video: {
        url: String,
        provider: {
          type: String,
          enum: ['youtube', 'vimeo', 'cloudinary', 'url']
        },
        duration: Number // Duration in seconds
      },
      article: {
        content: String // Markdown or HTML content
      },
      pdf: {
        url: String
      },
      iframe: {
        url: String,
        height: Number
      }
    },
    resources: [
      {
        title: String,
        type: {
          type: String,
          enum: ['pdf', 'doc', 'image', 'link', 'code', 'other']
        },
        url: String,
        description: String
      }
    ],
    isPublished: {
      type: Boolean,
      default: false
    },
    isPreview: {
      type: Boolean,
      default: false
    },
    completedBy: [
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

// Create lesson slug from the title
LessonSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true });
  }
  next();
});

// Calculate completion percentage
LessonSchema.virtual('completionPercentage').get(function() {
  if (!this.completedBy || !this.course) return 0;
  
  const courseStudentsCount = this.course.enrolledStudents ? this.course.enrolledStudents.length : 0;
  if (courseStudentsCount === 0) return 0;
  
  return Math.round((this.completedBy.length / courseStudentsCount) * 100);
});

module.exports = mongoose.model('Lesson', LessonSchema);