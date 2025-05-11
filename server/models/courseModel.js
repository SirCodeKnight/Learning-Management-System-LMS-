const mongoose = require('mongoose');
const slugify = require('slugify');

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a course title'],
      trim: true,
      maxlength: [100, 'Course title cannot be more than 100 characters']
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [2000, 'Description cannot be more than 2000 characters']
    },
    shortDescription: {
      type: String,
      required: [true, 'Please add a short description'],
      maxlength: [200, 'Short description cannot be more than 200 characters']
    },
    coverImage: {
      type: String,
      default: 'https://res.cloudinary.com/lms-cloud/image/upload/v1589997482/default-course_jkfpzj.png'
    },
    duration: {
      type: Number, // Duration in hours
      required: [true, 'Please add course duration']
    },
    level: {
      type: String,
      required: [true, 'Please add a difficulty level'],
      enum: ['beginner', 'intermediate', 'advanced']
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: [
        'development',
        'design',
        'marketing',
        'business',
        'finance',
        'it',
        'health',
        'music',
        'photography',
        'others'
      ]
    },
    tags: [String],
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    price: {
      type: Number,
      default: 0 // 0 means free
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    ratings: [
      {
        rating: {
          type: Number,
          min: 1,
          max: 5,
          required: true
        },
        comment: String,
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft'
    },
    publishedAt: {
      type: Date
    },
    isPublic: {
      type: Boolean,
      default: true
    },
    requirements: [String],
    objectives: [String],
    featured: {
      type: Boolean,
      default: false
    },
    certificate: {
      isEnabled: {
        type: Boolean,
        default: false
      },
      template: {
        type: String,
        default: 'default'
      }
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Create slug from title
CourseSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true });
  }
  next();
});

// Virtual lessons for this course
CourseSchema.virtual('lessons', {
  ref: 'Lesson',
  localField: '_id',
  foreignField: 'course',
  justOne: false
});

// Virtual quizzes for this course
CourseSchema.virtual('quizzes', {
  ref: 'Quiz',
  localField: '_id',
  foreignField: 'course',
  justOne: false
});

// Cascade delete lessons and quizzes when a course is deleted
CourseSchema.pre('remove', async function(next) {
  await this.model('Lesson').deleteMany({ course: this._id });
  await this.model('Quiz').deleteMany({ course: this._id });
  next();
});

// Static method to get average rating
CourseSchema.statics.getAverageRating = async function(courseId) {
  const obj = await this.aggregate([
    {
      $match: { _id: courseId }
    },
    {
      $unwind: '$ratings'
    },
    {
      $group: {
        _id: '$_id',
        averageRating: { $avg: '$ratings.rating' }
      }
    }
  ]);

  try {
    await this.findByIdAndUpdate(courseId, {
      averageRating: obj[0].averageRating.toFixed(1)
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after save
CourseSchema.post('save', function() {
  this.constructor.getAverageRating(this._id);
});

module.exports = mongoose.model('Course', CourseSchema);