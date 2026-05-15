import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>
          <h3>NEWS<span>PORTAL</span></h3>
          <p>Ваше надійне джерело свіжих новин щодня.</p>
        </div>
        <div className={styles.copy}>
          &copy; {new Date().getFullYear()} Усі права захищені. ІФНТУНГ Курсова робота.
        </div>
      </div>
    </footer>
  );
};

export default Footer;