import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';
import { toast } from 'react-toastify';

// Get user from local storage
const user = JSON.parse(localStorage.getItem('user')) || null;
const token = localStorage.getItem('token') || null;

// Initial state
const initialState = {
  user: user,
  token: token,
  isAuthenticated: !!token,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await authService.register(userData);
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        toast.success('Registration successful!');
      }
      return response;
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'An error occurred during registration';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await authService.login(userData);
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        toast.success('Login successful!');
      }
      return response;
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Invalid credentials';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout user
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await authService.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      toast.info('You have been logged out');
      return null;
    } catch (error) {
      // Still remove local storage items even if the logout API call fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      const message = error.response?.data?.error || error.message || 'Logout failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update user profile
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await authService.updateProfile(profileData, token);
      
      // Update local storage
      localStorage.setItem('user', JSON.stringify(response.data));
      
      toast.success('Profile updated successfully');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Failed to update profile';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update user password
export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async (passwordData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await authService.updatePassword(passwordData, token);
      
      // Update token if a new one is returned
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      
      toast.success('Password updated successfully');
      return response;
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Failed to update password';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Forgot password
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, thunkAPI) => {
    try {
      const response = await authService.forgotPassword(email);
      toast.success('Password reset email sent, please check your inbox');
      return response;
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Failed to send reset email';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Reset password
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password }, thunkAPI) => {
    try {
      const response = await authService.resetPassword(token, password);
      toast.success('Password reset successful, you can now login');
      return response;
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Failed to reset password';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Verify email
export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (token, thunkAPI) => {
    try {
      const response = await authService.verifyEmail(token);
      toast.success('Email verification successful!');
      return response;
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Failed to verify email';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Resend verification email
export const resendVerification = createAsyncThunk(
  'auth/resendVerification',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await authService.resendVerification(token);
      toast.success('Verification email sent, please check your inbox');
      return response;
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Failed to send verification email';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Refresh user data
export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      if (!token) {
        return thunkAPI.rejectWithValue('No token found');
      }
      
      const response = await authService.getMe(token);
      
      // Update local storage
      localStorage.setItem('user', JSON.stringify(response.data));
      
      return response.data;
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Failed to refresh user data';
      
      // If unauthorized (token expired), log out
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.error('Your session has expired, please login again');
      }
      
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Auth slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      
      // Login cases
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      
      // Logout cases
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      
      // Update profile cases
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Update password cases
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload.token) {
          state.token = action.payload.token;
        }
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Forgot password cases
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Reset password cases
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Verify email cases
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (state.user) {
          state.user.isEmailVerified = true;
        }
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Resend verification cases
      .addCase(resendVerification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resendVerification.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(resendVerification.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Refresh user cases
      .addCase(refreshUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        if (action.payload === 'No token found' || action.error?.message?.includes('401')) {
          state.isAuthenticated = false;
          state.user = null;
          state.token = null;
        }
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;