import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import '../styles/auth.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (!validatePassword(password)) {
      setError('Пароль должен содержать минимум 8 символов, одну цифру и один спецсимвол');
      return;
    }

    try {
      await registerUser(email, password);
      navigate('/login');
    } catch (error) {
      const code = error.code || '';
      if (code.includes('email-already-in-use')) {
        setError('Этот email уже зарегистрирован.');
      } else if (code.includes('invalid-email')) {
        setError('Неверный email.');
      } else if (code.includes('weak-password')) {
        setError('Пароль должен содержать минимум 6 символов.');
      } else {
        setError('Произошла ошибка. Попробуйте снова.');
      }
    }
  };

  return (
    <div className="app-container">
      <div className="auth-box card">
        <h2>Регистрация</h2>
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
          <div>
            <label>Повторите пароль</label>
            <input
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="auth-actions">
            <button className="btn" type="submit">Зарегистрироваться</button>
          </div>
        </form>
        <p style={{ marginTop: 12 }}>
          Уже есть аккаунт? <a href="/login">Войти</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
