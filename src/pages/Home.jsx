import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews, setSearchQuery, setCategory } from '../store/newsSlice';
import NewsCard from '../components/NewsCard';
import styles from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const { items, status, searchQuery, selectedCategory } = useSelector(state => state.news);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNews());
    }
  }, [status, dispatch]);

  const categories = ['Всі', 'Технології', 'Економіка', 'Спорт', 'Екологія'];

  const filteredNews = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Всі' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Пошук новин..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
        <div className={styles.categoryList}>
          {categories.map(cat => (
            <button
              key={cat}
              className={selectedCategory === cat ? styles.activeBtn : styles.btn}
              onClick={() => dispatch(setCategory(cat))}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {status === 'loading' && <p className={styles.info}>Завантаження...</p>}
      
      <div className={styles.grid}>
        {filteredNews.map(newsItem => (
          <NewsCard key={newsItem.id} data={newsItem} />
        ))}
      </div>
      
      {filteredNews.length === 0 && status === 'succeeded' && (
        <p className={styles.info}>Нічого не знайдено</p>
      )}
    </div>
  );
};

export default Home;