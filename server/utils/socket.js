const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports = (io) => {
  // Socket.io authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Authentication error: Token missing'));
      }
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return next(new Error('Authentication error: User not found'));
      }
      
      socket.user = user;
      next();
    } catch (error) {
      return next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.user.name}`);
    
    // Join user-specific room
    socket.join(`user_${socket.user._id}`);
    
    // Join role-based rooms
    socket.join(`role_${socket.user.role}`);
    
    // Join enrolled courses for students
    if (socket.user.role === 'student' && socket.user.enrolledCourses) {
      socket.user.enrolledCourses.forEach(course => {
        socket.join(`course_${course}`);
      });
    }
    
    // Join teaching courses for instructors
    if (socket.user.role === 'teacher' && socket.user.teachingCourses) {
      socket.user.teachingCourses.forEach(course => {
        socket.join(`course_${course}`);
      });
    }
    
    // Admin joins all course rooms
    if (socket.user.role === 'admin') {
      // Admin-specific handlers
    }

    // Handle chat messages in course discussions
    socket.on('course_message', async ({ courseId, message }) => {
      // Save message to database logic here
      
      // Broadcast to all users in the course room
      io.to(`course_${courseId}`).emit('new_message', {
        user: {
          _id: socket.user._id,
          name: socket.user.name,
          avatar: socket.user.avatar
        },
        message,
        createdAt: new Date()
      });
    });

    // Handle notifications
    socket.on('notification', ({ type, recipients, data }) => {
      // Save notification to database logic here
      
      // Send to specific recipients or roles
      if (recipients.userIds) {
        recipients.userIds.forEach(userId => {
          io.to(`user_${userId}`).emit('new_notification', {
            type,
            data,
            from: socket.user._id
          });
        });
      }
      
      if (recipients.roles) {
        recipients.roles.forEach(role => {
          io.to(`role_${role}`).emit('new_notification', {
            type,
            data,
            from: socket.user._id
          });
        });
      }
      
      if (recipients.courseId) {
        io.to(`course_${recipients.courseId}`).emit('new_notification', {
          type,
          data,
          from: socket.user._id
        });
      }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.user.name}`);
    });
  });
};