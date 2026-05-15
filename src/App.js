import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import NewsDetails from './pages/NewsDetails';
import Favorites from './pages/Favorites';
import Login from './pages/Login'; // Нова сторінка
import Admin from './pages/Admin'; // Нова сторінка
import './App.css';

// Компонент для захисту маршрутів
const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const isDarkMode = useSelector(state => state.news.isDarkMode);

  return (
    <div className={`app-wrapper ${isDarkMode ? 'dark' : 'light'}`}>
     {/* Використовуємо універсальний шлях */}
     <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news/:id" element={<NewsDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            {/* Нові маршрути */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;