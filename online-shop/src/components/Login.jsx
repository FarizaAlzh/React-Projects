import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/profile'); 
    } catch (err) {
      setError('Неверные данные для входа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Вход в систему</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите email"
              required
            />
          </div>
          <div className="input-group">
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Загрузка...' : 'Войти'}
          </button>
        </form>
        <p className="signup-link">
          Нет аккаунта? <a href="/signup">Создать аккаунт</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
