import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './newsSlice';
import authReducer from './authSlice'; // Додали імпорт

export const store = configureStore({
  reducer: {
    news: newsReducer,
    auth: authReducer, // Додали авторизацію в загальне сховище
  },
});