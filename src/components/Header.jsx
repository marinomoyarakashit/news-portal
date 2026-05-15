import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/newsSlice';
import { logout } from '../store/authSlice'; // Додали функцію виходу
import { FaMoon, FaSun, FaRegHeart } from 'react-icons/fa';
import styles from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode, favorites } = useSelector(state => state.news);
  
  // Дістаємо статус авторизації
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout()); // Виходимо
    navigate('/'); // Викидаємо на головну сторінку
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          NEWS<span>PORTAL</span>
        </Link>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>Головна</Link>
          
          <Link to="/favorites" className={styles.navLink}>
            <FaRegHeart /> Обране 
            <span className={styles.count}>{favorites.length}</span>
          </Link>

          {/* Блок меню, який змінюється залежно від того, чи зайшов адмін */}
          {isAuthenticated ? (
            <>
              <Link to="/admin" className={styles.navLink} style={{ color: '#28a745', fontWeight: 'bold' }}>Адмінка</Link>
              <button 
                onClick={handleLogout} 
                className={styles.navLink} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}
              >
                Вийти
              </button>
            </>
          ) : (
            <Link to="/login" className={styles.navLink}>Вхід</Link>
          )}

          <button className={styles.themeToggle} onClick={() => dispatch(toggleTheme())}>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;