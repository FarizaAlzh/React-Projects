import { registerUser, loginUser, logoutUser } from '../services/authService';

const LoginPage = () => {
  const handleLogin = async (email, password) => {
    try {
      await loginUser(email, password);
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div>
      <button onClick={() => handleLogin('test@example.com', 'password123')}>Login</button>
    </div>
  );
};
