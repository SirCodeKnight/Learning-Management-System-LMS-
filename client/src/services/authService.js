import axios from 'axios';
import { API_URL } from '../config/constants';

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/api/auth/register`, userData);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, userData);
  return response.data;
};

// Logout user
const logout = async () => {
  const response = await axios.get(`${API_URL}/api/auth/logout`);
  return response.data;
};

// Get current user
const getMe = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  const response = await axios.get(`${API_URL}/api/auth/me`, config);
  return response.data;
};

// Update user profile
const updateProfile = async (profileData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  const response = await axios.put(`${API_URL}/api/users/profile`, profileData, config);
  return response.data;
};

// Update user password
const updatePassword = async (passwordData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  const response = await axios.put(`${API_URL}/api/auth/updatepassword`, passwordData, config);
  return response.data;
};

// Forgot password
const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/api/auth/forgotpassword`, { email });
  return response.data;
};

// Reset password
const resetPassword = async (token, password) => {
  const response = await axios.put(`${API_URL}/api/auth/resetpassword/${token}`, { password });
  return response.data;
};

// Verify email
const verifyEmail = async (token) => {
  const response = await axios.get(`${API_URL}/api/auth/verifyemail/${token}`);
  return response.data;
};

// Resend verification email
const resendVerification = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  const response = await axios.post(`${API_URL}/api/auth/resendverification`, {}, config);
  return response.data;
};

// Upload avatar
const uploadAvatar = async (formData, token) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  };
  
  const response = await axios.post(`${API_URL}/api/users/avatar`, formData, config);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  updatePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerification,
  uploadAvatar
};

export default authService;