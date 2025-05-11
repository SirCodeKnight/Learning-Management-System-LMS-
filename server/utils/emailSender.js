const nodemailer = require('nodemailer');

/**
 * Send email using configured transport
 * @param {Object} options - Email options
 * @param {String} options.email - Recipient email
 * @param {String} options.subject - Email subject
 * @param {String} options.message - Email message (HTML)
 */
const sendEmail = async (options) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Email message options
  const mailOptions = {
    from: `${process.env.EMAIL_FROM} <${process.env.EMAIL_USERNAME}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  // Send email
  await transporter.sendMail(mailOptions);
};

/**
 * Generate password reset email template
 * @param {string} name - User's name
 * @param {string} resetUrl - Password reset URL
 * @returns {string} - HTML email template
 */
const getPasswordResetTemplate = (name, resetUrl) => {
  return `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <div style="background-color: #4f46e5; padding: 15px; text-align: center; color: white; border-radius: 5px 5px 0 0;">
        <h2>Password Reset Request</h2>
      </div>
      <div style="background-color: #f9fafb; padding: 20px; border-radius: 0 0 5px 5px; border: 1px solid #e5e7eb; border-top: none;">
        <p>Hello ${name},</p>
        <p>You are receiving this email because you (or someone else) has requested to reset your password.</p>
        <p>This link will expire in 10 minutes:</p>
        <div style="text-align: center; margin: 25px 0;">
          <a href="${resetUrl}" style="background-color: #4f46e5; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
        </div>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        <p>Regards,<br>The LMS Team</p>
      </div>
      <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
        <p>If the button above doesn't work, copy and paste this URL into your browser:</p>
        <p style="word-break: break-all;">${resetUrl}</p>
      </div>
    </div>
  `;
};

/**
 * Generate welcome email template
 * @param {string} name - User's name
 * @param {string} loginUrl - Login URL
 * @returns {string} - HTML email template
 */
const getWelcomeTemplate = (name, loginUrl) => {
  return `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <div style="background-color: #4f46e5; padding: 15px; text-align: center; color: white; border-radius: 5px 5px 0 0;">
        <h2>Welcome to Our LMS!</h2>
      </div>
      <div style="background-color: #f9fafb; padding: 20px; border-radius: 0 0 5px 5px; border: 1px solid #e5e7eb; border-top: none;">
        <p>Hello ${name},</p>
        <p>Thank you for creating an account with our Learning Management System.</p>
        <p>You're now ready to start your learning journey!</p>
        <div style="text-align: center; margin: 25px 0;">
          <a href="${loginUrl}" style="background-color: #4f46e5; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Start Learning</a>
        </div>
        <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
        <p>Regards,<br>The LMS Team</p>
      </div>
    </div>
  `;
};

/**
 * Generate course enrollment confirmation email template
 * @param {string} name - User's name
 * @param {string} courseName - Course name
 * @param {string} courseUrl - Course URL
 * @returns {string} - HTML email template
 */
const getCourseEnrollmentTemplate = (name, courseName, courseUrl) => {
  return `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <div style="background-color: #4f46e5; padding: 15px; text-align: center; color: white; border-radius: 5px 5px 0 0;">
        <h2>Course Enrollment Confirmation</h2>
      </div>
      <div style="background-color: #f9fafb; padding: 20px; border-radius: 0 0 5px 5px; border: 1px solid #e5e7eb; border-top: none;">
        <p>Hello ${name},</p>
        <p>Congratulations! You have successfully enrolled in the course:</p>
        <p style="font-weight: bold; font-size: 18px; color: #4f46e5; text-align: center; margin: 15px 0;">${courseName}</p>
        <p>You can start learning right away by clicking the button below:</p>
        <div style="text-align: center; margin: 25px 0;">
          <a href="${courseUrl}" style="background-color: #4f46e5; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Go to Course</a>
        </div>
        <p>We hope you enjoy the course and find it valuable for your learning journey.</p>
        <p>Regards,<br>The LMS Team</p>
      </div>
    </div>
  `;
};

module.exports = {
  sendEmail,
  getPasswordResetTemplate,
  getWelcomeTemplate,
  getCourseEnrollmentTemplate
};