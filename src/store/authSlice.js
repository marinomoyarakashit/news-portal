import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    // Читаємо статус з пам'яті браузера, щоб при оновленні сторінки не вилітало
    isAuthenticated: JSON.parse(localStorage.getItem('isAuth')) || false,
  },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      localStorage.setItem('isAuth', 'true');
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.setItem('isAuth', 'false');
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;