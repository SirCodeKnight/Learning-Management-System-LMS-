import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  sidebarOpen: true,
  mobileMenuOpen: false,
  modalOpen: null,
  activeTab: 'overview',
  lastVisitedCourse: null,
  lastVisitedLesson: null,
  lastVisitedSection: null,
  breadcrumbs: []
};

// UI slice
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenuOpen: (state, action) => {
      state.mobileMenuOpen = action.payload;
    },
    openModal: (state, action) => {
      state.modalOpen = action.payload;
    },
    closeModal: (state) => {
      state.modalOpen = null;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setLastVisitedCourse: (state, action) => {
      state.lastVisitedCourse = action.payload;
    },
    setLastVisitedLesson: (state, action) => {
      state.lastVisitedLesson = action.payload;
    },
    setLastVisitedSection: (state, action) => {
      state.lastVisitedSection = action.payload;
    },
    setBreadcrumbs: (state, action) => {
      state.breadcrumbs = action.payload;
    },
    reset: () => initialState
  }
});

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleMobileMenu,
  setMobileMenuOpen,
  openModal,
  closeModal,
  setActiveTab,
  setLastVisitedCourse,
  setLastVisitedLesson,
  setLastVisitedSection,
  setBreadcrumbs,
  reset
} = uiSlice.actions;

export default uiSlice.reducer;