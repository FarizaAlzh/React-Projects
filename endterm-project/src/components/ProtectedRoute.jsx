import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();  // Получаем текущего пользователя из контекста

  if (!currentUser) {
    return <Navigate to="/login" />;  // Перенаправляем на страницу входа, если нет текущего пользователя
  }

  return children;
};

export default ProtectedRoute;
