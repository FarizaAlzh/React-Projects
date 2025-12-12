import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import '../styles/auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Сбрасываем ошибку перед новой попыткой входа

    try {
      await loginUser(email, password);
      navigate('/profile');
    } catch (error) {
      const code = error.code || '';
      if (code.includes('user-not-found')) {
        setError('Пользователь с таким email не найден.');
      } else if (code.includes('wrong-password')) {
        setError('Неправильный пароль.');
      } else if (code.includes('invalid-email')) {
        setError('Неверный email.');
      } else {
        setError('Произошла ошибка. Попробуйте снова.');
      }
    }
  };

  return (
    <div className="app-container">
      <div className="auth-box card">
        <h2>Вход</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="auth-actions">
            <button className="btn" type="submit">Войти</button>
          </div>
        </form>
        <p style={{ marginTop: 12 }}>
          Нет аккаунта? <a href="/signup">Зарегистрироваться</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
