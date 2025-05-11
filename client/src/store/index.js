import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

// Import slices
import authReducer from './slices/authSlice';
import settingsReducer from './slices/settingsSlice';
import coursesReducer from './slices/coursesSlice';
import lessonsReducer from './slices/lessonsSlice';
import quizzesReducer from './slices/quizzesSlice';
import notificationsReducer from './slices/notificationsSlice';
import announcementsReducer from './slices/announcementsSlice';
import discussionsReducer from './slices/discussionsSlice';
import uiReducer from './slices/uiSlice';
import usersReducer from './slices/usersSlice';
import certificatesReducer from './slices/certificatesSlice';

// Configure persist for auth slice
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user', 'isAuthenticated'] // only persist these
};

// Configure persist for settings slice
const settingsPersistConfig = {
  key: 'settings',
  storage
};

// Configure persist for ui slice
const uiPersistConfig = {
  key: 'ui',
  storage,
  whitelist: ['sidebarOpen', 'lastVisitedCourse']
};

// Combine reducers with persist configurations
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  settings: persistReducer(settingsPersistConfig, settingsReducer),
  ui: persistReducer(uiPersistConfig, uiReducer),
  courses: coursesReducer,
  lessons: lessonsReducer,
  quizzes: quizzesReducer,
  notifications: notificationsReducer,
  announcements: announcementsReducer,
  discussions: discussionsReducer,
  users: usersReducer,
  certificates: certificatesReducer
});

// Configure the store
export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
});

// Create the persistor
export const persistor = persistStore(store);