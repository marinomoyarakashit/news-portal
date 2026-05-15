import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/newsSlice';
import { FaHeart, FaRegHeart, FaArrowLeft } from 'react-icons/fa';
import styles from './NewsDetails.module.css';

const NewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const newsItem = useSelector(state => 
    state.news.items.find(item => item.id === parseInt(id))
  );

  const isFavorite = useSelector(state => 
    state.news.favorites.some(item => item.id === parseInt(id))
  );

  if (!newsItem) return <div className={styles.error}>Новину не знайдено</div>;

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backBtn}>
        <FaArrowLeft /> Назад
      </button>
      <article className={styles.article}>
        <img src={newsItem.image} alt={newsItem.title} className={styles.mainImage} />
        <div className={styles.header}>
          <span className={styles.category}>{newsItem.category}</span>
          <span className={styles.date}>{newsItem.date}</span>
          <button 
            className={styles.favBtn}
            onClick={() => dispatch(toggleFavorite(newsItem))}
          >
            {isFavorite ? <FaHeart color="#e74c3c" /> : <FaRegHeart />}
          </button>
        </div>
        <h1 className={styles.title}>{newsItem.title}</h1>
        <div className={styles.content}>
          <p>{newsItem.content}</p>
          <p>{newsItem.description}</p>
        </div>
      </article>
    </div>
  );
};

export default NewsDetails;