// API URL
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Socket.io URL (usually the same as API URL)
export const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

// Features toggle
export const FEATURES = {
  DISCUSSIONS: true,
  ANNOUNCEMENTS: true,
  QUIZZES: true,
  CERTIFICATES: true,
  VIDEO_LESSONS: true,
  PDF_LESSONS: true,
  LIVE_SESSIONS: true,
  PROGRESS_TRACKING: true,
  RATINGS_REVIEWS: true,
  NOTIFICATIONS: true,
  DARK_MODE: true,
  MULTI_LANGUAGE: false,
  COURSE_RECOMMENDATIONS: true,
  COURSE_SEARCH: true,
  PAYMENT_INTEGRATION: false,
  SOCIAL_SHARING: true,
  MOBILE_APP: false
};

// Course categories
export const COURSE_CATEGORIES = [
  { id: 'development', name: 'Development' },
  { id: 'design', name: 'Design' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'business', name: 'Business' },
  { id: 'finance', name: 'Finance' },
  { id: 'it', name: 'IT & Software' },
  { id: 'health', name: 'Health & Fitness' },
  { id: 'music', name: 'Music' },
  { id: 'photography', name: 'Photography' },
  { id: 'others', name: 'Others' }
];

// Course difficulty levels
export const COURSE_LEVELS = [
  { id: 'beginner', name: 'Beginner' },
  { id: 'intermediate', name: 'Intermediate' },
  { id: 'advanced', name: 'Advanced' }
];

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student'
};

// Content types
export const CONTENT_TYPES = {
  VIDEO: 'video',
  ARTICLE: 'article',
  PDF: 'pdf',
  IFRAME: 'iframe'
};

// Video providers
export const VIDEO_PROVIDERS = {
  YOUTUBE: 'youtube',
  VIMEO: 'vimeo',
  CLOUDINARY: 'cloudinary',
  URL: 'url'
};

// Question types
export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'multiple-choice',
  TRUE_FALSE: 'true-false',
  FILL_BLANK: 'fill-blank',
  MATCHING: 'matching',
  ESSAY: 'essay'
};

// Discussion status
export const DISCUSSION_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
  RESOLVED: 'resolved'
};

// Notification types
export const NOTIFICATION_TYPES = {
  ANNOUNCEMENT: 'announcement',
  COURSE_ENROLLMENT: 'course_enrollment',
  QUIZ_RESULT: 'quiz_result',
  DISCUSSION_REPLY: 'discussion_reply',
  COURSE_UPDATE: 'course_update',
  SYSTEM: 'system',
  MENTION: 'mention',
  REMINDER: 'reminder',
  CERTIFICATE: 'certificate'
};

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100
};

// Image placeholders
export const PLACEHOLDERS = {
  USER_AVATAR: 'https://res.cloudinary.com/lms-cloud/image/upload/v1589997482/default-avatar_jkfpzj.png',
  COURSE_IMAGE: 'https://res.cloudinary.com/lms-cloud/image/upload/v1589997482/default-course_jkfpzj.png',
  LESSON_IMAGE: 'https://res.cloudinary.com/lms-cloud/image/upload/v1589997482/default-lesson_jkfpzj.png'
};