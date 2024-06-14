import { render, screen } from '@testing-library/react';
import { AuthProvider } from '../contexts/AuthContext';
import App from '../App';

test('renders login page', () => {
  render(
      <AuthProvider>
        <App />
      </AuthProvider>
  );
  const linkElement = screen.getByRole('heading', { name: /Login/i });
  expect(linkElement).toBeInTheDocument();
});