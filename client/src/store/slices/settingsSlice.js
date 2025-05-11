import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import settingsService from '../../services/settingsService';
import { toast } from 'react-toastify';

// Initial state
const initialState = {
  darkMode: localStorage.getItem('darkMode') === 'true',
  language: localStorage.getItem('language') || 'en',
  notifications: {
    email: true,
    browser: true,
    announcements: true,
    discussions: true,
    courseUpdates: true
  },
  accessibility: {
    fontSize: 'medium',
    highContrast: false,
    reducedMotion: false
  },
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
};

// Update user preferences
export const updatePreferences = createAsyncThunk(
  'settings/updatePreferences',
  async (preferencesData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      if (!token) {
        return thunkAPI.rejectWithValue('Not authorized');
      }
      
      const response = await settingsService.updatePreferences(preferencesData, token);
      toast.success('Preferences updated successfully');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Failed to update preferences';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user preferences
export const getPreferences = createAsyncThunk(
  'settings/getPreferences',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      if (!token) {
        return thunkAPI.rejectWithValue('Not authorized');
      }
      
      const response = await settingsService.getPreferences(token);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Failed to get preferences';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Settings slice
export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
    setTheme: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem('darkMode', action.payload);
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem('language', action.payload);
    },
    setNotificationSetting: (state, action) => {
      const { type, value } = action.payload;
      state.notifications[type] = value;
    },
    setAccessibilitySetting: (state, action) => {
      const { type, value } = action.payload;
      state.accessibility[type] = value;
    }
  },
  extraReducers: (builder) => {
    builder
      // Update preferences cases
      .addCase(updatePreferences.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePreferences.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        
        // Update specific settings based on what was returned
        if (action.payload.preferences) {
          if (action.payload.preferences.emailNotifications !== undefined) {
            state.notifications.email = action.payload.preferences.emailNotifications;
          }
          
          if (action.payload.preferences.darkMode !== undefined) {
            state.darkMode = action.payload.preferences.darkMode;
            localStorage.setItem('darkMode', action.payload.preferences.darkMode);
          }
        }
      })
      .addCase(updatePreferences.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Get preferences cases
      .addCase(getPreferences.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPreferences.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        
        // Update preferences from server data
        if (action.payload.preferences) {
          if (action.payload.preferences.emailNotifications !== undefined) {
            state.notifications.email = action.payload.preferences.emailNotifications;
          }
          
          if (action.payload.preferences.darkMode !== undefined) {
            state.darkMode = action.payload.preferences.darkMode;
            localStorage.setItem('darkMode', action.payload.preferences.darkMode);
          }
        }
      })
      .addCase(getPreferences.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const {
  reset,
  setTheme,
  setLanguage,
  setNotificationSetting,
  setAccessibilitySetting
} = settingsSlice.actions;

export default settingsSlice.reducer;