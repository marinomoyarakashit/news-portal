import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, deleteNews } from '../store/newsSlice'; // Додали deleteNews
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import styles from './NewsCard.module.css';

const NewsCard = ({ data }) => {
  const dispatch = useDispatch();
  
  // Перевіряємо чи є в обраному
  const isFavorite = useSelector(state => 
    state.news.favorites.some(item => item.id === data.id)
  );
  
  // Перевіряємо чи авторизований адмін
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <div className={styles.card}>
      <img src={data.image} alt={data.title} className={styles.image} />
      <div className={styles.content}>
        <span className={styles.category}>{data.category}</span>
        <h3 className={styles.title}>{data.title}</h3>
        <p className={styles.desc}>{data.description}</p>
        <div className={styles.footer}>
          <Link to={`/news/${data.id}`} className={styles.link}>Читати далі</Link>
          
          <button 
            className={styles.favBtn} 
            onClick={() => dispatch(toggleFavorite(data))}
          >
            {isFavorite ? <FaHeart color="#e74c3c" /> : <FaRegHeart />}
          </button>

          {/* Кнопка видалення, яка з'являється ТІЛЬКИ в адміна */}
          {isAuthenticated && (
            <button 
              onClick={() => dispatch(deleteNews(data.id))}
              style={{ 
                backgroundColor: '#dc3545', 
                color: 'white', 
                border: 'none', 
                padding: '6px 12px', 
                borderRadius: '4px',
                cursor: 'pointer',
                marginLeft: '10px',
                fontWeight: 'bold'
              }}
            >
              Видалити
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;