import React from 'react';
import { useSelector } from 'react-redux';
import NewsCard from '../components/NewsCard';
import styles from './Home.module.css';

const Favorites = () => {
  const { favorites } = useSelector(state => state.news);

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Ваші збережені новини</h1>
      {favorites.length === 0 ? (
        <p className={styles.info}>Список обраного порожній</p>
      ) : (
        <div className={styles.grid}>
          {favorites.map(item => (
            <NewsCard key={item.id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;