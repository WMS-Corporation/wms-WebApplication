import React, { useContext } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AuthProvider, AuthContext } from '../../contexts/AuthContext';

// Mock component to simulate child component
const ChildComponent = () => {
  const { isAuthenticated, login, logout } = useContext(AuthContext);

  return (
    <div>
      <p>{isAuthenticated ? 'Logged in' : 'Logged out'}</p>
      <button onClick={() => login('dummyToken')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  it('provides an auth context with a default value', () => {
    const { getByText } = render(
      <AuthProvider>
        <ChildComponent />
      </AuthProvider>
    );

    expect(getByText('Logged out')).toBeTruthy();
  });

  it('allows to log in and out', () => {
    const { getByText } = render(
      <AuthProvider>
        <ChildComponent />
      </AuthProvider>
    );

    fireEvent.click(getByText('Login'));
    expect(getByText('Logged in')).toBeTruthy();

    fireEvent.click(getByText('Logout'));
    expect(getByText('Logged out')).toBeTruthy();
  });
});