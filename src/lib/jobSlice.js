import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentJob: null,
  filters: {
    search: '',
    location: '',
    fullTimeOnly: false,
  },
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setJobDetails: (state, action) => {
      state.currentJob = action.payload;
    },
    clearJobDetails: (state) => {
      state.currentJob = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { 
  setJobDetails, 
  clearJobDetails, 
  setFilters, 
  resetFilters 
} = jobSlice.actions;

export const selectFilters = (state) => state.job.filters;

export default jobSlice.reducer;
