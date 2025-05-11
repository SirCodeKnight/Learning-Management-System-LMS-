import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { refreshUser } from './store/slices/authSlice';
import { setTheme } from './store/slices/settingsSlice';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';
import LearningLayout from './layouts/LearningLayout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import NotFound from './pages/NotFound';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import VerifyEmail from './pages/auth/VerifyEmail';

// Dashboard Pages
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/dashboard/Profile';
import Settings from './pages/dashboard/Settings';
import MyCourses from './pages/dashboard/MyCourses';
import Notifications from './pages/dashboard/Notifications';
import Certificates from './pages/dashboard/Certificates';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UsersManagement from './pages/admin/UsersManagement';
import CoursesManagement from './pages/admin/CoursesManagement';
import CourseEditor from './pages/admin/CourseEditor';
import SystemSettings from './pages/admin/SystemSettings';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import CourseCreator from './pages/teacher/CourseCreator';
import StudentManagement from './pages/teacher/StudentManagement';
import Analytics from './pages/teacher/Analytics';

// Learning Pages
import CourseContent from './pages/learning/CourseContent';
import LessonView from './pages/learning/LessonView';
import QuizView from './pages/learning/QuizView';
import CourseDiscussions from './pages/learning/CourseDiscussions';
import CourseAnnouncements from './pages/learning/CourseAnnouncements';

// Protected route component
const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRoles.length > 0 && !requiredRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.settings);
  const [loading, setLoading] = useState(true);
  
  // Check if user is authenticated on app load
  useEffect(() => {
    const initializeApp = async () => {
      if (isAuthenticated) {
        await dispatch(refreshUser());
      }
      setLoading(false);
    };
    
    initializeApp();
  }, [dispatch, isAuthenticated]);
  
  // Set dark/light mode on app load and when changed
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  // Check user's preferred color scheme
  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    dispatch(setTheme(isDarkMode));
  }, [dispatch]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
      </Route>
      
      {/* Auth Routes */}
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />
        <Route path="verify-email/:token" element={<VerifyEmail />} />
      </Route>
      
      {/* Dashboard Routes - For all authenticated users */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="my-courses" element={<MyCourses />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="certificates" element={<Certificates />} />
      </Route>
      
      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRoles={['admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UsersManagement />} />
        <Route path="courses" element={<CoursesManagement />} />
        <Route path="courses/:courseId" element={<CourseEditor />} />
        <Route path="settings" element={<SystemSettings />} />
      </Route>
      
      {/* Teacher Routes */}
      <Route
        path="/teacher"
        element={
          <ProtectedRoute requiredRoles={['teacher', 'admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TeacherDashboard />} />
        <Route path="courses/create" element={<CourseCreator />} />
        <Route path="courses/:courseId/edit" element={<CourseCreator />} />
        <Route path="courses/:courseId/students" element={<StudentManagement />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
      
      {/* Learning Routes */}
      <Route
        path="/learn/:courseId"
        element={
          <ProtectedRoute>
            <LearningLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<CourseContent />} />
        <Route path="lesson/:lessonId" element={<LessonView />} />
        <Route path="quiz/:quizId" element={<QuizView />} />
        <Route path="discussions" element={<CourseDiscussions />} />
        <Route path="announcements" element={<CourseAnnouncements />} />
      </Route>
      
      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;