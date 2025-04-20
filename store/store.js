import { configureStore } from '@reduxjs/toolkit';
import photoReducer from '../components/photoSlice';

const store = configureStore({
  reducer: {
    photos: photoReducer,
  },
});

export default store;
