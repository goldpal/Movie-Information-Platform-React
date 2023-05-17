import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from '../services/TMDB';
import categoryReducer from '../features/currentCategory';
import userReducer from '../features/auth';

const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentCategory: categoryReducer,
    user: userReducer,
  },
});

export default store;
