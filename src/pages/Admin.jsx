import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNews } from '../store/newsSlice';

const Admin = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Технології');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // Нове поле
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Заповніть обов\'язкові поля!');
      return;
    }

    const newNews = {
      id: Date.now(),
      title,
      category,
      description,
      date: new Date().toLocaleDateString(),
      // Якщо посилання не ввели, ставимо картинку за замовчуванням
      image: imageUrl.trim() ? imageUrl : "https://via.placeholder.com/300x200?text=News"
    };

    dispatch(addNews(newNews));
    setTitle('');
    setDescription('');
    setImageUrl('');
    alert('Новину додано успішно!');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px' }}>
      <h1>Панель керування</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          placeholder="Заголовок новини" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          style={{ padding: '10px' }}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '10px' }}>
          <option value="Технології">Технології</option>
          <option value="Спорт">Спорт</option>
          <option value="Економіка">Економіка</option>
          <option value="Політика">Політика</option>
        </select>
        <input 
          type="text" 
          placeholder="Посилання на картинку (URL)" 
          value={imageUrl} 
          onChange={(e) => setImageUrl(e.target.value)} 
          style={{ padding: '10px' }}
        />
        <textarea 
          placeholder="Текст новини" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          style={{ padding: '10px', height: '100px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
          Опублікувати новину
        </button>
      </form>
    </div>
  );
};

export default Admin;