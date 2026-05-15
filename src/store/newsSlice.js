import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const response = await fetch(process.env.PUBLIC_URL + '/data.json');
  if (!response.ok) throw new Error('Помилка завантаження');
  const data = await response.json();
  return data.news;
});

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    items: [],
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    status: 'idle',
    searchQuery: '',
    selectedCategory: 'Всі',
    isDarkMode: JSON.parse(localStorage.getItem('darkMode')) || false,
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const index = state.favorites.findIndex(item => item.id === action.payload.id);
      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(action.payload);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('darkMode', JSON.stringify(state.isDarkMode));
    },
    addNews: (state, action) => {
      state.items.unshift(action.payload);
      localStorage.setItem('allNews', JSON.stringify(state.items));
    },
    deleteNews: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('allNews', JSON.stringify(state.items));

      state.favorites = state.favorites.filter(item => item.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Перевіряємо, чи є збережені зміни в пам'яті браузера
        const savedNews = JSON.parse(localStorage.getItem('allNews'));
        if (savedNews && savedNews.length > 0) {
          state.items = savedNews;
        } else {
          state.items = action.payload;
          localStorage.setItem('allNews', JSON.stringify(action.payload));
        }
      })
      .addCase(fetchNews.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { toggleFavorite, setSearchQuery, setCategory, toggleTheme, addNews, deleteNews } = newsSlice.actions;
export default newsSlice.reducer;