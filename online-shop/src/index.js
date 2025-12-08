import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './components/AuthContext.jsx';
import { Provider } from 'react-redux';  
import { store } from './store';  

// регистрация  
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker зарегистрирован с областью: ', registration.scope);
      })
      .catch((error) => {
        console.log('Ошибка при регистрации Service Worker: ', error);
      });
  });
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <AuthProvider> 
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
