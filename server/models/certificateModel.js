const mongoose = require('mongoose');
const crypto = require('crypto');

const CertificateSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    certificateNumber: {
      type: String,
      unique: true
    },
    issueDate: {
      type: Date,
      default: Date.now
    },
    expiryDate: {
      type: Date
    },
    hasExpiry: {
      type: Boolean,
      default: false
    },
    templateUsed: {
      type: String,
      default: 'default'
    },
    status: {
      type: String,
      enum: ['active', 'revoked', 'expired'],
      default: 'active'
    },
    metadata: {
      courseCompletionDate: Date,
      grade: String,
      instructorName: String,
      hoursOfCredit: Number,
      additionalText: String
    },
    verificationUrl: String,
    imageUrl: String
  },
  {
    timestamps: true
  }
);

// Generate unique certificate number before saving
CertificateSchema.pre('save', function(next) {
  if (!this.certificateNumber) {
    // Generate a unique certificate number (timestamp + random string + user/course hash)
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    const hash = crypto
      .createHash('md5')
      .update(this.user.toString() + this.course.toString())
      .digest('hex')
      .substring(0, 6).toUpperCase();
    
    this.certificateNumber = `CERT-${timestamp}-${hash}-${random}`;
    
    // Create verification URL
    this.verificationUrl = `/verify-certificate/${this.certificateNumber}`;
  }
  next();
});

// Check if certificate is currently valid
CertificateSchema.virtual('isValid').get(function() {
  if (this.status !== 'active') return false;
  if (this.hasExpiry && this.expiryDate < new Date()) return false;
  return true;
});

module.exports = mongoose.model('Certificate', CertificateSchema);