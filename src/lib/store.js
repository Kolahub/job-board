import { configureStore } from '@reduxjs/toolkit';
import jobReducer, { setJobDetails, clearJobDetails } from './jobSlice';

export const store = configureStore({
  reducer: {
    job: jobReducer,
  },
});

export { setJobDetails, clearJobDetails };
