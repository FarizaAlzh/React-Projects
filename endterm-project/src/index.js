import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/theme.css';
import './styles/about.css';
import './styles/home.css';
import './styles/itemsList.css';
import './styles/itemDetails.css';
import './styles/favorites.css';
import './styles/layout.css';
import './styles/auth.css';
import './styles/profile.css';
import './styles/offline.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from './store';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AuthProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </AuthProvider>
  </Provider>
);

serviceWorkerRegistration.register();