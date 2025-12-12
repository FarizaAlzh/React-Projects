import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { store } from './store';

test('renders home page heading', () => {
  render(
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  );

  const heading = screen.getByText(/Welcome to Our Online Store/i);
  expect(heading).toBeInTheDocument();
});