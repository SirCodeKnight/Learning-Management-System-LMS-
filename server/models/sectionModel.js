const mongoose = require('mongoose');
const slugify = require('slugify');

const SectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a section title'],
      trim: true,
      maxlength: [100, 'Section title cannot be more than 100 characters']
    },
    slug: String,
    description: {
      type: String,
      maxlength: [500, 'Description cannot be more than 500 characters']
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    order: {
      type: Number,
      required: true
    },
    isPublished: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Create section slug from the title
SectionSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true });
  }
  next();
});

// Virtual lessons for this section
SectionSchema.virtual('lessons', {
  ref: 'Lesson',
  localField: '_id',
  foreignField: 'section',
  justOne: false
});

// Cascade delete lessons when a section is deleted
SectionSchema.pre('remove', async function(next) {
  await this.model('Lesson').deleteMany({ section: this._id });
  next();
});

module.exports = mongoose.model('Section', SectionSchema);