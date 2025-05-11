const mongoose = require('mongoose');
const slugify = require('slugify');

const QuizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a quiz title'],
      trim: true,
      maxlength: [100, 'Quiz title cannot be more than 100 characters']
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [1000, 'Description cannot be more than 1000 characters']
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
    timeLimit: {
      type: Number, // Time limit in minutes (0 means no limit)
      default: 0
    },
    passingScore: {
      type: Number, // Minimum percentage to pass
      required: [true, 'Please add a passing score'],
      min: [0, 'Passing score cannot be less than 0'],
      max: [100, 'Passing score cannot be more than 100'],
      default: 70
    },
    allowedAttempts: {
      type: Number, // Number of attempts allowed (0 means unlimited)
      default: 0
    },
    shuffleQuestions: {
      type: Boolean,
      default: false
    },
    showCorrectAnswers: {
      type: Boolean,
      default: true
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    isPreview: {
      type: Boolean,
      default: false
    },
    questions: [
      {
        question: {
          type: String,
          required: [true, 'Please add a question']
        },
        questionType: {
          type: String,
          enum: ['multiple-choice', 'true-false', 'fill-blank', 'matching', 'essay'],
          default: 'multiple-choice'
        },
        options: [{
          text: String,
          isCorrect: Boolean
        }],
        correctAnswer: {
          type: String // Used for fill-blank, matching, and essay questions
        },
        explanation: String,
        points: {
          type: Number,
          default: 1
        },
        image: String
      }
    ],
    completedBy: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        score: Number,
        attempt: Number,
        startedAt: Date,
        completedAt: Date,
        timeSpent: Number, // Time spent in seconds
        answers: [
          {
            questionIndex: Number,
            answer: mongoose.Schema.Types.Mixed, // Can be string, array of strings, or object depending on question type
            isCorrect: Boolean,
            pointsEarned: Number
          }
        ]
      }
    ]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Create quiz slug from the title
QuizSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true });
  }
  next();
});

// Calculate total quiz points
QuizSchema.virtual('totalPoints').get(function() {
  if (!this.questions || this.questions.length === 0) return 0;
  
  return this.questions.reduce((total, question) => total + question.points, 0);
});

// Calculate average score
QuizSchema.virtual('averageScore').get(function() {
  if (!this.completedBy || this.completedBy.length === 0) return 0;
  
  const totalScore = this.completedBy.reduce((total, record) => total + record.score, 0);
  return Math.round((totalScore / this.completedBy.length) * 100) / 100;
});

// Calculate passing rate
QuizSchema.virtual('passingRate').get(function() {
  if (!this.completedBy || this.completedBy.length === 0) return 0;
  
  const passedCount = this.completedBy.filter(record => record.score >= this.passingScore).length;
  return Math.round((passedCount / this.completedBy.length) * 100);
});

module.exports = mongoose.model('Quiz', QuizSchema);